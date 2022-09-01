import enum
import uuid
import datetime

from sqlalchemy import (
    Column,
    ForeignKey,
    String,
    Boolean,
    Integer,
    Table,
    Time,
    DateTime,
    event,
    update,
)


from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from .config import mapper_registry
from .mixins import WithTablename, WithID, WithTitle, WithDescription, WithDateTimezone


""" Link tables """

EntityEventLink = Table(
    "entity_event_link",
    mapper_registry.metadata,
    Column("entity_id", ForeignKey("entity.id", ondelete="CASCADE"), primary_key=True),
    Column("event_id", ForeignKey("event.id", ondelete="CASCADE"), primary_key=True),
)

EventEventLink = Table(
    "event_event_link",
    mapper_registry.metadata,
    Column(
        "parent_event_id", ForeignKey("event.id", ondelete="CASCADE"), primary_key=True
    ),
    Column(
        "child_event_id", ForeignKey("event.id", ondelete="CASCADE"), primary_key=True
    ),
)


def default_path(context) -> str:
    attachment_id: str = str(context.get_current_parameters()["id"])
    title: str = context.get_current_parameters()["title"]
    event_id: str = str(context.get_current_parameters()["event_id"])
    filename = f"{event_id}/{attachment_id}/{title}"
    return filename


# todo: on delete delete path
@mapper_registry.mapped
class Attachment(WithTablename, WithID, WithTitle):
    event = relationship("Event", back_populates="attachments")
    event_id = Column(UUIDType(binary=False), ForeignKey("event.id"))
    path = Column(String(255), nullable=False, default=default_path)


@mapper_registry.mapped
class Event(WithTitle, WithDateTimezone, WithDescription):

    # specify id and tablename explicitly,
    # because otherwise there may be problems with the recursive relation below
    __tablename__ = "event"

    id = Column(
        UUIDType(binary=False),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid.uuid4,
    )

    time = Column(Time, nullable=True)
    contact = Column(String, nullable=True)
    is_frozen = Column(Boolean, nullable=False, default=False)
    is_confirmed = Column(Boolean, nullable=False, default=False)
    is_important = Column(Boolean, nullable=False, default=False)

    collection_id = Column(ForeignKey("collection.id"), nullable=False)
    collection = relationship("Collection", back_populates="events")

    attachments = relationship("Attachment", cascade="all,delete,delete-orphan")

    entities = relationship(
        "Entity", secondary=EntityEventLink, back_populates="events"
    )

    referenced_events = relationship(
        "Event",
        secondary=EventEventLink,
        primaryjoin=id == EventEventLink.c.parent_event_id,
        secondaryjoin=id == EventEventLink.c.child_event_id,
        single_parent=True,
    )

    referenced_events_link_model = EventEventLink
    entities_link_model = EntityEventLink


@mapper_registry.mapped
class Collection(WithTablename, WithID, WithTitle):

    datetime = Column(
        DateTime,
        nullable=False,
        default=datetime.datetime.now,
        onupdate=datetime.datetime.now,
    )
    is_frozen = Column(Boolean, nullable=False, default=False)
    events = relationship(
        "Event",
        cascade="all,delete,delete-orphan",
        back_populates="collection",
        order_by=lambda: Event.date & Event.time,
    )


"""
Register event listeners
"""


@event.listens_for(Event, "after_insert")
@event.listens_for(Event, "after_update")
@event.listens_for(Event, "after_delete")
def receive_before_insert(_, connection, target):
    """Update Collection datetime after any change in event"""
    connection.execute(
        update(Collection)
        .values(datetime=datetime.datetime.now())
        .where(Collection.id == target.collection_id)
    )


"""
Entity, and tables inherting from inheriting form entities (Single Table Inheritance)
"""


class EntityType(str, enum.Enum):
    Person = "PERSON"
    Location = "LOCATION"
    Organization = "ORGANIZATION"

    def get_model(self):
        return globals()[self.name]


@mapper_registry.mapped
class Entity(WithTablename, WithID):

    name = Column(String(255), nullable=False)
    discriminator = Column(String(50), nullable=False)
    ndb_norm_id = Column(Integer, nullable=True)

    link_model = EntityEventLink
    events = relationship("Event", secondary=EntityEventLink, back_populates="entities")
    __mapper_args__ = {
        "polymorphic_on": "discriminator",
        "polymorphic_identity": "entity",
    }


@mapper_registry.mapped
class Person(Entity):
    __mapper_args__ = {"polymorphic_identity": EntityType.Person}


@mapper_registry.mapped
class Location(Entity):
    __mapper_args__ = {"polymorphic_identity": EntityType.Location}


@mapper_registry.mapped
class Organization(Entity):
    __mapper_args__ = {"polymorphic_identity": EntityType.Organization}
