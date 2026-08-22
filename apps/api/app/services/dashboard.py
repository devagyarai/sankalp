from app.schemas.dashboard import DashboardOverviewResponse, DashboardSummary, Insight, ModuleStatus


def get_mock_overview() -> DashboardOverviewResponse:
    return DashboardOverviewResponse(
        greeting="Welcome back to Sankalp",
        summary=DashboardSummary(
            total_study_hours=42,
            overall_academic_risk="low",
            active_skills_building=3
        ),
        insights=[
            Insight(
                id="ins-1",
                title="Study streak",
                description="You've hit a 5-day study streak!",
                action_url="/study"
            )
        ],
        modules=[
            ModuleStatus(name="Academic", status="active", last_active="2 hours ago"),
            ModuleStatus(name="Career", status="needs_attention", last_active="1 week ago")
        ]
    )
