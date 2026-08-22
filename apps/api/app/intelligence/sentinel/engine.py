import re

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import normalize_score

# Basic deterministic indicators
URL_PATTERN = re.compile(r'https?://[^\s<>"]+|www\.[^\s<>"]+')
EMAIL_PATTERN = re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')
PHONE_PATTERN = re.compile(r'\b(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b')

URGENCY_KEYWORDS = [
    "urgent", "immediate action required", "account suspended", "act now", 
    "final notice", "penalty", "expires today", "within 24 hours"
]

FINANCIAL_KEYWORDS = [
    "wire transfer", "gift card", "crypto", "bitcoin", "pay now", 
    "bank details", "routing number", "social security", "irs"
]

CREDENTIAL_KEYWORDS = [
    "password", "login", "credential", "verify your account", "verify identity"
]


def analyze_threat_content(text: str) -> IntelligenceOutput:
    if not text or not text.strip():
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Empty content provided."],
            recommendations=[],
            explanation=["No text was provided for analysis."],
            data_quality="insufficient"
        )
        
    text_lower = text.lower()
    
    # 1. Extraction (Safe string operations only)
    urls = URL_PATTERN.findall(text)
    emails = EMAIL_PATTERN.findall(text)
    phones = PHONE_PATTERN.findall(text)
    
    found_urgency = [kw for kw in URGENCY_KEYWORDS if kw in text_lower]
    found_financial = [kw for kw in FINANCIAL_KEYWORDS if kw in text_lower]
    found_credential = [kw for kw in CREDENTIAL_KEYWORDS if kw in text_lower]
    
    # 2. Risk Calculation
    base_score = 0
    issues = []
    evidence = []
    
    if found_urgency:
        base_score += 30
        issues.append("Urgency/Fear markers detected")
        evidence.append(f"Found urgency keywords: {', '.join(found_urgency)}")
        
    if found_financial:
        base_score += 40
        issues.append("Suspicious financial requests detected")
        evidence.append(f"Found financial keywords: {', '.join(found_financial)}")
        
    if found_credential:
        base_score += 40
        issues.append("Suspicious credential requests detected")
        evidence.append(f"Found credential keywords: {', '.join(found_credential)}")
        
    if urls:
        base_score += 20
        # Check for known bad patterns (mock logic, in real life we'd check a blacklist)
        for url in urls:
            if "bit.ly" in url or "tinyurl" in url:
                base_score += 15
                issues.append("Shortened URLs used")
                evidence.append(f"Found shortened URL: {url}")
                
    # Normalize score
    threat_score = normalize_score(base_score, 0, 100)
    
    # Classify
    if threat_score >= 70:
        threat_level = "CRITICAL"
    elif threat_score >= 40:
        threat_level = "SUSPICIOUS"
    else:
        threat_level = "SAFE"
        
    explanation = [f"Analyzed text length: {len(text)} characters."]
    explanation.extend(evidence)
    
    recommendations = []
    if threat_score >= 40:
        recommendations.append(
            IntelligenceRecommendation(
                domain="threat",
                priority="high" if threat_score >= 70 else "medium",
                title="Do Not Click Links",
                reason="Content exhibits classic phishing or scam patterns.",
                evidence=evidence,
                action_url=None
            )
        )
        
    metrics = [
        IntelligenceMetric(name="URLs Found", value=len(urls), description="Number of web links detected"),
        IntelligenceMetric(name="Urgency Markers", value=len(found_urgency), description="Keywords demanding immediate action"),
    ]
    
    # We cap confidence at 'high' since it's deterministic and rules-based
    
    raw_data = {
        "urls": urls,
        "emails": emails,
        "phones": phones,
        "threat_level": threat_level
    }
    
    return IntelligenceOutput(
        score=threat_score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality="high",
        raw_data=raw_data
    )
