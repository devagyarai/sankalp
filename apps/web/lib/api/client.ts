import {
    StandardResponse,
    DashboardOverviewResponse,
    StudyPlan,
    AcademicOverview,
    SkillProfile,
    SafetyAssessmentResponse,
    ThreatAnalysisResponse,
    ChatQueryResponse,
} from './types';
import { mockApiClient } from './mock/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}/api/v1${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url, { credentials: 'include', ...options, headers });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error?.error?.message || 'API request failed');
        }

        return response.json();
    }

    // Standard HTTP Methods
    async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', headers });
    }

    async post<T>(endpoint: string, body: unknown, headers?: HeadersInit): Promise<T> {
        return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), headers });
    }

    async patch<T>(endpoint: string, body: unknown, headers?: HeadersInit): Promise<T> {
        return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body), headers });
    }

    async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', headers });
    }

    // Dashboard
    async getDashboardOverview(): Promise<StandardResponse<DashboardOverviewResponse>> {
        if (USE_MOCK_API) return mockApiClient.getDashboardOverview();
        return this.request<StandardResponse<DashboardOverviewResponse>>('/dashboard/overview');
    }

    // Study
    async getStudyPlan(): Promise<StandardResponse<StudyPlan>> {
        if (USE_MOCK_API) return mockApiClient.getStudyPlan();
        return this.request<StandardResponse<StudyPlan>>('/study/plan');
    }

    // Academic
    async getAcademicOverview(): Promise<StandardResponse<AcademicOverview>> {
        if (USE_MOCK_API) return mockApiClient.getAcademicOverview();
        return this.request<StandardResponse<AcademicOverview>>('/academic/overview');
    }

    // Career
    async getCareerProfile(): Promise<StandardResponse<SkillProfile>> {
        if (USE_MOCK_API) return mockApiClient.getCareerProfile();
        return this.request<StandardResponse<SkillProfile>>('/career/profile');
    }

    // Safety
    async submitSafetyAssessment(answers: Record<string, string>): Promise<StandardResponse<SafetyAssessmentResponse>> {
        if (USE_MOCK_API) return mockApiClient.submitSafetyAssessment();
        return this.request<StandardResponse<SafetyAssessmentResponse>>('/safety/assessment', {
            method: 'POST',
            body: JSON.stringify({ answers }),
        });
    }

    // Threat
    async analyzeThreat(content: string, contentType: string): Promise<StandardResponse<ThreatAnalysisResponse>> {
        if (USE_MOCK_API) return mockApiClient.analyzeThreat();
        return this.request<StandardResponse<ThreatAnalysisResponse>>('/threat/analyze', {
            method: 'POST',
            body: JSON.stringify({ content, content_type: contentType }),
        });
    }

    // Chat
    async queryChat(message: string): Promise<StandardResponse<ChatQueryResponse>> {
        if (USE_MOCK_API) return mockApiClient.queryChat();
        return this.request<StandardResponse<ChatQueryResponse>>('/chat/query', {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
    }
}

export const apiClient = new ApiClient();
