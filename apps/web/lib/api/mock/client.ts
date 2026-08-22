import {
    StandardResponse,
    DashboardOverviewResponse,
    StudyPlan,
    AcademicOverview,
    SkillProfile,
    SafetyAssessmentResponse,
    ThreatAnalysisResponse,
    ChatQueryResponse,
} from '../types';

export const mockApiClient = {
    async getDashboardOverview(): Promise<StandardResponse<DashboardOverviewResponse>> {
        return {
            success: true,
            data: {
                greeting: "Welcome back to Sankalp (Mock)",
                summary: { total_study_hours: 42, overall_academic_risk: "low", active_skills_building: 3 },
                insights: [],
                modules: []
            }
        };
    },

    async getStudyPlan(): Promise<StandardResponse<StudyPlan>> {
        return {
            success: true,
            data: { id: "plan-1", title: "Midterm Prep (Mock)", goals: [] }
        };
    },

    async getAcademicOverview(): Promise<StandardResponse<AcademicOverview>> {
        return {
            success: true,
            data: {
                gpa: 3.8, attendance_rate: 0.92,
                risk_profile: { risk_level: "low", score: 91, confidence: 0.87, factors: [], recommendations: [] },
                insights: []
            }
        };
    },

    async getCareerProfile(): Promise<StandardResponse<SkillProfile>> {
        return {
            success: true,
            data: { id: "prof-1", current_skills: [], gaps: [] }
        };
    },

    async submitSafetyAssessment(): Promise<StandardResponse<SafetyAssessmentResponse>> {
        return {
            success: true,
            data: { score: { overall_score: 85, categories: [] }, recommendations: [] }
        };
    },

    async analyzeThreat(): Promise<StandardResponse<ThreatAnalysisResponse>> {
        return {
            success: true,
            data: { classification: "safe", risk_score: 10, confidence: 0.9, signals: [], recommendations: [] }
        };
    },

    async queryChat(): Promise<StandardResponse<ChatQueryResponse>> {
        return {
            success: true,
            data: { answer: "Mock answer.", source: "faq", confidence: 0.95 }
        };
    }
};
