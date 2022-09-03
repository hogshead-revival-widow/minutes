from typing import List, Optional


from fastapi import APIRouter
from sqlalchemy.orm import Session
from .. import schemas
from ..database.config import ActiveSession
from ..database import crud

router = APIRouter()


@router.get("", response_model=List[schemas.EntityRead])
def list_entities(session: Session = ActiveSession):
    entities = crud.get_entities(session)
    return entities


@router.post("", response_model=schemas.EntityRead)
def create_entity(entity: schemas.EntityCreate, session: Session = ActiveSession):
    new_entity = crud.create_entity(session, entity)
    return new_entity


@router.get("/search", response_model=List[schemas.EntityRead])
def search_entities(
    name: str,
    discriminator: Optional[schemas.EntityType] = None,
    limit: int = 10,
    session: Session = ActiveSession,
):
    entities = crud.get_entities_by_name(session, name, discriminator, limit)
    return entities
