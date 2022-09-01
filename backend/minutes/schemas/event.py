from typing import Optional, List, Set
from uuid import UUID
import datetime


from .attachment import AttachmentRead
from .entity import EntityRead
from .mixins import Schema, WithID, Title, Description, Timezone, Email


class BaseEventRead(WithID, Schema):
    title: Title
    description: Optional[Description]
    contact: Optional[Email]
    date: datetime.date
    time: Optional[datetime.time]
    timezone: Timezone
    is_frozen: bool
    is_confirmed: bool
    is_important: bool


class EventSimpleRead(BaseEventRead):
    pass


class EventRead(BaseEventRead):
    collection_id: UUID
    referenced_events: List[EventSimpleRead]
    entities: List[EntityRead]
    attachments: List[AttachmentRead]
    attachments: List[AttachmentRead]


class EventCreate(Schema):
    collection_id: UUID
    title: Title
    description: Optional[Description] = None
    contact: Optional[Email] = None
    date: datetime.date
    time: Optional[datetime.time] = None
    timezone: Optional[Timezone] = None
    is_frozen: Optional[bool] = None
    is_confirmed: Optional[bool] = None
    is_important: Optional[bool] = None
    entities: Optional[Set[UUID]] = None
    referenced_events: Optional[Set[UUID]] = None


class EventUpdate(Schema):
    title: Optional[Title] = None
    description: Optional[Description] = None
    contact: Optional[Email] = None
    date: Optional[datetime.date] = None
    time: Optional[datetime.time] = None
    timezone: Optional[Timezone] = None
    is_frozen: Optional[bool] = None
    is_confirmed: Optional[bool] = None
    is_important: Optional[bool] = None
    entities: Optional[Set[UUID]] = None
    referenced_events: Optional[Set[UUID]] = None
