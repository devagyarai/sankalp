"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { UserResponse } from '@/lib/auth/auth-types';
import { Activity, Bell, Compass, LayoutDashboard, Shield, ShieldAlert, Settings, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAVIGATION = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    { name: 'StudySync', href: '/dashboard/study', icon: <Compass /> },
    { name: 'EduPulse', href: '/dashboard/academic', icon: <Activity /> },
    { name: 'SkillMap', href: '/dashboard/career', icon: <Activity /> },
    { name: 'Shield', href: '/dashboard/safety', icon: <Shield /> },
    { name: 'Sentinel', href: '/dashboard/threats', icon: <ShieldAlert /> },
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
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="text-muted-foreground font-medium animate-pulse">Loading Sankalp Intelligence...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden relative font-sans">
            {/* Background gradients for futuristic vibe */}
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r border-border/40 bg-card/20 backdrop-blur-xl z-10 flex flex-col h-16 md:h-screen shrink-0">
                <div className="p-4 md:p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <Activity className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-wider glow-text">SANKALP</span>
                </div>
                
                <nav className="flex-1 hidden md:flex flex-col gap-2 px-4 mt-6">
                    {NAVIGATION.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.name} href={item.href}>
                                <NavItem icon={item.icon} label={item.name} active={isActive} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex p-4 mt-auto border-t border-border/40 flex-col gap-2">
                    <div className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.email.split('@')[0]}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                        </div>
                        <Settings className="w-4 h-4 text-muted-foreground hover:text-foreground shrink-0" />
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-red-400 cursor-pointer transition-colors"
                    >
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden z-10 relative">
                {/* Topbar */}
                <header className="h-16 border-b border-border/40 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
                    <h1 className="text-lg font-semibold text-foreground/80 capitalize">
                        {pathname === '/dashboard' ? 'Command Center' : pathname.split('/').pop()}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span>
                        </div>
                    </div>
                </header>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    {children}
                </div>
                
            </main>
        </div>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactElement<{ className?: string }>; label: string; active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
            active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
        )}>
            {React.cloneElement(icon, {
                className: cn(icon.props.className, "w-5 h-5", active ? "text-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "text-muted-foreground group-hover:text-foreground transition-colors")
            })}
            <span className="font-medium text-sm">{label}</span>
            {active && (
                <div className="ml-auto w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
            )}
        </div>
    );
}
