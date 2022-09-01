from ... import database


def may_update_event(event: database.Event) -> bool:
    return not event.is_frozen


def may_delete_event(event: database.Event) -> bool:
    return may_update_event(event)
