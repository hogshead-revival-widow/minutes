from typing import Callable, TypeVar
from typing_extensions import ParamSpec

from sqlalchemy.exc import IntegrityError

from ..errors import MinutesError


class CRUDError(MinutesError):
    user_message: str = "Something unexpected happened database-wise"


class IDError(CRUDError):
    """
    Foreign key constraint failed or the object referenced by a user-given ID is not as expected
    """

    user_message: str = "At least one given ID is not pointing to the expected kind of ressource, most likely due to a wrong UUID"


class NotUniqueError(CRUDError):
    """
    Unique constraint failed
    """

    user_message: str = "At least one given value is not unique, but was expected to be"


ReturnType = TypeVar("ReturnType")
ParamTypes = ParamSpec("ParamTypes")


def raise_for_constraint_error(
    func: Callable[ParamTypes, ReturnType]
) -> Callable[ParamTypes, ReturnType]:
    """
    Decorator, raising CRUDError, i.e.:
    - NotUniqueError, if the unique constraint failed
    - IDError, if the foreign key error constraint failed
    """

    def handler(*args: ParamTypes.args, **kwargs: ParamTypes.kwargs) -> ReturnType:
        try:
            return func(*args, **kwargs)
        except IntegrityError as e:
            # cf. https://docs.sqlalchemy.org/en/14/core/exceptions.html#sqlalchemy.exc.IntegrityError
            # An IntegrityError is just a wrapper for a DB-API IntegrityError.
            # To differentiate between a foreign key error and other errors, the error needs parsing
            original_message = str(e.orig.args)
            is_foreign_key_error = (
                "foreign key" in original_message.lower()
                and "constraint" in original_message.lower()
            )
            if is_foreign_key_error:
                raise IDError()
            is_unique_constraint_error = (
                "unique" in original_message.lower()
                and "constraint" in original_message.lower()
            )
            if is_unique_constraint_error:
                raise NotUniqueError()

            raise

    return handler
