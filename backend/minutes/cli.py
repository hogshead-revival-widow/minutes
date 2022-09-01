import typer
import uvicorn

from .config import settings


cli = typer.Typer(name="minutes API")


@cli.command()
def run(
    port: int = settings.server.port,  # type: ignore
    host: str = settings.server.host,  # type: ignore
    log_level: str = settings.server.log_level,  # type: ignore
    reload: bool = settings.server.reload,  # type: ignore
):  # pragma: no cover
    """Start server"""
    uvicorn.run(
        "minutes.app:app", host=host, port=port, log_level=log_level, reload=reload
    )
