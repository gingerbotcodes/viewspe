'use client';

import React, { useState } from 'react';
import { Upload, FileVideo, Megaphone, DollarSign, FileText } from 'lucide-react';

interface CreateCampaignFormProps {
    onSubmit?: (data: CampaignFormData) => void;
}

interface CampaignFormData {
    title: string;
    description: string;
    script: string;
    platform: string;
    rate_per_thousand: number;
    budget_cap: number;
    max_payout_per_creator: number;
}

export default function CreateCampaignForm({ onSubmit }: CreateCampaignFormProps) {
    const [formData, setFormData] = useState<CampaignFormData>({
        title: '',
        description: '',
        script: '',
        platform: 'instagram_reels',
        rate_per_thousand: 10,
        budget_cap: 50000,
        max_payout_per_creator: 5000,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (field: keyof CampaignFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmitting(false);
        setSuccess(true);
        onSubmit?.(formData);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (success) {
        return (
            <div className="text-center py-12 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
                    <Megaphone size={28} className="text-[var(--vp-purple-light)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Campaign Created! 🚀</h3>
                <p className="text-sm text-[var(--vp-text-secondary)]">
                    Your campaign is now live. Creators can start picking it up.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)] flex items-center gap-2">
                    <Megaphone size={14} /> Campaign Title
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    placeholder="e.g., Ludo King Summer Promo"
                    className="input-field"
                    required
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">Description</label>
                <textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    placeholder="What should the creator do? Describe the campaign..."
                    className="input-field"
                    rows={3}
                    required
                />
            </div>

            {/* Script */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)] flex items-center gap-2">
                    <FileText size={14} /> Script / Guidelines
                </label>
                <textarea
                    value={formData.script}
                    onChange={e => handleChange('script', e.target.value)}
                    placeholder="Step-by-step script for the creator to follow..."
                    className="input-field"
                    rows={4}
                    required
                />
            </div>

            {/* Video Upload Area */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)] flex items-center gap-2">
                    <FileVideo size={14} /> Video Asset
                </label>
                <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-8 text-center hover:border-[var(--vp-purple)] transition-colors cursor-pointer"
                    style={{ background: 'rgba(139, 92, 246, 0.03)' }}>
                    <Upload size={32} className="mx-auto mb-3 text-[var(--vp-text-muted)]" />
                    <p className="text-sm text-[var(--vp-text-secondary)]">
                        Drop your video file here or <span className="text-[var(--vp-purple-light)] font-medium">browse</span>
                    </p>
                    <p className="text-xs text-[var(--vp-text-muted)] mt-1">MP4, MOV • Max 100MB</p>
                </div>
            </div>

            {/* Platform */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">Target Platform</label>
                <select
                    value={formData.platform}
                    onChange={e => handleChange('platform', e.target.value)}
                    className="select-field"
                >
                    <option value="instagram_reels">Instagram Reels</option>
                    <option value="youtube_shorts">YouTube Shorts</option>
                    <option value="both">Both Platforms</option>
                </select>
            </div>

            {/* Budget Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--vp-text-secondary)] flex items-center gap-2">
                        <DollarSign size={14} /> Rate / 1K Views
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)] text-sm">₹</span>
                        <input
                            type="number"
                            value={formData.rate_per_thousand}
                            onChange={e => handleChange('rate_per_thousand', Number(e.target.value))}
                            className="input-field pl-8"
                            min={1}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--vp-text-secondary)]">Total Budget</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)] text-sm">₹</span>
                        <input
                            type="number"
                            value={formData.budget_cap}
                            onChange={e => handleChange('budget_cap', Number(e.target.value))}
                            className="input-field pl-8"
                            min={1000}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--vp-text-secondary)]">Max / Creator</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)] text-sm">₹</span>
                        <input
                            type="number"
                            value={formData.max_payout_per_creator}
                            onChange={e => handleChange('max_payout_per_creator', Number(e.target.value))}
                            className="input-field pl-8"
                            min={100}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting || !formData.title}
                className="btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Campaign...
                    </>
                ) : (
                    <>
                        <Megaphone size={18} />
                        Launch Campaign
                    </>
                )}
            </button>
        </form>
    );
}
