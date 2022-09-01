import uuid
import datetime

from sqlalchemy import Column, String, Date
from sqlalchemy.orm import (
    declarative_mixin,
    declared_attr,
    has_inherited_table,
)
from sqlalchemy_utils import UUIDType

from .utils import camel_to_snake
from .config import settings


@declarative_mixin
class WithTablename:
    @declared_attr
    def __tablename__(cls):
        if has_inherited_table(cls):  # type: ignore
            return None
        return camel_to_snake(cls.__name__)  # type: ignore


@declarative_mixin
class WithID:
    id = Column(
        UUIDType(binary=False),
        primary_key=True,
        index=True,
        nullable=False,
        default=uuid.uuid4,
    )


@declarative_mixin
class WithTitle:
    title = Column(String(255), nullable=False)


@declarative_mixin
class WithDescription:
    description = Column(String, nullable=True)


@declarative_mixin
class WithDateTimezone:
    date = Column(Date, default=lambda: datetime.datetime.now().date(), nullable=False)
    timezone = Column(String(255), default=str(settings.time.tz_name), nullable=False)

    pass
