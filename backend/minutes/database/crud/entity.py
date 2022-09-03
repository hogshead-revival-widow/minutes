from uuid import UUID
from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy_utils import escape_like

from ... import schemas
from ... import database
from .shared import delete_obj, update_obj, raise_for_constraint_error


@raise_for_constraint_error
def create_entity(session: Session, entity: schemas.EntityCreate) -> database.AnyEntity:

    data = entity.dict(exclude_unset=True)
    EntityModel = database.EntityType(entity.discriminator).get_model()
    data.pop("discriminator", None)
    new_entity = EntityModel(**data)
    session.add(new_entity)
    session.commit()
    session.refresh(new_entity)
    return new_entity


def get_entities_by_name(
    session: Session,
    name: str,
    discriminator: Optional[database.EntityType],
    limit: Optional[int],
) -> List[database.AnyEntity]:
    Entity = database.Entity
    if discriminator is not None:
        Entity = discriminator.get_model()
    statement = select(Entity).where(Entity.name.ilike("%" + escape_like(name) + "%"))
    if limit is not None:
        statement = statement.limit(limit)
    results = session.execute(statement).scalars().all()
    return results


def get_entity(session: Session, entity_id: UUID) -> Optional[database.AnyEntity]:
    maybeEntity = session.get(database.Entity, entity_id)
    return maybeEntity


def update_entity(
    session: Session, entity: database.AnyEntity, update: schemas.EntityUpdate
) -> Optional[database.AnyEntity]:

    patch = update.dict(exclude_unset=True)
    del patch["discriminator"]
    return update_obj(session, entity, patch)


def delete_entity(session: Session, entity: database.AnyEntity) -> database.AnyEntity:
    return delete_obj(session, entity)


def get_entities_from_event(
    session: Session, event: database.Event
) -> List[database.AnyEntity]:
    statement = (
        select(database.Entity)
        .join(database.Entity.link_model)
        .where(database.Entity.link_model.c.event_id == event.id)
    )
    entities = session.execute(statement).scalars().all()
    return entities


def get_entities_from_collection(
    session: Session, maybeCollection: Optional[database.Collection]
) -> List[database.AnyEntity]:
    if maybeCollection is None:
        return []
    collection = maybeCollection
    event_ids = [event.id for event in collection.events]
    if len(event_ids) == 0:
        return []
    statement = (
        select(database.Entity)
        .join(database.Entity.link_model)
        .where(database.Entity.link_model.c.event_id.in_(event_ids))
    )
    entities = session.execute(statement).scalars().all()
    return entities


def get_entities(
    session: Session, entity_type: Optional[database.EntityType] = None
) -> List[database.AnyEntity]:
    Entity = database.Entity
    if entity_type is not None:
        Entity = entity_type.get_model()
    statement = select(Entity)
    entities = session.execute(statement).scalars().all()
    return entities
