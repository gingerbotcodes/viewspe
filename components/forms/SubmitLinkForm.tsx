'use client';

import React, { useState } from 'react';
import { Send, Link as LinkIcon, Instagram, Youtube } from 'lucide-react';

interface SubmitLinkFormProps {
    campaignId: string;
    campaignTitle: string;
    onSubmit?: (data: { link: string; platform: string }) => void;
    onCancel?: () => void;
}

export default function SubmitLinkForm({ campaignId, campaignTitle, onSubmit, onCancel }: SubmitLinkFormProps) {
    const [link, setLink] = useState('');
    const [platform, setPlatform] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!link || !platform) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSuccess(true);
        onSubmit?.({ link, platform });

        setTimeout(() => {
            setSuccess(false);
            setLink('');
            setPlatform('');
        }, 3000);
    };

    if (success) {
        return (
            <div className="text-center py-8 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                    <Send size={28} className="text-[var(--vp-green)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Link Submitted! 🎉</h3>
                <p className="text-sm text-[var(--vp-text-secondary)]">
                    Your submission for <strong>{campaignTitle}</strong> is now in the approval queue.
                    You&apos;ll be notified once reviewed.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-sm text-[var(--vp-text-secondary)]">
                Submit your posted reel/short link for <strong className="text-[var(--vp-purple-light)]">{campaignTitle}</strong>
            </p>

            {/* Platform selector */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">Platform</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setPlatform('instagram_reels')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${platform === 'instagram_reels'
                                ? 'border-[#E4405F] bg-[rgba(228,64,95,0.1)] text-[#E4405F]'
                                : 'border-[var(--glass-border)] text-[var(--vp-text-muted)] hover:border-[rgba(255,255,255,0.15)]'
                            }`}
                    >
                        <Instagram size={18} />
                        Instagram Reels
                    </button>
                    <button
                        type="button"
                        onClick={() => setPlatform('youtube_shorts')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${platform === 'youtube_shorts'
                                ? 'border-[#FF0000] bg-[rgba(255,0,0,0.1)] text-[#FF0000]'
                                : 'border-[var(--glass-border)] text-[var(--vp-text-muted)] hover:border-[rgba(255,255,255,0.15)]'
                            }`}
                    >
                        <Youtube size={18} />
                        YouTube Shorts
                    </button>
                </div>
            </div>

            {/* Link input */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                    Post Link
                </label>
                <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://www.instagram.com/reel/..."
                        className="input-field pl-11"
                        required
                    />
                </div>
                <p className="text-xs text-[var(--vp-text-muted)]">
                    Paste the direct link to your published reel/short
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn-ghost flex-1">
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={!link || !platform || isSubmitting}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            Submit Link
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
