from uuid import UUID
from pathlib import Path


from sqlalchemy.orm import Session
from fastapi import APIRouter, UploadFile
from pydantic import parse_obj_as
import aiofiles

from .utils import raise_404_for_None
from .. import schemas
from ..database.config import ActiveSession
from .. import database
from ..database import crud
from . import restrictions
from .shared import enforce_restriction_and_get, raise_401_for_violation
from ..config import settings

router = APIRouter()


@router.post("", response_model=schemas.EventRead)
def create_event(event: schemas.EventCreate, session: Session = ActiveSession):
    new_event = crud.create_event(session, event)
    return new_event


@router.get("/{event_id}", response_model=schemas.EventRead)
def read_event(
    event_id: UUID,
    session: Session = ActiveSession,
):
    maybeEvent = crud.get_event(session, event_id)
    raise_404_for_None(maybeEvent)
    return maybeEvent


@router.post("/{event_id}/entity/{entity_id}", response_model=schemas.EventRead)
def attach_entity(event_id: UUID, entity_id: UUID, session: Session = ActiveSession):
    "You can only attach an entity to an non-frozen event"

    restriction = restrictions.may_update_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    entity = crud.get_entity(session, entity_id)
    raise_404_for_None(entity)

    event = crud.add_entity_to_event(session, event, entity)  # type: ignore

    return event


@router.delete("/{event_id}/entity/{entity_id}", response_model=schemas.EventRead)
def detach_entity(event_id: UUID, entity_id: UUID, session: Session = ActiveSession):
    "You can only detach an entity from an non-frozen event"

    restriction = restrictions.may_update_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    entity = crud.get_entity(session, entity_id)
    raise_404_for_None(entity)
    if entity not in event.entities:
        raise_404_for_None(None)
    event = crud.remove_entity_from_event(session, event, entity)  # type: ignore
    return event


@router.put("/{event_id}", response_model=schemas.EventRead)
def update_event(
    event_id: UUID,
    update: schemas.EventUpdate,
    session: Session = ActiveSession,
):
    "You can only update a non-frozen event"
    restriction = restrictions.may_update_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    event = crud.update_event(session, event, update)
    return event


@router.delete("/{event_id}", response_model=schemas.EventRead)
def delete_event(
    event_id: UUID,
    session: Session = ActiveSession,
):
    "You can only delete a non-frozen event"

    restriction = restrictions.may_delete_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    event = crud.delete_event(session, event)
    return event


@router.post("/{event_id}/link/{event_to_link_id}", response_model=schemas.EventRead)
async def link_event(
    *, session: Session = ActiveSession, event_id: UUID, event_to_link_id: UUID
):
    "You can only add a link to an non-frozen event"

    restriction = restrictions.may_update_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    event_to_link = crud.get_event(session, event_to_link_id)
    raise_404_for_None(event_to_link)
    assert event_to_link is not None
    event = crud.link_event(session, event, event_to_link)
    return event


@router.delete(
    "/{event_id}/link/{event_to_unlink_id}", response_model=schemas.EventRead
)
async def unlink_event(
    *, session: Session = ActiveSession, event_id: UUID, event_to_unlink_id: UUID
):
    "You can only remove a link from an non-frozen event"

    restriction = restrictions.may_update_event
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)
    event_to_unlink = crud.get_event(session, event_to_unlink_id)
    raise_404_for_None(event_to_unlink)
    assert event_to_unlink is not None
    event = crud.unlink_event(session, event, event_to_unlink)
    return event


# todo: move business logic to tasks/attachment
@router.post(
    "/{event_id}/attachment",
    response_model=schemas.EventRead,
)
async def add_attachment(
    *, session: Session = ActiveSession, event_id: UUID, attachment: UploadFile
):
    "You can only attach a file to an non-frozen event"
    restriction = restrictions.may_update_event
    # todo: restriction allowed_file_types
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)

    title = parse_obj_as(schemas.Title, attachment.filename)
    attachment_data = schemas.AttachmentCreate(title=title)

    new_attachment = crud.create_attachment(session, attachment_data, event)

    save_to = Path(settings.server.upload_dir) / Path(str(new_attachment.path))
    save_to.parent.mkdir(parents=True, exist_ok=True)
    # todo: -> background task
    async with aiofiles.open(save_to, "wb") as file:
        while content := await attachment.read(1024):
            await file.write(content)

    session.refresh(event)

    return event


# todo: move business logic to tasks/attachment
@router.delete(
    "/{event_id}/attachment/{attachment_id}",
    response_model=schemas.EventRead,
)
async def remove_attachment(
    *, session: Session = ActiveSession, event_id: UUID, attachment_id: UUID
):
    "You can only remove a file from an non-frozen event"
    restriction = restrictions.may_update_event
    # todo: restriction allowed_file_types
    event = enforce_restriction_and_get(session, database.Event, event_id, restriction)

    attachment = crud.get_attachment(session, attachment_id)
    raise_404_for_None(attachment)
    # tell type guard that maybeAttachment isn't None
    # otherwise an exception would have been raised
    assert attachment is not None

    attachment_belongs_to_event = bool(attachment.event_id == event_id)
    raise_401_for_violation(attachment_belongs_to_event)

    attachment = crud.delete_attachment(session, attachment)
    file_to_delete = Path(settings.server.upload_dir) / Path(str(attachment.path))
    file_to_delete.unlink()
    file_to_delete.parent.rmdir()
    event_attachment_dir = file_to_delete.parent.parent
    event_attachment_dir_is_empty = not any(event_attachment_dir.iterdir())
    if event_attachment_dir_is_empty:
        event_attachment_dir.rmdir()

    session.refresh(event)

    return event
