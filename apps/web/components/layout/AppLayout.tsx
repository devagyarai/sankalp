"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { UserResponse } from '@/lib/auth/auth-types';
import { Button } from '@/components/ui/Button';

const NAVIGATION = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'StudySync', href: '/dashboard/study' },
    { name: 'EduPulse', href: '/dashboard/academic' },
    { name: 'SkillMap', href: '/dashboard/career' },
    { name: 'Shield', href: '/dashboard/safety' },
    { name: 'Sentinel', href: '/dashboard/threats' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
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
            } catch {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        await authClient.logout();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium animate-pulse">Loading Sankalp Intelligence...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
                <div className="flex h-16 items-center px-6 border-b border-gray-100">
                    <span className="text-xl font-bold tracking-tight text-gray-900">SANKALP</span>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                    {NAVIGATION.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
                    <div className="flex items-center">
                        {/* Could put breadcrumbs here */}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">{user.email}</span>
                        <Button variant="secondary" onClick={handleLogout} className="text-xs py-1.5 px-3">
                            Sign out
                        </Button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
