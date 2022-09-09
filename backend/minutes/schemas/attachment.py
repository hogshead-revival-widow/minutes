from .mixins import WithID, Path, Title, Schema
from ..config import settings
from pydantic import validator


class AttachmentRead(WithID):
    title: Title
    path: Path
    link: str = "example/file.extension"

    @validator("link", "path", pre=True, always=True)
    def make_link(cls, v, *, values, **kwargs):
        if "path" in values:
            return f"{settings.server.scheme}://{settings.server.host}:{settings.server.port}/{settings.server.upload_dir}/{values['path']}"
        return v


class AttachmentCreate(Schema):
    title: Title
