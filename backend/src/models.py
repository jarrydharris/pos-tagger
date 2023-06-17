from pydantic import BaseModel, validator


class Text(BaseModel):
    text: str

    @validator('text')
    def text_must_not_be_empty(cls, text: str) -> str:
        if len(text) == 0:
            raise ValueError(f'Text must not be empty, got {text}')
        return text
