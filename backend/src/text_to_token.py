from backend.src.models import Text


def process_text(text: Text) -> list[dict]:
    return text.json()