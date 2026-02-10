'use client';

import React from 'react';
import { IndianRupee, Megaphone, Eye, Users } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import CreateCampaignForm from '@/components/forms/CreateCampaignForm';

export default function AdvertiserDashboard() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Advertiser <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-[var(--vp-text-secondary)] mt-1 text-sm">
                    Create campaigns and reach thousands of micro-influencers
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    label="Active Campaigns"
                    value={3}
                    icon={Megaphone}
                    gradient="purple"
                    index={0}
                />
                <StatsCard
                    label="Total Reach"
                    value="125K"
                    icon={Eye}
                    gradient="cyan"
                    index={1}
                />
                <StatsCard
                    label="Creators Engaged"
                    value={28}
                    icon={Users}
                    gradient="green"
                    index={2}
                />
                <StatsCard
                    label="Total Spent"
                    value="₹1.25L"
                    icon={IndianRupee}
                    gradient="warm"
                    index={3}
                />
            </div>

            {/* Create Campaign Form */}
            <div className="glass-card-static p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Megaphone size={22} className="text-[var(--vp-purple-light)]" />
                    Create New Campaign
                </h2>
                <CreateCampaignForm />
            </div>
        </div>
    );
}
