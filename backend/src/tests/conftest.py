import pytest

from ..api import app as flask_api
from ..config import SCHEMA


@pytest.fixture()
def app():
    flask_api.config.update({
        "TESTING": True,
    })
    yield flask_api


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def valid_json():
    return {"text": "Hello World!"}

