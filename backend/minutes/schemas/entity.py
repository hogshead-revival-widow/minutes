from typing import Optional, Literal
from typing_extensions import Annotated
from pydantic import Field

from ..database import EntityType
from .mixins import Name, WithID, Schema


class AnyEntity(Schema):
    discriminator: Literal[
        EntityType.Person, EntityType.Location, EntityType.Organization
    ]
    name: Name
    ndb_norm_id: Optional[int] = None


Entity = Annotated[AnyEntity, Field(discriminator="discriminator")]

EntityUpdate = Entity
EntityCreate = Entity


class EntityRead(WithID):
    name: str
    discriminator: str
    ndb_norm_id: Optional[int] = None
