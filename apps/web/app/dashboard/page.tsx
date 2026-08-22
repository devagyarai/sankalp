"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { UserResponse } from '@/lib/auth/auth-types';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authClient.getMe();
                if (res.success && res.data) {
                    setUser(res.data);
                } else {
                    router.push('/login');
                }
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!user) return null; // Prevent flash before redirect

    const handleLogout = async () => {
        await authClient.logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, {user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Sign out
                </button>
            </header>
            <main>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900">Sankalp Intelligence Engines</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        This is the protected application shell. Domain intelligence modules will be mounted here.
                    </p>
                </div>
            </main>
        </div>
    );
}
