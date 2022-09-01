from ... import database


def may_update_collection(collection: database.Collection) -> bool:
    return not collection.is_frozen


def may_delete_collection(collection: database.Collection) -> bool:
    return may_update_collection(collection)
