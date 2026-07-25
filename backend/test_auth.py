from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_login_returns_token():
    response = client.post(
        "/login",
        data={"username": "admin", "password": "admin123"},
    )

    assert response.status_code == 200
    payload = response.json()
    assert "access_token" in payload
    assert payload["token_type"] == "bearer"


def test_protected_endpoint_requires_token():
    response = client.get("/profile")
    assert response.status_code == 401


def test_invalid_token_is_rejected():
    response = client.get(
        "/profile",
        headers={"Authorization": "Bearer invalid.token.value"},
    )
    assert response.status_code == 401
