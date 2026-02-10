'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Menu, X, Wallet, LogOut, User,
    LayoutDashboard, Send, Settings
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar({ minimal = false }: { minimal?: boolean }) {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [accountMenu, setAccountMenu] = useState(false);
    const [user, setUser] = useState<{ email?: string; name?: string; avatarUrl?: string; role?: string } | null>(null);
    const accountRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(async ({ data: { user } }) => {
            if (user) {
                // Get role from profiles table
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                setUser({
                    email: user.email,
                    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
                    avatarUrl: user.user_metadata?.avatar_url || null,
                    role: profile?.role || 'creator',
                });
            }
        });
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
                setAccountMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        setAccountMenu(false);
        router.push('/');
    };

    const accountLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/submissions', label: 'My Submissions', icon: Send },
        { href: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(139,92,246,0.12)]"
            style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(20px)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 no-underline">
                        <Image
                            src="/logo.png"
                            alt="ViewsPeCash"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold gradient-text">ViewsPeCash</span>
                    </Link>

                    {/* Desktop Nav — only show relevant link based on role */}
                    {!minimal && (
                        <div className="hidden md:flex items-center gap-6">
                            {(!user || user.role === 'creator') && (
                                <Link href="/dashboard" className="text-sm text-[var(--vp-text-secondary)] hover:text-white transition no-underline">
                                    Creator Hub
                                </Link>
                            )}
                            {(!user || user.role === 'advertiser') && (
                                <Link href="/advertiser" className="text-sm text-[var(--vp-text-secondary)] hover:text-white transition no-underline">
                                    Advertiser
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        {minimal ? (
                            <Link href="/auth/login" className="btn-primary text-sm no-underline">
                                Login
                            </Link>
                        ) : user ? (
                            <div className="relative" ref={accountRef}>
                                <button
                                    onClick={() => setAccountMenu(!accountMenu)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all hover:ring-2 hover:ring-[var(--vp-purple)] hover:ring-opacity-50"
                                    style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
                                >
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt="" width={24} height={24} className="rounded-full" />
                                    ) : (
                                        <User size={16} className="text-[var(--vp-purple-light)]" />
                                    )}
                                    <span className="text-[var(--vp-purple-light)] font-medium max-w-[120px] truncate">
                                        {user.name}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                {accountMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--glass-border)] overflow-hidden animate-fade-in"
                                        style={{ background: 'rgba(18, 18, 24, 0.98)', backdropFilter: 'blur(20px)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                                        {/* User info */}
                                        <div className="px-4 py-3 border-b border-[var(--glass-border)]">
                                            <p className="text-sm font-medium truncate">{user.name}</p>
                                            <p className="text-xs text-[var(--vp-text-muted)] truncate">{user.email}</p>
                                        </div>
                                        {/* Links */}
                                        <div className="py-1">
                                            {accountLinks.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--vp-text-secondary)] hover:text-white hover:bg-[rgba(139,92,246,0.1)] transition no-underline"
                                                    onClick={() => setAccountMenu(false)}
                                                >
                                                    <item.icon size={16} />
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        {/* Logout */}
                                        <div className="border-t border-[var(--glass-border)] py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition w-full"
                                            >
                                                <LogOut size={16} />
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className="btn-primary text-sm no-underline">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    {minimal ? (
                        <Link href="/auth/login" className="md:hidden btn-primary text-sm no-underline">
                            Login
                        </Link>
                    ) : (
                        <button className="md:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
                            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenu && (
                <div className="md:hidden border-t border-[rgba(139,92,246,0.12)] animate-fade-in"
                    style={{ background: 'rgba(10, 10, 15, 0.95)' }}>
                    <div className="p-4 flex flex-col gap-1">
                        {(!user || user.role === 'creator') && (
                            <Link href="/dashboard" className="sidebar-link" onClick={() => setMobileMenu(false)}>
                                <LayoutDashboard size={16} /> Creator Hub
                            </Link>
                        )}
                        {(!user || user.role === 'advertiser') && (
                            <Link href="/advertiser" className="sidebar-link" onClick={() => setMobileMenu(false)}>
                                Advertiser
                            </Link>
                        )}
                        <hr className="border-[rgba(139,92,246,0.1)] my-2" />
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2 text-sm">
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt="" width={28} height={28} className="rounded-full" />
                                    ) : (
                                        <User size={18} className="text-[var(--vp-purple-light)]" />
                                    )}
                                    <div>
                                        <p className="text-white font-medium text-sm">{user.name}</p>
                                        <p className="text-[var(--vp-text-muted)] text-xs">{user.email}</p>
                                    </div>
                                </div>
                                {accountLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="sidebar-link"
                                        onClick={() => setMobileMenu(false)}
                                    >
                                        <item.icon size={16} />
                                        {item.label}
                                    </Link>
                                ))}
                                <hr className="border-[rgba(139,92,246,0.1)] my-2" />
                                <button onClick={handleLogout} className="sidebar-link text-red-400 hover:text-red-300">
                                    <LogOut size={16} />
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="btn-primary text-sm no-underline w-full text-center"
                                onClick={() => setMobileMenu(false)}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
