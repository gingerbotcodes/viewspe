import React from 'react';
import { IndianRupee, Eye, Send, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import CampaignCard from '@/components/ui/CampaignCard';
import { getCampaigns, getCreatorStats } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/server';

export default async function CreatorDashboard() {
    const campaigns = await getCampaigns();
    const stats = await getCreatorStats('cr_1');

    // Get user's first name from Google account
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Creator';
    const firstName = fullName.split(' ')[0];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Welcome back, <span className="gradient-text">{firstName}</span> 👋
                </h1>
                <p className="text-[var(--vp-text-secondary)] mt-1 text-sm">
                    Here&apos;s your creator dashboard overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    label="Total Earnings"
                    value={`₹${stats.totalEarnings.toLocaleString('en-IN')}`}
                    icon={IndianRupee}
                    gradient="green"
                    trend="+12%"
                    index={0}
                />
                <StatsCard
                    label="Total Views"
                    value={stats.totalViews > 1000 ? `${(stats.totalViews / 1000).toFixed(1)}K` : stats.totalViews}
                    icon={Eye}
                    gradient="purple"
                    trend="+24%"
                    index={1}
                />
                <StatsCard
                    label="Active Gigs"
                    value={stats.activeGigs}
                    icon={TrendingUp}
                    gradient="cyan"
                    index={2}
                />
                <StatsCard
                    label="Pending Approvals"
                    value={stats.pendingApprovals}
                    icon={Send}
                    gradient="warm"
                    index={3}
                />
            </div>

            {/* Campaigns Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Available Campaigns</h2>
                    <span className="text-sm text-[var(--vp-text-muted)]">{campaigns.length} gigs available</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {campaigns.map((campaign, i) => (
                        <CampaignCard key={campaign.id} campaign={campaign} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
