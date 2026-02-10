'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, XCircle, ExternalLink, Clock, User, Youtube, Instagram, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Creator {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    niche: string;
    audience_size: string;
    top_video_url: string;
    vetting_status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export default function VettingPage() {
    const [creators, setCreators] = useState<Creator[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPendingCreators();
    }, []);

    const fetchPendingCreators = async () => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('creators')
            .select('*')
            .eq('vetting_status', 'pending')
            .order('created_at', { ascending: false });

        if (data) {
            setCreators(data as Creator[]);
        }
        setIsLoading(false);
    };

    const handleApprove = async (id: string) => {
        const supabase = createClient();
        await supabase
            .from('creators')
            .update({ vetting_status: 'approved' })
            .eq('id', id);

        setCreators(prev => prev.filter(c => c.id !== id));
    };

    const handleReject = async (id: string) => {
        if (!confirm('Are you sure you want to reject this creator?')) return;

        const supabase = createClient();
        await supabase
            .from('creators')
            .update({ vetting_status: 'rejected' })
            .eq('id', id);

        setCreators(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Creator Vetting</h1>
                    <p className="text-[var(--vp-text-secondary)] text-sm mt-1">
                        Review pending creator profiles ({creators.length})
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="animate-spin text-[var(--vp-purple)]" size={32} />
                </div>
            ) : creators.length === 0 ? (
                <div className="glass-card-static p-12 text-center">
                    <CheckCircle size={48} className="mx-auto mb-4 text-[var(--vp-green)]" />
                    <h3 className="text-lg font-bold mb-2">No pending reviews</h3>
                    <p className="text-sm text-[var(--vp-text-secondary)]">
                        All creator profiles have been reviewed.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {creators.map((creator) => (
                        <div key={creator.id} className="glass-card-static p-6 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                {/* Creator Info */}
                                <div className="flex items-start gap-4">
                                    {creator.avatar_url ? (
                                        <Image src={creator.avatar_url} alt="" width={48} height={48} className="rounded-full" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-[var(--vp-purple)]/20 flex items-center justify-center">
                                            <User size={24} className="text-[var(--vp-purple)]" />
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="font-bold text-lg">{creator.name}</h3>
                                        <p className="text-sm text-[var(--vp-text-muted)] flex items-center gap-2 mb-2">
                                            {creator.email}
                                            <span className="w-1 h-1 rounded-full bg-[var(--vp-text-muted)]" />
                                            {new Date(creator.created_at).toLocaleDateString()}
                                        </p>

                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mt-3">
                                            <div>
                                                <span className="text-[var(--vp-text-secondary)]">Niche:</span>
                                                <span className="ml-2 font-medium">{creator.niche}</span>
                                            </div>
                                            <div>
                                                <span className="text-[var(--vp-text-secondary)]">Audience:</span>
                                                <span className="ml-2 font-medium">{creator.audience_size}</span>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <a
                                                href={creator.top_video_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-[var(--vp-purple-light)] hover:underline bg-[var(--vp-purple)]/10 px-3 py-1.5 rounded-lg border border-[var(--vp-purple)]/20"
                                            >
                                                {creator.top_video_url.includes('instagram') ? <Instagram size={14} /> : <Youtube size={14} />}
                                                View Most Popular Video
                                                <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleApprove(creator.id)}
                                        className="btn-success py-2 px-4 flex items-center gap-2"
                                    >
                                        <CheckCircle size={16} />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(creator.id)}
                                        className="btn-danger py-2 px-4 flex items-center gap-2"
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
