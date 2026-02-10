'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Play, Users, Target, ArrowRight, Loader2, Instagram, Youtube } from 'lucide-react';

export default function OnboardingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        niche: '',
        audience_size: '',
        top_video_url: '',
        instagram_url: '',
        youtube_url: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: creator } = await supabase
                .from('creators')
                .select('vetting_status')
                .eq('user_id', user.id)
                .single();

            if (creator?.vetting_status === 'pending') {
                setIsSubmitted(true);
            } else if (creator?.vetting_status === 'approved') {
                router.push('/dashboard');
            }
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { error: updateError } = await supabase
                .from('creators')
                .update({
                    niche: formData.niche,
                    audience_size: formData.audience_size,
                    top_video_url: formData.top_video_url,
                    instagram_url: formData.instagram_url,
                    youtube_url: formData.youtube_url,
                    vetting_status: 'pending'
                })
                .eq('user_id', user.id);

            if (updateError) {
                console.error('Error updating creator profile:', updateError);
                setError(updateError.message);
                setIsLoading(false);
            } else {
                setIsSubmitted(true);
            }
        } else {
            setError('User not found. Please try logging in again.');
            setIsLoading(false);
        }
    };

    if (isLoading && !isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--vp-background)]">
                <Loader2 className="animate-spin text-[var(--vp-purple)]" size={32} />
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--vp-background)]">
                <div className="w-full max-w-md glass-card-static p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                        <Target size={32} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Verification in Progress</h2>
                    <p className="text-[var(--vp-text-secondary)] mb-6">
                        We are currently verifying your profile to ensure quality. This usually takes <span className="text-white font-semibold">24 to 48 hours</span>.
                        <br /><br />
                        You will be notified once verified!
                    </p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="btn-ghost text-sm"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--vp-background)]">
            <div className="w-full max-w-2xl glass-card-static p-8 md:p-12 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Complete your Creator Profile</h1>
                        <p className="text-[var(--vp-text-secondary)]">
                            Help us verify your identity and match you with campaigns.
                        </p>
                        {error && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                                Error: {error}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Niche */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Content Niche
                            </label>
                            <div className="relative">
                                <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <select
                                    value={formData.niche}
                                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                    className="select-field pl-11"
                                    required
                                >
                                    <option value="" disabled>Select a niche</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Tech">Tech & Gadgets</option>
                                    <option value="Beauty">Beauty & Fashion</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Education">Education</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Audience Size */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Total Followers (All Platforms)
                            </label>
                            <div className="relative">
                                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="text"
                                    value={formData.audience_size}
                                    onChange={(e) => setFormData({ ...formData, audience_size: e.target.value })}
                                    placeholder="e.g. 10k, 50,000"
                                    className="input-field pl-11"
                                    required
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                    Instagram Profile URL
                                </label>
                                <div className="relative">
                                    <Instagram size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                    <input
                                        type="url"
                                        value={formData.instagram_url}
                                        onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                        placeholder="https://instagram.com/..."
                                        className="input-field pl-11"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                    YouTube Channel URL
                                </label>
                                <div className="relative">
                                    <Youtube size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                    <input
                                        type="url"
                                        value={formData.youtube_url}
                                        onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                        placeholder="https://youtube.com/@..."
                                        className="input-field pl-11"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Top Video */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Most Viewed Video Link
                            </label>
                            <div className="relative">
                                <Play size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="url"
                                    value={formData.top_video_url}
                                    onChange={(e) => setFormData({ ...formData, top_video_url: e.target.value })}
                                    placeholder="Link to your viral content..."
                                    className="input-field pl-11"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-4 mt-8 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Submit for Verification
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
