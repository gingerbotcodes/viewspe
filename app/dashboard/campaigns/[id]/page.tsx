'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Download,
    Eye,
    IndianRupee,
    Instagram,
    Youtube,
    FileText,
    Users,
    Clock,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';
import SubmitLinkForm from '@/components/forms/SubmitLinkForm';
import { Campaign, MOCK_CAMPAIGNS } from '@/lib/supabase/types';
import { formatINR } from '@/lib/viewCounter';

export default function CampaignDetailPage() {
    const params = useParams();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    useEffect(() => {
        const found = MOCK_CAMPAIGNS.find(c => c.id === params.id);
        setCampaign(found || null);
    }, [params.id]);

    if (!campaign) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <p className="text-lg text-[var(--vp-text-muted)]">Campaign not found</p>
                    <Link href="/dashboard" className="btn-secondary mt-4 inline-flex no-underline">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const budgetUsed = Math.round((campaign.spent / campaign.budget_cap) * 100);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Back button */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--vp-text-muted)] hover:text-white transition no-underline">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            {/* Campaign Header */}
            <div className="glass-card-static p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{campaign.title}</h1>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="badge badge-active">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--vp-green)]" />
                                {campaign.status}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-[var(--vp-text-muted)]">
                                {campaign.platform === 'instagram_reels' ? <Instagram size={14} /> :
                                    campaign.platform === 'youtube_shorts' ? <Youtube size={14} /> :
                                        <><Instagram size={14} /><Youtube size={14} /></>}
                                {campaign.platform === 'instagram_reels' ? 'Instagram Reels' :
                                    campaign.platform === 'youtube_shorts' ? 'YouTube Shorts' : 'Both Platforms'}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-secondary">
                            <Download size={16} /> Download Assets
                        </button>
                        <button className="btn-primary" onClick={() => setShowSubmitModal(true)}>
                            Submit Link
                        </button>
                    </div>
                </div>

                {/* Video preview */}
                <div className="h-48 sm:h-64 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))' }}>
                    <div className="flex flex-col items-center gap-3 text-[var(--vp-text-muted)]">
                        <Eye size={40} />
                        <span className="text-sm">Video Preview</span>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.06)' }}>
                        <div className="flex items-center gap-2 text-[var(--vp-green)] mb-1">
                            <IndianRupee size={14} />
                            <span className="text-xs font-medium">Rate</span>
                        </div>
                        <p className="text-lg font-bold">{formatINR(campaign.rate_per_thousand)}<span className="text-xs text-[var(--vp-text-muted)]">/1K views</span></p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(139,92,246,0.06)' }}>
                        <div className="flex items-center gap-2 text-[var(--vp-purple-light)] mb-1">
                            <IndianRupee size={14} />
                            <span className="text-xs font-medium">Max Earn</span>
                        </div>
                        <p className="text-lg font-bold">{formatINR(campaign.max_payout_per_creator)}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(6,182,212,0.06)' }}>
                        <div className="flex items-center gap-2 text-[var(--vp-cyan)] mb-1">
                            <Users size={14} />
                            <span className="text-xs font-medium">Budget Used</span>
                        </div>
                        <p className="text-lg font-bold">{budgetUsed}%</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(236,72,153,0.06)' }}>
                        <div className="flex items-center gap-2 text-[#F472B6] mb-1">
                            <Clock size={14} />
                            <span className="text-xs font-medium">Posted</span>
                        </div>
                        <p className="text-lg font-bold">{new Date(campaign.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                </div>
            </div>

            {/* Description & Script */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card-static p-6">
                    <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                        <FileText size={16} className="text-[var(--vp-purple-light)]" />
                        Description
                    </h3>
                    <p className="text-sm text-[var(--vp-text-secondary)] leading-relaxed">
                        {campaign.description}
                    </p>
                </div>

                <div className="glass-card-static p-6">
                    <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                        <FileText size={16} className="text-[var(--vp-green)]" />
                        Script / Guidelines
                    </h3>
                    <div className="text-sm text-[var(--vp-text-secondary)] leading-relaxed whitespace-pre-line">
                        {campaign.script}
                    </div>
                </div>
            </div>

            {/* Submit Link Modal */}
            <Modal
                isOpen={showSubmitModal}
                onClose={() => setShowSubmitModal(false)}
                title="Submit Your Link"
            >
                <SubmitLinkForm
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                    onCancel={() => setShowSubmitModal(false)}
                    onSubmit={() => {
                        setTimeout(() => setShowSubmitModal(false), 3000);
                    }}
                />
            </Modal>
        </div>
    );
}
