from ..config import PROCESS_TEXT_ENDPOINT
from ..config import SUCCESS, BAD_REQUEST, BAD_TYPE


class TestApp:
    def test_fixture_has_test_config(self, client):
        assert client.application.testing is True


class TestApiProcessText:
    def test_valid_json_returns_success(self, client, valid_json):
        response = client.post(PROCESS_TEXT_ENDPOINT, json=valid_json)
        assert response.status_code == SUCCESS

    def test_no_json_returns_bad_type(self, client):
        response = client.post(PROCESS_TEXT_ENDPOINT, headers={'Content-Type': 'text/plain'})
        assert response.status_code == BAD_TYPE

    def test_invalid_json_keys_returns_bad_request(self, client):
        response = client.post(PROCESS_TEXT_ENDPOINT, json={"tex": "123"})
        assert response.status_code == BAD_REQUEST

    def test_empty_string_returns_bad_request(self, client):
        response = client.post(PROCESS_TEXT_ENDPOINT, json={"text": ""})
        assert response.status_code == BAD_REQUEST

    def test_none_returns_bad_request(self, client):
        response = client.post(PROCESS_TEXT_ENDPOINT, json={"text": None})
        assert response.status_code == BAD_REQUEST

    def test_valid_request_returns_valid_response(self, client, valid_json):
        expected_response = [
            {"class":"INTJ","word":"Hello "},
            {"class":"PROPN","word":"World"},
            {"class":"PUNCT","word":"!"}
        ]

        response = client.post(PROCESS_TEXT_ENDPOINT, json=valid_json)
        response_json = response.get_json()
        assert response.status_code == SUCCESS
        assert response_json == expected_response
