from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"success": True, "data": {"status": "ok", "service": "sankalp-api"}, "meta": None}

def test_dashboard_overview():
    response = client.get("/api/v1/dashboard/overview")
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp.get("success") is True
    assert "data" in json_resp
    assert "summary" in json_resp["data"]
    assert "modules" in json_resp["data"]

def test_404_not_found_format():
    response = client.get("/api/v1/nonexistent_route")
    assert response.status_code == 404
    json_resp = response.json()
    assert json_resp.get("success") is False
    assert "error" in json_resp
    assert json_resp["error"]["code"] == "NOT_FOUND"

def test_validation_error_format():
    # Threat analyze expects specific content_type, send an invalid one
    response = client.post("/api/v1/threat/analyze", json={
        "content": "test",
        "content_type": "invalid_type"
    })
    assert response.status_code == 422
    json_resp = response.json()
    assert json_resp.get("success") is False
    assert "error" in json_resp
    assert json_resp["error"]["code"] == "VALIDATION_ERROR"
    assert "details" in json_resp["error"]

def test_threat_analyze_safe():
    response = client.post("/api/v1/threat/analyze", json={
        "content": "Hello how are you?",
        "content_type": "sms"
    })
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["data"]["classification"] == "safe"
    assert json_resp["data"]["risk_score"] < 50

def test_threat_analyze_suspicious():
    response = client.post("/api/v1/threat/analyze", json={
        "content": "URGENT reset your password here",
        "content_type": "sms"
    })
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["data"]["classification"] == "suspicious"
    assert json_resp["data"]["risk_score"] > 50

def test_chat_query_faq_match():
    response = client.post("/api/v1/chat/query", json={
        "message": "suspicious sms"
    })
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["data"]["source"] == "faq"
    assert json_resp["data"]["confidence"] >= 0.90

def test_chat_query_low_confidence():
    response = client.post("/api/v1/chat/query", json={
        "message": "random unrecognized text"
    })
    assert response.status_code == 200
    json_resp = response.json()
    assert json_resp["data"]["source"] == "fallback"
    assert json_resp["data"]["confidence"] < 0.50
    assert "fallback" in json_resp["data"]
