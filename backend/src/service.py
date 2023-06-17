from flask import Request, Response, jsonify, make_response
from pydantic import ValidationError

from backend.src.config import SUCCESS, BAD_TYPE, BAD_REQUEST
from backend.src.models import Text
from backend.src.text_to_token import process_text


def validate_type(request: Request) -> bool:
    if not request.is_json:
        raise ValueError('Request is not JSON')
    return True


def handle_request(request: Request) -> Response:
    response_obj = {"code": None, "result": None}
    text_obj = None
    try:
        validate_type(request)
    except ValueError as e:
        response_obj["result"] = str(e)
        response_obj["code"] = BAD_TYPE

    try:
        text_obj = Text(**request.get_json())
    except ValidationError as e:
        response_obj["code"] = BAD_REQUEST
        response_obj["result"] = str(e)

    if response_obj["code"] is None:
        response_obj["code"] = SUCCESS
        response_obj["result"] = process_text(text_obj)

    return make_response(jsonify(response_obj["result"]), response_obj["code"])
