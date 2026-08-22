from app.schemas.study import StudyGoal, StudyPerformance, StudyPlan


def get_mock_study_plan() -> StudyPlan:
    return StudyPlan(
        id="plan-1",
        title="Midterm Prep",
        goals=[
            StudyGoal(id="goal-1", title="Data Structures", target_hours=10, completed_hours=4),
            StudyGoal(id="goal-2", title="Algorithms", target_hours=15, completed_hours=2)
        ]
    )

def get_mock_performance() -> StudyPerformance:
    return StudyPerformance(
        average_focus=85,
        total_sessions=12,
        total_minutes=540
    )
