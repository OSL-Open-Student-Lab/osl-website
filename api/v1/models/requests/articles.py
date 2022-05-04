from pydantic import BaseModel, validator

class Article(BaseModel):
    header: str
    title: str
    data: str
    likes: int
    saves: int
    author: str
