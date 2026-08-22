"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';
import { UserResponse } from '@/lib/auth/auth-types';
import { Activity, Bell, Compass, LayoutDashboard, Shield, ShieldAlert, Settings, User, LogOut, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatWidget } from '@/components/chatbot/ChatWidget';

const NAVIGATION = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    { name: 'Explore', href: '/explore', icon: <Compass /> },
    { name: 'Shape', href: '/shape', icon: <Activity /> },
    { name: 'Insight', href: '/insight', icon: <Activity /> },
    { name: 'Secure', href: '/secure', icon: <Shield /> },
    { name: 'Watch', href: '/watch', icon: <ShieldAlert /> },
    { name: 'Connect', href: '/connect', icon: <Activity /> },
];

export function StitchAppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For the dummy view, we'll bypass real authentication so you can preview the UI easily.
        const mockUser = {
            id: 'mock-123',
            email: 'admin@sankalp.workspace',
            role: 'COMMANDER'
        };
        setUser(mockUser);
        setLoading(false);
    }, []);

    const handleLogout = async () => {
        await authClient.logout();
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                    <Rocket className="w-8 h-8 text-[#00e5ff] animate-bounce" />
                    <p className="text-[#00e5ff] font-medium tracking-widest uppercase text-sm animate-pulse">Engaging Cypherverse...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-slate-100 flex flex-col md:flex-row overflow-hidden relative font-sans selection:bg-[#00e5ff]/30 selection:text-white">
            {/* Background gradients for cosmic vibe */}
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00e5ff]/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#b042ff]/10 blur-[100px]" />
            </div>

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-r border-zinc-900 bg-black/60 backdrop-blur-xl z-10 flex flex-col h-16 md:h-screen shrink-0">
                <div className="p-4 md:p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#b042ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                        <Rocket className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-black text-xl tracking-widest text-white drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">SANKALP</span>
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

                <div className="hidden md:flex p-4 mt-auto border-t border-zinc-900 flex-col gap-2">
                    <div className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-zinc-900/80 cursor-pointer transition-colors border border-transparent hover:border-[#00e5ff]/20">
                        <div className="w-8 h-8 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-[#00e5ff]" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate text-zinc-200">{user.email.split('@')[0]}</p>
                            <p className="text-xs text-zinc-500 font-medium truncate uppercase tracking-wider">{user.role}</p>
                        </div>
                        <Settings className="w-4 h-4 text-zinc-500 hover:text-[#00e5ff] shrink-0 transition-colors" />
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-400 cursor-pointer transition-colors border border-transparent hover:border-red-500/20"
                    >
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            <LogOut className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wider">Abort Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] md:h-screen overflow-hidden z-10 relative">
                {/* Topbar */}
                <header className="h-16 border-b border-zinc-900 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
                    <h1 className="text-lg font-black tracking-wide text-white uppercase">
                        {pathname === '/dashboard' ? 'Command Center' : pathname.split('/').pop()}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative cursor-pointer hover:bg-zinc-900 p-2 rounded-xl transition-all border border-transparent hover:border-[#00e5ff]/30 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                            <Bell className="w-5 h-5 text-zinc-400 hover:text-[#00e5ff] transition-colors" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff4281] rounded-full shadow-[0_0_8px_rgba(255,66,129,0.8)]"></span>
                        </div>
                    </div>
                </header>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth relative">
                    {/* Grid Pattern overlay for content area */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
                         style={{ backgroundImage: 'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                    />
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
                
                <ChatWidget />
            </main>
        </div>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactElement<{ className?: string }>; label: string; active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-300 group",
            active ? "bg-[#0d172a]/80 text-[#00e5ff] border border-[#00e5ff]/30 shadow-[0_0_15px_rgba(0,229,255,0.15)]" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
        )}>
            {React.cloneElement(icon, {
                className: cn(icon.props.className, "w-5 h-5 transition-all duration-300", active ? "text-[#00e5ff] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" : "text-zinc-500 group-hover:text-zinc-300")
            })}
            <span className="font-bold text-sm tracking-wide uppercase">{label}</span>
            {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            )}
        </div>
    );
}
