from uuid import UUID
from typing import Optional

from sqlalchemy.orm import Session


from ... import schemas
from ... import database
from .shared import update_obj, delete_obj, raise_for_constraint_error, establish_link


@raise_for_constraint_error
def create_event(session: Session, event: schemas.EventCreate) -> database.Event:
    event_data = event.dict(exclude_unset=True)
    event_data.pop("referenced_events", None)
    event_data.pop("entities", None)
    new_event = database.Event(**event_data)  # type: ignore

    session.add(new_event)
    session.flush()

    if event.referenced_events is not None:
        links = [
            {"parent_event_id": new_event.id, "child_event_id": child_event_id}
            for child_event_id in event.referenced_events
        ]
        link_model = database.Event.referenced_events_link_model
        print(links)
        establish_link(session, link_model, links)

    if event.entities is not None:
        links = [
            {"entity_id": entity_id, "event_id": new_event.id}
            for entity_id in event.entities
        ]
        link_model = database.Event.entities_link_model
        establish_link(session, link_model, links)

    session.commit()
    session.refresh(new_event)
    return new_event


def get_event(session: Session, event_id: UUID) -> Optional[database.Event]:
    maybeEvent = session.get(database.Event, event_id)
    return maybeEvent


def add_entity_to_event(
    session: Session, event: database.Event, entity: database.Entity
) -> database.Event:
    event.entities.append(entity)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


def remove_entity_from_event(
    session: Session, event: database.Event, entity: database.Entity
) -> database.Event:
    event.entities.remove(entity)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@raise_for_constraint_error
def update_event(
    session: Session, event: database.Event, update: schemas.EventUpdate
) -> database.Event:

    patch = update.dict(exclude_unset=True)
    patch.pop("referenced_events", None)
    patch.pop("entities", None)

    session.add(event)
    if update.referenced_events is not None:
        event.referenced_events = []
        session.flush()
        links = [
            {"parent_event_id": event.id, "child_event_id": child_event_id}
            for child_event_id in update.referenced_events
        ]
        link_model = database.Event.referenced_events_link_model
        establish_link(session, link_model, links)

    if update.entities is not None:
        event.entities = []
        session.flush()
        links = [
            {"entity_id": entity_id, "event_id": event.id}
            for entity_id in update.entities
        ]
        link_model = database.Event.entities_link_model
        establish_link(session, link_model, links)

    updated = update_obj(session, event, patch)
    session.commit()
    session.refresh(updated)
    return updated


def delete_event(session: Session, event: database.Event) -> database.Event:
    return delete_obj(session, event)


@raise_for_constraint_error
def link_event(
    session: Session, event: database.Event, event_to_link: database.Event
) -> database.Event:

    event.referenced_events.append(event_to_link)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event


@raise_for_constraint_error
def unlink_event(
    session: Session, event: database.Event, event_to_unlink: database.Event
) -> database.Event:

    event.referenced_events.remove(event_to_unlink)
    session.add(event)
    session.commit()
    session.refresh(event)
    return event
