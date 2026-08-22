from app.schemas.career import Skill, SkillGap, SkillProfile, TargetRole


def get_mock_career_profile() -> SkillProfile:
    return SkillProfile(
        id="prof-1",
        current_skills=[
            Skill(name="Python", proficiency=80),
            Skill(name="Data Analysis", proficiency=65)
        ],
        target_role=TargetRole(
            title="ML Engineer",
            required_skills=["Python", "Machine Learning", "Data Analysis", "Deep Learning"]
        ),
        gaps=[
            SkillGap(skill_name="Machine Learning", current_level=10, required_level=70),
            SkillGap(skill_name="Deep Learning", current_level=0, required_level=60)
        ]
    )
