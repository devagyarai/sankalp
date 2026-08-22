from sqlalchemy import select
from sqlalchemy.orm import Session

from app.intelligence.common.models import IntelligenceMetric, IntelligenceOutput, IntelligenceRecommendation
from app.intelligence.common.scoring import assess_data_quality, calculate_confidence, normalize_score
from app.models.career import CareerProfile, RoleSkillRequirement, TargetRole, UserSkill
from app.models.user import User


def calculate_skill_gaps(db: Session, user: User) -> IntelligenceOutput:
    profile = db.scalar(select(CareerProfile).where(CareerProfile.user_id == user.id))
    
    if not profile:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No career profile found."],
            recommendations=[],
            explanation=["Cannot calculate trajectory without a career profile."],
            data_quality="insufficient"
        )

    # Fetch User Skills
    user_skills_orm = db.scalars(select(UserSkill).where(UserSkill.user_id == user.id)).all()
    user_skill_map = {us.skill.name: us.proficiency_level for us in user_skills_orm if us.skill}

    # Fetch Target Role (first one for now)
    target = db.scalar(select(TargetRole).where(TargetRole.title == profile.current_role)) # If matched? Or just find the first target role.
    if not target:
        target = db.scalar(select(TargetRole).limit(1))

    if not target:
         return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["No target role established."],
            recommendations=[],
            explanation=["A target role is required to measure skill gaps."],
            data_quality="insufficient"
        )
        
    reqs = db.scalars(select(RoleSkillRequirement).where(RoleSkillRequirement.role_id == target.id)).all()
    
    if not reqs:
        return IntelligenceOutput(
            score=0,
            metrics=[],
            issues=["Target role has no skill requirements."],
            recommendations=[],
            explanation=["Target role is missing skill requirements for calculation."],
            data_quality="insufficient"
        )

    total_weight = 0.0
    weighted_gap_sum = 0.0
    weighted_coverage_sum = 0.0
    
    critical_missing = []
    strongest_skills = []
    issues = []
    recommendations = []
    explanation = []
    
    # Calculate weighted gap
    for req in reqs:
        if not req.skill:
            continue
            
        skill_name = req.skill.name
        weight = req.weight or 1.0
        req_level = req.required_proficiency
        current_level = user_skill_map.get(skill_name, 0)
        
        # Coverage for this skill (capped at 1.0)
        coverage = min(current_level / req_level if req_level > 0 else 1.0, 1.0)
        
        # Gap size
        gap = max(req_level - current_level, 0)
        
        total_weight += weight
        weighted_gap_sum += gap * weight
        weighted_coverage_sum += coverage * weight
        
        # Classify skill strength or weakness
        if coverage == 1.0:
            strongest_skills.append((skill_name, current_level))
        elif gap > 0 and (weight >= 1.5 or gap >= 40):  # Arbitrary threshold for critical missing
            critical_missing.append((skill_name, gap, weight))
                
    # Normalization
    overall_coverage = (weighted_coverage_sum / total_weight) * 100 if total_weight > 0 else 0
    overall_score = normalize_score(overall_coverage, 0, 100)
    
    # Generate Explanations
    explanation.append(f"Target Role '{target.title}' requires {len(reqs)} key skills.")
    explanation.append(f"Your overall skill coverage is {overall_score}%.")
    
    if critical_missing:
        critical_missing.sort(key=lambda x: (x[2], x[1]), reverse=True) # Sort by weight then gap
        top_critical = critical_missing[0]
        issues.append(f"Significant gap in critical skill: {top_critical[0]}")
        explanation.append(f"{top_critical[0]} is your highest-priority gap due to its high requirement weight.")
        
        recommendations.append(
            IntelligenceRecommendation(
                domain="career",
                priority="high",
                title=f"Learn {top_critical[0]}",
                reason=f"Required proficiency is unmet for {target.title}.",
                evidence=[f"Current level is {user_skill_map.get(top_critical[0], 0)}, target is high."],
                action_url="/career/learn"
            )
        )
        
    if strongest_skills:
        top_strong = strongest_skills[0][0]
        explanation.append(f"Your strongest skill aligned with this role is {top_strong}.")

    metrics = [
        IntelligenceMetric(name="Role Coverage", value=overall_score, description="Weighted coverage of target role requirements"),
        IntelligenceMetric(name="Total Gaps", value=len(critical_missing), description="Number of significant skill gaps"),
    ]
    
    confidence = calculate_confidence(len(user_skills_orm), 1, 5)
    
    return IntelligenceOutput(
        score=overall_score,
        metrics=metrics,
        issues=issues,
        recommendations=recommendations,
        explanation=explanation,
        data_quality=assess_data_quality(confidence),
        raw_data={"target_role": target.title, "total_weight": total_weight}
    )
