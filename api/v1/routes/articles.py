from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from sqlalchemy.exc import SQLAlchemyError

from api.v1.db import Session
from api.v1.db.articles import ArticleCard
from api.v1.db.user import User
from api.v1.models.requests.articles import ArticleField

from api.v1.routes.auth import is_authorized, is_author
from api.v1.token_gen import decode_token


router = APIRouter(prefix='/articles', tags=['Articles'])


@router.get('')
async def get_all_articles(request: Request):
    try:
        with Session() as sess:
            all_articles = sess.query(ArticleCard).all()

        all_articles = [{
            'id': a.id,
            'header': a.header,
            'likes': a.likes_number,
            'saves': a.saves_number,
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


@router.get('/saved')
@is_authorized
async def get_saved_articles(request: Request):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
        with Session() as sess:
            user = sess.query(User).filter_by(id=uid).first()
            print(user)
            articles = user.saves
        data = [{
            'header': article.header,
            'text': article.text,
            'likes': article.likes_number,
            'saves': article.saves_number,
            'author': article.author}
            for article in articles]
        return JSONResponse(content={'data': data}, status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to update data in database'},
                status_code=500)
    except Exception as err:
        print(err, type(err))
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)



@router.get('/{id}')
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
                'text': article.text,
                'likes': article.likes_number,
                'saves': article.saves_number,
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
@is_author
@is_authorized
async def create_article(request: Request, article: ArticleField):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
        with Session() as sess:
            article_exists = sess.query(ArticleCard).\
                    filter_by(header=article.header).first()
            if article_exists:
                return JSONResponse(
                        content={'message': 'article with this name already exists'},
                        status_code=400)

            new_article = ArticleCard(
                header = article.header,
                text = article.text,
                author = uid) 
            sess.add(new_article)
            sess.commit()
        return JSONResponse(
                content={'message': 'created'},
                status_code=201)
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


@router.get('/{id}/save')
@is_authorized
async def update_saves(request: Request, id: int):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
        with Session() as sess:
            article = sess.query(ArticleCard).filter_by(id=id).first()
            user = sess.query(User).filter_by(id=uid).first()
            if user in article.savers:
                article.savers.remove(user)
                article.saves_number -= 1
                sess.commit()
                return JSONResponse(
                        content={'message': 'article unsaved'},
                        status_code=200)
            else:
                user.saves.append(article)
                article.saves_number += 1
                sess.commit()
                return JSONResponse(
                        content={'message': 'article saved'},
                        status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to update data in database'},
                status_code=500)
    except Exception as err:
        print(err, type(err))
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)


@router.get('/{id}/like')
@is_authorized
async def update_likes(request: Request, id: int):
    try:
        token = request.cookies.get('osl-user-session')
        uid = decode_token(token).get('uid')
        with Session() as sess:
            article = sess.query(ArticleCard).filter_by(id=id).first()
            user = sess.query(User).filter_by(id=uid).first()
            if user in article.savers:
                article.likers.remove(user)
                article.likes_number-= 1
                sess.commit()
                return JSONResponse(
                        content={'message': 'article unliked'},
                        status_code=200)
            else:
                user.likes.append(article)
                article.likes_number += 1
                sess.commit()
                return JSONResponse(
                        content={'message': 'article liked'},
                        status_code=200)
    except SQLAlchemyError as serr:
        print(serr)
        return JSONResponse(
                content={'message': 'unable to update data in database'},
                status_code=500)
    except Exception as err:
        print(err, type(err))
        return JSONResponse(
                content={'message': 'something goes wrong'},
                status_code=500)

