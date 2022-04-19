from os import getcwd
from os.path import abspath

from fastapi import APIRouter, Form, File, UploadFile, BackgroundTasks
from sqlalchemy.exc import SQLAlchemyError
from starlette.responses import JSONResponse

from api.v1.db import Session
from api.v1.db.facilities import FacilityType, Facilities


path = abspath(getcwd())
router = APIRouter(prefix='/facilities')


async def write_image(name, ext, file, folder):
    try:
        with open(path+f'/api/v1/static/{folder}/{name}.{ext}', 'w+b') as f:
            content = await file.read()
            f.write(content)
    except Exception as error:
        print(error)
        return JSONResponse(
                content={'message': 'unable to save image'},
                status_code=500)



@router.get('/facilities')
async def get_types():
    try:
        with Session() as sess:
            types = sess.query(FacilityType).all()
        return JSONResponse(
                content={'data': [{'id': t.id, 'name': t.name, 'image': t.image_url} for t in types]},
            status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                    content={'message': 'unable to fetch data from the database'},
                    status_code=500)


@router.get('/facilities/types/{id}')
async def get_by_type(id: int | None):
    try:
        with Session() as sess:
            if id:
                types = sess.query(Facilities).filter_by(facility_type_id=id).all()
            else:
                types = sess.query(Facilities).all()
        return JSONResponse(
                content={'data': [{'id': t.id, 'name': t.name, 'image': t.image_url} for t in types]},
            status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)


@router.post('/facilities/types')
async def add_type(
    bg_tasks: BackgroundTasks,
    name: str = Form(...), 
    file: UploadFile = File(...)):
    try:
        with Session() as sess:
            exists = sess.query(FacilityType).filter_by(name=name).all()
            if exists:
                return JSONResponse(
                        content={'message': 'this facility type already exists'},
                        status_code=400)
            ext = file.filename.split('.')[-1]
            new_type = FacilityType(
                    name=name,
                    image_url=f'/facility_types/{name}.{ext}')
            sess.add(new_type)
            sess.commit()

        bg_tasks.add_task(write_image, name, ext, file, 'facility_types')
        return JSONResponse(
                content={'message': 'new facility type created successfully'},
                status_code=201)

    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to write data to the database'},
                status_code=500)


@router.post('/facilities')
async def add_facility(
            bg_tasks: BackgroundTasks,
            name: str = Form(...),
            description: str = Form(...),
            facility_type_id: int = Form(...),
            file: UploadFile = File(...)):
    try:
        ext = file.filename.split('.')[-1]
        new_facility = Facilities(
            name=name,
            description=description,
            facility_type_id=facility_type_id,
            image_url=f'/facilities/{name}.{ext}')
        with Session() as sess:
            sess.add(new_facility)
            sess.commit()
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to write data to the database'},
                status_code=500)
    
    bg_tasks.add_task(write_image, name, ext, file, 'facilities')
    return JSONResponse(
            content={'message': 'new facility was successfully added'},
            status_code=201)

