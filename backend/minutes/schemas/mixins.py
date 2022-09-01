from uuid import UUID
from pydantic import BaseModel, constr, EmailStr
from .utils import snake_to_camel


class Schema(BaseModel):
    class Config:
        alias_generator = snake_to_camel
        orm_mode = True
        allow_population_by_field_name = True


class Path(str):
    pass


class Name(constr(min_length=1, max_length=255)):
    pass


class Title(constr(min_length=1, max_length=255)):
    pass


class Description(constr(min_length=1)):
    pass


class Email(EmailStr):
    pass


class Timezone(str):
    """
    Currently, only Europe/Berlin (tz database name) is supported
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.timezone_is_europe_berlin

    @classmethod
    def timezone_is_europe_berlin(cls, v: str) -> str:
        if not isinstance(v, str):
            raise ValueError("Must be string")
        if v != "Europe/Berlin":
            raise ValueError(
                "Currently, only Europe/Berlin (tz database name) is supported"
            )
        return v


class WithID(Schema):
    id: UUID
