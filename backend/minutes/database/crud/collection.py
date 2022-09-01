from uuid import UUID
from typing import Optional, List

from sqlalchemy import select
from sqlalchemy.orm import Session

from ... import schemas
from ... import database
from .shared import update_obj, delete_obj


def create_collection(
    session: Session, collection: schemas.CollectionCreate
) -> database.Collection:
    """
    Create a new collection.
    """
    collection_data = collection.dict(exclude_unset=True)
    new_collection = database.Collection(**collection_data)  # type: ignore

    session.add(new_collection)
    session.commit()
    session.refresh(new_collection)
    return new_collection


def get_collection(
    session: Session, collection_id: UUID
) -> Optional[database.Collection]:
    collection = session.get(database.Collection, collection_id)
    return collection


def get_collections(session: Session) -> List[database.Collection]:
    statement = select(database.Collection).order_by(
        database.Collection.datetime.desc()
    )
    collections = session.execute(statement).scalars().all()
    return collections


def update_collection(
    session: Session, collection: database.Collection, update: schemas.CollectionUpdate
) -> database.Collection:

    patch = update.dict(exclude_unset=True)
    return update_obj(session, collection, patch)


def delete_collection(
    session: Session, collection: database.Collection
) -> database.Collection:
    return delete_obj(session, collection)
