from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from . import auth, queue, facility

apirouter = APIRouter(prefix='/api/v1')

@apirouter.get('/form_add_type')
async def form_add_type():
    with open('api/v1/static/img_form.html', 'r') as f:
        data = f.read()
    return HTMLResponse(content=data, status_code=200)

@apirouter.get('/form_add_type')
async def form_add_facility():
    with open('api/v1/static/img_form2.html', 'r') as f:
        data = f.read()
    return HTMLResponse(content=data, status_code=200)

apirouter.include_router(auth.router)
apirouter.include_router(queue.router)
apirouter.include_router(facility.router)
