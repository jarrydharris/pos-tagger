import spacy
from spacy.tokens import Token

from backend.src.models import Text


def convert_to_word_dict(token: Token) -> dict[str, str]:
    properties = {
        "word": token.text_with_ws,
        "class": token.pos_,
    }
    return properties


def process_text(text: Text) -> list[dict]:
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text.dict()["text"])
    tokens = [convert_to_word_dict(token) for token in doc]
    return tokens
