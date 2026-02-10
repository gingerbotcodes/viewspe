'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, Wallet, LogOut, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [user, setUser] = useState<{ email?: string; name?: string; avatarUrl?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setUser({
                    email: user.email,
                    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
                    avatarUrl: user.user_metadata?.avatar_url || null,
                });
            }
        });
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push('/');
    };

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

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm text-[var(--vp-text-secondary)] hover:text-white transition no-underline">
                            Creator Hub
                        </Link>
                        <Link href="/advertiser" className="text-sm text-[var(--vp-text-secondary)] hover:text-white transition no-underline">
                            Advertiser
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <Link href="/dashboard/wallet"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm no-underline"
                                    style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <Wallet size={14} className="text-[var(--vp-green)]" />
                                    <span className="text-[var(--vp-green)] font-semibold">Wallet</span>
                                </Link>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                                    style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt="" width={20} height={20} className="rounded-full" />
                                    ) : (
                                        <User size={14} className="text-[var(--vp-purple-light)]" />
                                    )}
                                    <span className="text-[var(--vp-purple-light)] font-medium max-w-[120px] truncate">
                                        {user.name}
                                    </span>
                                </div>
                                <button onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm text-[var(--vp-text-secondary)] hover:text-white transition border border-[var(--glass-border)] hover:border-[var(--vp-border-hover)]">
                                    <LogOut size={14} />
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="btn-primary text-sm no-underline">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button className="md:hidden text-white p-2" onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenu && (
                <div className="md:hidden border-t border-[rgba(139,92,246,0.12)] animate-fade-in"
                    style={{ background: 'rgba(10, 10, 15, 0.95)' }}>
                    <div className="p-4 flex flex-col gap-3">
                        <Link href="/dashboard" className="sidebar-link" onClick={() => setMobileMenu(false)}>
                            Creator Hub
                        </Link>
                        <Link href="/advertiser" className="sidebar-link" onClick={() => setMobileMenu(false)}>
                            Advertiser
                        </Link>
                        <hr className="border-[rgba(139,92,246,0.1)]" />
                        {user ? (
                            <div className="flex flex-col gap-3 px-2">
                                <div className="flex items-center gap-2 text-sm">
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt="" width={24} height={24} className="rounded-full" />
                                    ) : (
                                        <User size={16} className="text-[var(--vp-purple-light)]" />
                                    )}
                                    <span className="text-white font-medium">{user.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href="/dashboard/wallet"
                                        className="flex items-center gap-2 text-sm no-underline"
                                        onClick={() => setMobileMenu(false)}>
                                        <Wallet size={14} className="text-[var(--vp-green)]" />
                                        <span className="text-[var(--vp-green)] font-semibold">Wallet</span>
                                    </Link>
                                    <button onClick={handleLogout} className="btn-ghost text-sm flex items-center gap-2">
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            </div>
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
