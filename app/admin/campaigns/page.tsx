import React from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { getCampaigns } from '@/lib/supabase/queries';
import { formatINR } from '@/lib/viewCounter';
import { Plus } from 'lucide-react';

export default async function AdminCampaignsPage() {
    const campaigns = await getCampaigns();

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Campaign Management</h1>
                    <p className="text-[var(--vp-text-secondary)] text-sm mt-1">
                        View and manage all platform campaigns
                    </p>
                </div>
                <button className="btn-primary text-sm">
                    <Plus size={16} /> New Campaign
                </button>
            </div>

            {/* Campaigns Table */}
            <div className="table-container glass-card-static">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Platform</th>
                            <th>Rate/1K</th>
                            <th>Budget</th>
                            <th>Spent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => {
                            const budgetUsed = Math.round((campaign.spent / campaign.budget_cap) * 100);
                            return (
                                <tr key={campaign.id}>
                                    <td>
                                        <p className="font-medium">{campaign.title}</p>
                                        <p className="text-xs text-[var(--vp-text-muted)] mt-0.5">
                                            Created {new Date(campaign.created_at).toLocaleDateString('en-IN', {
                                                day: 'numeric', month: 'short',
                                            })}
                                        </p>
                                    </td>
                                    <td className="text-sm">
                                        {campaign.platform === 'instagram_reels' ? '📸 Reels' :
                                            campaign.platform === 'youtube_shorts' ? '🎬 Shorts' : '📸🎬 Both'}
                                    </td>
                                    <td className="font-medium">{formatINR(campaign.rate_per_thousand)}</td>
                                    <td>{formatINR(campaign.budget_cap)}</td>
                                    <td>
                                        <div className="space-y-1">
                                            <span className="text-sm">{formatINR(campaign.spent)}</span>
                                            <div className="w-20 h-1 bg-[rgba(255,255,255,0.05)] rounded-full">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${budgetUsed}%`,
                                                        background: budgetUsed > 80 ? '#EF4444' : 'var(--vp-purple)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td><StatusBadge status={campaign.status} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
