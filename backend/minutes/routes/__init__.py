from fastapi import APIRouter

from .collection import router as collection_router
from .event import router as event_router
from .entity import router as entity_router

# Change the order here to change the order displayed in docs
main_router = APIRouter(prefix="/api")

main_router.include_router(collection_router, prefix="/collection", tags=["Collection"])

main_router.include_router(event_router, prefix="/event", tags=["Event"])
main_router.include_router(entity_router, prefix="/entity", tags=["Entity"])
