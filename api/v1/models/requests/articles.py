from pydantic import BaseModel, validator

class ArticleField(BaseModel):
    text: str
    header: str

    @validator('header')
    def validate_header(cls, header):
        if len(header) > 250:
            raise ValueError('header is too long')
        return header

