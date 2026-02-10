'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Wallet } from 'lucide-react';

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);

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
                        <Link href="/admin" className="text-sm text-[var(--vp-text-secondary)] hover:text-white transition no-underline">
                            Admin
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                            style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <Wallet size={14} className="text-[var(--vp-green)]" />
                            <span className="text-[var(--vp-green)] font-semibold">₹8,400</span>
                        </div>
                        <Link href="/auth/login" className="btn-primary text-sm no-underline">
                            Login
                        </Link>
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
                        <Link href="/admin" className="sidebar-link" onClick={() => setMobileMenu(false)}>
                            Admin
                        </Link>
                        <hr className="border-[rgba(139,92,246,0.1)]" />
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Wallet size={14} className="text-[var(--vp-green)]" />
                                <span className="text-[var(--vp-green)] font-semibold">₹8,400</span>
                            </div>
                            <Link href="/auth/login" className="btn-primary text-sm no-underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
