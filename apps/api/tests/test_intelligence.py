
from app.intelligence.common.scoring import normalize_score
from app.intelligence.sentinel.engine import analyze_threat_content


def test_normalize_score():
    assert normalize_score(50, 0, 100) == 50
    assert normalize_score(150, 0, 100) == 100
    assert normalize_score(-50, 0, 100) == 0


def test_sentinel_empty():
    output = analyze_threat_content("")
    assert output.score == 0
    assert output.data_quality == "insufficient"
    assert "Empty content" in output.issues[0]


def test_sentinel_safe_text():
    output = analyze_threat_content("Hello friend, let's meet at 5 PM for coffee.")
    assert output.score == 0
    assert output.raw_data["threat_level"] == "SAFE"
    assert len(output.metrics) == 2


def test_sentinel_suspicious():
    output = analyze_threat_content("Urgent! Please wire transfer the money now to avoid penalty.")
    assert output.score >= 70
    assert output.raw_data["threat_level"] == "CRITICAL"
    assert "Urgency/Fear markers detected" in output.issues


def test_sentinel_xss_injection():
    # Treat XSS as data, should not execute or crash, but might detect urls
    payload = "<script>alert('urgent wire transfer')</script> http://bad-domain.com"
    output = analyze_threat_content(payload)
    assert output.score > 0
    assert "http://bad-domain.com" in output.raw_data["urls"]


def test_sentinel_sql_injection():
    # Treat SQLi as data
    payload = "DROP TABLE users; -- urgent"
    output = analyze_threat_content(payload)
    assert "Urgency/Fear markers detected" in output.issues
    assert output.score > 0


def test_sentinel_js_payload():
    payload = "javascript:eval(atob('dW50cnVzdGVk')); urgent payment"
    output = analyze_threat_content(payload)
    assert output.score > 0
    assert "payment" in payload


def test_sentinel_deterministic_repeatability():
    text = "Urgent: please pay via bitcoin to https://bit.ly/scam"
    output1 = analyze_threat_content(text)
    output2 = analyze_threat_content(text)
    assert output1.score == output2.score
    assert output1.issues == output2.issues
    assert output1.raw_data["urls"] == output2.raw_data["urls"]
