from fastapi.testclient import TestClient
from sqlalchemy.orm import Session


def test_register_user(client: TestClient, db: Session):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "securepassword123",
            "display_name": "Test User"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["email"] == "test@example.com"
    assert "password_hash" not in data["data"]
    assert "password" not in data["data"]

def test_register_duplicate_user(client: TestClient, db: Session):
    # First registration
    client.post(
        "/api/v1/auth/register",
        json={"email": "test2@example.com", "password": "securepassword123"}
    )
    # Second registration
    response = client.post(
        "/api/v1/auth/register",
        json={"email": "test2@example.com", "password": "securepassword123"}
    )
    assert response.status_code == 400
    assert response.json()["success"] is False

def test_login_user(client: TestClient, db: Session):
    client.post(
        "/api/v1/auth/register",
        json={"email": "login@example.com", "password": "securepassword123"}
    )
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "login@example.com", "password": "securepassword123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    
    # Verify cookie is set
    cookies = response.cookies
    assert "access_token" in cookies
    
def test_login_invalid_password(client: TestClient, db: Session):
    client.post(
        "/api/v1/auth/register",
        json={"email": "invalid@example.com", "password": "securepassword123"}
    )
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "invalid@example.com", "password": "wrongpassword"}
    )
    assert response.status_code == 400
    assert response.json()["success"] is False
    assert "Incorrect" in response.json()["error"]["message"]

def test_protected_route_without_token(client: TestClient):
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 401

def test_protected_route_with_token(client: TestClient, db: Session):
    client.post(
        "/api/v1/auth/register",
        json={"email": "me@example.com", "password": "securepassword123"}
    )
    client.post(
        "/api/v1/auth/login",
        json={"email": "me@example.com", "password": "securepassword123"}
    )
    # The TestClient automatically persists cookies for subsequent requests
    response = client.get("/api/v1/auth/me")
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["email"] == "me@example.com"
