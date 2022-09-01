from uuid import UUID
from typing import Optional

from sqlalchemy.orm import Session

from ... import schemas
from ... import database
from .shared import delete_obj


def create_attachment(
    session: Session, attachment: schemas.AttachmentCreate, event: database.Event
) -> database.Attachment:

    new_attachment = database.Attachment(**attachment.dict(), event=event)  # type: ignore
    session.add(new_attachment)
    session.commit()
    session.refresh(new_attachment)
    return new_attachment


def get_attachment(
    session: Session, attachment_id: UUID
) -> Optional[database.Attachment]:
    maybeAttachment = session.get(database.Attachment, attachment_id)
    return maybeAttachment


def delete_attachment(
    session: Session, attachment: database.Attachment
) -> database.Attachment:
    return delete_obj(session, attachment)
