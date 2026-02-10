import React from 'react';
import Link from 'next/link';
import { Campaign } from '@/lib/supabase/types';
import { formatINR } from '@/lib/viewCounter';
import { Download, ExternalLink, Eye, Instagram, Youtube } from 'lucide-react';

interface CampaignCardProps {
    campaign: Campaign;
    index?: number;
}

function PlatformIcon({ platform }: { platform: string }) {
    switch (platform) {
        case 'instagram_reels':
            return <Instagram size={14} />;
        case 'youtube_shorts':
            return <Youtube size={14} />;
        default:
            return (
                <span className="flex gap-1">
                    <Instagram size={14} />
                    <Youtube size={14} />
                </span>
            );
    }
}

function platformLabel(platform: string) {
    switch (platform) {
        case 'instagram_reels': return 'Instagram Reels';
        case 'youtube_shorts': return 'YouTube Shorts';
        default: return 'Reels + Shorts';
    }
}

export default function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
    const budgetUsed = campaign.budget_cap > 0
        ? Math.round((campaign.spent / campaign.budget_cap) * 100)
        : 0;

    return (
        <div
            className={`glass-card p-5 flex flex-col gap-4 animate-fade-in-up delay-${index + 1}`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Video preview area */}
            <div className="relative h-36 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.1))' }}>
                <div className="flex flex-col items-center gap-2 text-[var(--vp-text-muted)]">
                    <Eye size={28} />
                    <span className="text-xs">Video Preview</span>
                </div>

                {/* Platform badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', color: 'var(--vp-text-primary)' }}>
                    <PlatformIcon platform={campaign.platform} />
                    {platformLabel(campaign.platform)}
                </div>

                {/* Rate badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'var(--gradient-accent)', color: 'white' }}>
                    {formatINR(campaign.rate_per_thousand)}/1K
                </div>
            </div>

            {/* Title & Status */}
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-base leading-tight">{campaign.title}</h3>
                <span className="badge badge-active whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--vp-green)]" />
                    {campaign.status}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--vp-text-secondary)] line-clamp-2 leading-relaxed">
                {campaign.description}
            </p>

            {/* Budget Progress */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-[var(--vp-text-muted)]">Budget Used</span>
                    <span className="text-[var(--vp-text-secondary)]">
                        {formatINR(campaign.spent)} / {formatINR(campaign.budget_cap)}
                    </span>
                </div>
                <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                            width: `${budgetUsed}%`,
                            background: budgetUsed > 80 ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : 'var(--gradient-primary)',
                        }}
                    />
                </div>
            </div>

            {/* Max payout info */}
            <div className="text-xs text-[var(--vp-text-muted)]">
                Max earn per creator: <span className="text-[var(--vp-green)] font-semibold">{formatINR(campaign.max_payout_per_creator)}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-auto">
                <button className="btn-secondary flex-1 text-xs py-2.5">
                    <Download size={14} />
                    Assets
                </button>
                <Link
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="btn-primary flex-1 text-xs py-2.5 no-underline"
                >
                    <ExternalLink size={14} />
                    Take Gig
                </Link>
            </div>
        </div>
    );
}
