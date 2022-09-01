from typing import Union

from .tables import (
    Entity,
    EntityType,
    Collection,
    Event,
    Person,
    Location,
    Organization,
    Attachment,
)

AnyEntity = Union[Entity, Person, Location, Organization]

from .errors import NotUniqueError, IDError, CRUDError
