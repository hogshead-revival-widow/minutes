def snake_to_camel(string: str) -> str:
    """Transform `name` from snake_case to camelCase"""
    as_camel = "".join(word.capitalize() for word in string.split("_"))
    as_camel = as_camel[0].lower() + as_camel[1:]

    return as_camel
