import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Megaphone, Users, IndianRupee, Send, ArrowRight } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import { getAdminStats } from '@/lib/supabase/queries';

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Admin <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-[var(--vp-text-secondary)] mt-1 text-sm">
                    Manage campaigns, approvals, and platform activity
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    label="Pending Approvals"
                    value={stats.pendingApprovals}
                    icon={CheckCircle2}
                    gradient="warm"
                    index={0}
                />
                <StatsCard
                    label="Active Campaigns"
                    value={stats.activeCampaigns}
                    icon={Megaphone}
                    gradient="purple"
                    index={1}
                />
                <StatsCard
                    label="Total Submissions"
                    value={stats.totalSubmissions}
                    icon={Send}
                    gradient="cyan"
                    index={2}
                />
                <StatsCard
                    label="Total Spent"
                    value={`₹${stats.totalSpent.toLocaleString('en-IN')}`}
                    icon={IndianRupee}
                    gradient="green"
                    index={3}
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link href="/admin/approvals" className="glass-card p-6 flex items-center justify-between no-underline group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.1))' }}>
                            <CheckCircle2 size={24} className="text-[#F472B6]" />
                        </div>
                        <div>
                            <h3 className="font-bold">Approval Queue</h3>
                            <p className="text-sm text-[var(--vp-text-secondary)]">
                                {stats.pendingApprovals} submissions waiting for review
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-[var(--vp-text-muted)] group-hover:text-white transition" />
                </Link>

                <Link href="/admin/campaigns" className="glass-card p-6 flex items-center justify-between no-underline group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))' }}>
                            <Megaphone size={24} className="text-[var(--vp-purple-light)]" />
                        </div>
                        <div>
                            <h3 className="font-bold">Manage Campaigns</h3>
                            <p className="text-sm text-[var(--vp-text-secondary)]">
                                {stats.totalCampaigns} campaigns total
                            </p>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-[var(--vp-text-muted)] group-hover:text-white transition" />
                </Link>
            </div>
        </div>
    );
}
