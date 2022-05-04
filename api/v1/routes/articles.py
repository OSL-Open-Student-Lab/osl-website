from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from sqlalchemy.exc import SQLAlchemyError

from api.v1.db import Session
from api.v1.db.articles import ArticleCard
from api.v1.models.requests.articles import Article

from api.v1.routes.auth import is_authorized, is_author
from api.v1.token_gen import decode_token


router = APIRouter(prefix='/articles') 


@router.get('')
@is_authorized
async def get_all_articles(request: Request):
    try:
        with Session() as sess:
            all_articles = sess.query(ArticleCard).all()

        all_articles = [{
            'header': a.header,
            'text': a.text,
            'likes': a.likes,
            'saves': a.saves,
            'author': a.author}
            for a in all_articles
        ]
        return JSONResponse(
                content={'data': all_articles},
                status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)
    except Exception as err:
        print(err)
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)



@router.get('/{id}')
@is_authorized
async def get_article(request: Request, id: int):
    try:
        with Session() as sess:
            article = sess.query(ArticleCard).filter_by(id=id).first()
        if not article:
            return JSONResponse(
                    content={'message': 'no article with such id'},
                    status_code=400)
        else:
            data = {
                'header': article.header,
                'title': article.title,
                'data': article.data,
                'likes': article.likes,
                'saves': article.saves,
                'author': article.author}
            return JSONResponse(content=data, status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)
    except Exception as err:
        print(err)
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)


@router.post('')
@is_authorized
@is_author(role_id=2)
async def create_article(request: Request, article: Article):
    try:
        token = request.get('osl-user-session')
        username = decode_token(token).get('user')
        with Session() as sess:
            new_article = ArticleCard(
                header = article.header,
                text = article.text,
                data = article.data,
                likes = 0,
                saves = 0,
                author = username) 
            sess.add(new_article)
            sess.commit()
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to fetch data from the database'},
                status_code=500)
    except Exception as err:
        print(err)
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)


