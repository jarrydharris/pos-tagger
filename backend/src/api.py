from flask import Flask, Response, request

from backend.src.service import handle_request

app = Flask(__name__.split('.')[0])


@app.route('/api/v1/process_text', methods=['POST'])
def api_process_text() -> Response:
    return handle_request(request)
