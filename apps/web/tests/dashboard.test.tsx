import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page';
import { intelligenceApi } from '../lib/api/intelligence';
import { authClient } from '../lib/auth/auth-client';
import React from 'react';

// Mock the next/navigation router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
    usePathname: () => '/dashboard',
}));

// Mock API calls
vi.mock('../lib/api/intelligence', () => ({
    intelligenceApi: {
        getOverview: vi.fn(),
    }
}));

vi.mock('../lib/auth/auth-client', () => ({
    authClient: {
        getMe: vi.fn(),
        logout: vi.fn(),
    }
}));

const mockOverview = {
    overall_health: 85,
    domain_scores: {
        Academic: 80,
        Study: 90,
        Career: 85,
        Safety: 85
    },
    trends: [
        { domain: "Academic", direction: "IMPROVING", description: "Trending up" }
    ],
    top_insights: [
        {
            id: "1",
            domain: "CROSS_DOMAIN",
            type: "CAREER_SKILL_PRIORITY",
            title: "Test Insight",
            summary: "Test Summary",
            severity: 50,
            confidence: 0.9,
            evidence: ["Evidence 1"],
            recommended_actions: [],
            created_at: "2024-01-01T00:00:00Z"
        }
    ],
    top_recommendations: [
        {
            domain: "study",
            priority: "high",
            title: "Test Action",
            reason: "Because",
            evidence: [],
            action_url: null,
            confidence: 0.9
        }
    ],
    priority_actions: ["Test Action"],
    data_quality: {
        academic: "sufficient",
        study: "sufficient",
        career: "sufficient",
        safety: "sufficient"
    }
};

import { AuthProvider } from '../lib/auth-context';

describe('DashboardPage', () => {
    it('renders loading or telemetry state initially', () => {
        render(
            <AuthProvider>
                <DashboardPage />
            </AuthProvider>
        );
        expect(screen.getByText(/Syncing Telemetry|Fleet Command|Situation Overview/i)).toBeDefined();
    });

    it('renders dashboard overview after load', async () => {
        render(
            <AuthProvider>
                <DashboardPage />
            </AuthProvider>
        );
        
        await waitFor(() => {
            expect(screen.getByText(/Fleet Command|Situation Overview/i)).toBeDefined();
        });
    });
});
