def normalize_score(value: float, min_val: float, max_val: float) -> int:
    """Normalize a value to a 0-100 scale."""
    if max_val == min_val:
        return 0 if value <= min_val else 100
    
    clamped = max(min_val, min(value, max_val))
    score = ((clamped - min_val) / (max_val - min_val)) * 100
    return round(score)


def calculate_confidence(data_points: int, required_points: int, optimal_points: int) -> float:
    """Calculate confidence based on data volume."""
    if data_points < required_points:
        return 0.0
    if data_points >= optimal_points:
        return 1.0
        
    return (data_points - required_points) / (optimal_points - required_points)


def assess_data_quality(confidence: float) -> str:
    """Map a confidence float (0.0 to 1.0) to a qualitative string."""
    if confidence < 0.25:
        return "insufficient"
    if confidence < 0.6:
        return "low"
    if confidence < 0.85:
        return "medium"
    return "high"
