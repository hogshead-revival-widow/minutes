from typing import Optional, List
import datetime

from .event import EventRead
from .mixins import Schema, WithID, Title


class CollectionRead(WithID):
    title: Title
    datetime: datetime.datetime
    is_frozen: bool
    events: List[EventRead]


class CollectionSimpleRead(WithID):
    title: Title
    datetime: datetime.datetime
    is_frozen: bool


class CollectionCreate(Schema):
    title: Title
    is_frozen: Optional[bool] = None


class CollectionUpdate(Schema):
    title: Optional[Title] = None
    is_frozen: Optional[bool] = None
