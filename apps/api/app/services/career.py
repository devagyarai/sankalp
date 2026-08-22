from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.career import CareerProfile, RoleSkillRequirement, Skill, TargetRole, UserSkill
from app.models.user import User
from app.schemas.career import Skill as SkillSchema
from app.schemas.career import SkillGap, SkillProfile
from app.schemas.career import TargetRole as TargetRoleSchema


def get_career_profile(db: Session, user: User) -> SkillProfile:
    profile = db.scalar(select(CareerProfile).where(CareerProfile.user_id == user.id))
    
    if not profile:
        # Create a default deterministic profile
        profile = CareerProfile(user_id=user.id, current_role="Student", years_experience=0)
        db.add(profile)
        
        # Default skills
        s1 = db.scalar(select(Skill).where(Skill.name == "Python"))
        if not s1:
            s1 = Skill(name="Python", category="Programming")
            db.add(s1)
        
        s2 = db.scalar(select(Skill).where(Skill.name == "Data Analysis"))
        if not s2:
            s2 = Skill(name="Data Analysis", category="Programming")
            db.add(s2)
            
        s3 = db.scalar(select(Skill).where(Skill.name == "Machine Learning"))
        if not s3:
            s3 = Skill(name="Machine Learning", category="Data Science")
            db.add(s3)
            
        s4 = db.scalar(select(Skill).where(Skill.name == "Deep Learning"))
        if not s4:
            s4 = Skill(name="Deep Learning", category="Data Science")
            db.add(s4)
            
        db.flush()
        
        us1 = UserSkill(user_id=user.id, skill_id=s1.id, proficiency_level=80)
        us2 = UserSkill(user_id=user.id, skill_id=s2.id, proficiency_level=65)
        us3 = UserSkill(user_id=user.id, skill_id=s3.id, proficiency_level=10) # Minimal experience
        db.add_all([us1, us2, us3])
        
        target = db.scalar(select(TargetRole).where(TargetRole.title == "ML Engineer"))
        if not target:
            target = TargetRole(title="ML Engineer", industry="Technology")
            db.add(target)
            db.flush()
            
            rs1 = RoleSkillRequirement(role_id=target.id, skill_id=s1.id, required_proficiency=80)
            rs2 = RoleSkillRequirement(role_id=target.id, skill_id=s2.id, required_proficiency=75)
            rs3 = RoleSkillRequirement(role_id=target.id, skill_id=s3.id, required_proficiency=70)
            rs4 = RoleSkillRequirement(role_id=target.id, skill_id=s4.id, required_proficiency=60)
            db.add_all([rs1, rs2, rs3, rs4])
            
        db.commit()
        db.refresh(profile)

    # Fetch user skills
    user_skills_orm = db.scalars(select(UserSkill).where(UserSkill.user_id == user.id)).all()
    user_skill_map = {us.skill.name: us.proficiency_level for us in user_skills_orm if us.skill}
    
    current_skills_schema = [
        SkillSchema(name=name, proficiency=level) 
        for name, level in user_skill_map.items()
    ]
    
    # In a real system, target role could be associated with user
    # For MVP, just fetch the first target role if available
    target = db.scalar(select(TargetRole).where(TargetRole.title == "ML Engineer"))
    
    target_role_schema = None
    gaps_schema = []
    
    if target:
        reqs = db.scalars(select(RoleSkillRequirement).where(RoleSkillRequirement.role_id == target.id)).all()
        required_skill_names = []
        for req in reqs:
            if req.skill:
                required_skill_names.append(req.skill.name)
                current_level = user_skill_map.get(req.skill.name, 0)
                if current_level < req.required_proficiency:
                    gaps_schema.append(
                        SkillGap(
                            skill_name=req.skill.name,
                            current_level=current_level,
                            required_level=req.required_proficiency
                        )
                    )
        
        target_role_schema = TargetRoleSchema(
            title=target.title,
            required_skills=required_skill_names
        )

    return SkillProfile(
        id=str(profile.id),
        current_skills=current_skills_schema,
        target_role=target_role_schema,
        gaps=gaps_schema
    )

def add_skill_to_profile(db: Session, user: User, skill_name: str) -> SkillProfile:
    import random
    
    # 1. Find or create the skill globally
    skill = db.scalar(select(Skill).where(Skill.name == skill_name))
    if not skill:
        skill = Skill(name=skill_name, category="Custom")
        db.add(skill)
        db.flush()
        
    # 2. Add to user profile
    user_skill = db.scalar(select(UserSkill).where(UserSkill.user_id == user.id, UserSkill.skill_id == skill.id))
    if not user_skill:
        # Assign a random initial proficiency
        initial_proficiency = random.randint(10, 40)
        user_skill = UserSkill(user_id=user.id, skill_id=skill.id, proficiency_level=initial_proficiency)
        db.add(user_skill)
        db.commit()
        
    return get_career_profile(db, user)
