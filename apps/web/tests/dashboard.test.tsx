import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page';
import { AuthProvider } from '../lib/auth-context';
import React from 'react';

// Mock next/navigation router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
    usePathname: () => '/dashboard',
}));

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
