from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from . import auth, queue, facility, articles

apirouter = APIRouter(prefix='/api/v1')

apirouter.include_router(auth.router)
apirouter.include_router(queue.router)
apirouter.include_router(facility.router)
apirouter.include_router(articles.router)
