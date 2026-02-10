'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileVideo,
    Send,
    Wallet,
    CheckCircle2,
    Megaphone,
    BarChart3,
    Menu,
    X,
    Shield,
    Settings,
} from 'lucide-react';

interface SidebarProps {
    role: 'creator' | 'admin' | 'advertiser';
}

const navItems = {
    creator: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/submissions', label: 'My Submissions', icon: Send },
        { href: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ],
    admin: [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/vetting', label: 'Vetting', icon: Shield },
        { href: '/admin/approvals', label: 'Submissions', icon: CheckCircle2 },
        { href: '/admin/campaigns', label: 'Campaigns', icon: Megaphone },
    ],
    advertiser: [
        { href: '/advertiser', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/advertiser', label: 'My Campaigns', icon: FileVideo },
        { href: '/advertiser', label: 'Analytics', icon: BarChart3 },
    ],
};

const roleLabels = {
    creator: { label: 'Creator Hub', icon: FileVideo, color: 'var(--vp-green)' },
    admin: { label: 'Admin Panel', icon: Shield, color: '#F87171' },
    advertiser: { label: 'Advertiser', icon: Megaphone, color: 'var(--vp-purple-light)' },
};

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const items = navItems[role];
    const roleInfo = roleLabels[role];

    return (
        <aside className="sidebar hidden md:block fixed md:sticky top-0 z-40 pt-20"
            style={{ height: '100vh' }}>
            {/* Role label */}
            <div className="px-6 py-4 mb-2">
                <div className="flex items-center gap-2">
                    <roleInfo.icon size={16} style={{ color: roleInfo.color }} />
                    <span className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: roleInfo.color }}>
                        {roleInfo.label}
                    </span>
                </div>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-1 px-2">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href + item.label}
                            href={item.href}
                            className={`sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
