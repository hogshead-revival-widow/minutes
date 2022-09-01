from uuid import UUID
from typing import List

from sqlalchemy.orm import Session
from fastapi import APIRouter


from .utils import raise_404_for_None
from .. import schemas
from ..database.config import ActiveSession
from .. import database
from ..database import crud
from . import restrictions
from .shared import enforce_restriction_and_get

router = APIRouter()


@router.post("", response_model=schemas.CollectionRead)
def create_collection(
    collection: schemas.CollectionCreate, session: Session = ActiveSession
):
    new_collection = crud.create_collection(session, collection)
    return new_collection


@router.get("", response_model=List[schemas.CollectionSimpleRead])
def list_collections(session: Session = ActiveSession):
    collections = crud.get_collections(session)
    return collections


@router.get("/{collection_id}", response_model=schemas.CollectionRead)
def read_collection(
    collection_id: UUID,
    session: Session = ActiveSession,
):
    maybeCollection = crud.get_collection(session, collection_id)
    raise_404_for_None(maybeCollection)
    return maybeCollection


@router.put("/{collection_id}", response_model=schemas.CollectionSimpleRead)
def update_collection(
    collection_id: UUID,
    update: schemas.CollectionUpdate,
    session: Session = ActiveSession,
):
    "You can only update a non-frozen collection"
    restriction = restrictions.may_update_collection
    collection = enforce_restriction_and_get(
        session, database.Collection, collection_id, restriction
    )
    collection = crud.update_collection(session, collection, update)
    return collection


@router.delete("/{collection_id}", response_model=schemas.CollectionRead)
def delete_collection(
    collection_id: UUID,
    session: Session = ActiveSession,
):
    "You can only delete a non-frozen collection"

    restriction = restrictions.may_delete_collection
    collection = enforce_restriction_and_get(
        session, database.Collection, collection_id, restriction
    )
    collection = crud.delete_collection(session, collection)
    return collection
