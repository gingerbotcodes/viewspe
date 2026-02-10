'use client';

import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    XCircle,
    ExternalLink,
    Eye,
    Clock,
    MessageSquare,
    Instagram,
    Youtube,
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Submission, MOCK_SUBMISSIONS, MOCK_CAMPAIGNS } from '@/lib/supabase/types';

export default function ApprovalsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [filter, setFilter] = useState<'pending' | 'all'>('pending');

    useEffect(() => {
        const subs = MOCK_SUBMISSIONS.map(s => ({
            ...s,
            campaign: MOCK_CAMPAIGNS.find(c => c.id === s.campaign_id),
        }));
        setSubmissions(subs);
    }, []);

    const filteredSubmissions = filter === 'pending'
        ? submissions.filter(s => s.status === 'pending')
        : submissions;

    const handleApprove = (id: string) => {
        setSubmissions(prev => prev.map(s =>
            s.id === id
                ? { ...s, status: 'approved' as const, approved_at: new Date().toISOString(), admin_notes: 'Approved ✓' }
                : s
        ));
    };

    const handleReject = (id: string) => {
        setSubmissions(prev => prev.map(s =>
            s.id === id
                ? { ...s, status: 'rejected' as const, admin_notes: rejectReason || 'Rejected — does not meet guidelines.' }
                : s
        ));
        setRejectReason('');
        setSelectedId(null);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Approval Queue</h1>
                    <p className="text-[var(--vp-text-secondary)] text-sm mt-1">
                        Review and approve creator submissions
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('pending')}
                        className={filter === 'pending' ? 'btn-primary text-sm' : 'btn-ghost text-sm'}
                    >
                        Pending ({submissions.filter(s => s.status === 'pending').length})
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={filter === 'all' ? 'btn-primary text-sm' : 'btn-ghost text-sm'}
                    >
                        All
                    </button>
                </div>
            </div>

            {/* Submissions List */}
            {filteredSubmissions.length === 0 ? (
                <div className="glass-card-static p-12 text-center">
                    <CheckCircle size={48} className="mx-auto mb-4 text-[var(--vp-green)]" />
                    <h3 className="text-lg font-bold mb-2">All caught up! 🎉</h3>
                    <p className="text-sm text-[var(--vp-text-secondary)]">
                        No pending submissions to review right now.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredSubmissions.map((sub) => (
                        <div key={sub.id} className="glass-card-static p-5 space-y-4">
                            {/* Main row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    {/* Platform icon */}
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{
                                            background: sub.platform === 'instagram_reels'
                                                ? 'linear-gradient(135deg, rgba(228,64,95,0.15), rgba(193,53,132,0.1))'
                                                : 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(200,0,0,0.1))'
                                        }}>
                                        {sub.platform === 'instagram_reels'
                                            ? <Instagram size={20} className="text-[#E4405F]" />
                                            : <Youtube size={20} className="text-[#FF0000]" />
                                        }
                                    </div>

                                    <div>
                                        <p className="font-bold">{sub.campaign?.title || 'Unknown Campaign'}</p>
                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                            <span className="text-xs text-[var(--vp-text-muted)] flex items-center gap-1">
                                                <Clock size={12} />
                                                {new Date(sub.submitted_at).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                                                })}
                                            </span>
                                            <a href={sub.link} target="_blank" rel="noopener noreferrer"
                                                className="text-xs text-[var(--vp-purple-light)] flex items-center gap-1 hover:underline">
                                                <ExternalLink size={12} />
                                                View Post
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <StatusBadge status={sub.status} />

                                    {sub.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleApprove(sub.id)}
                                                className="btn-success text-xs py-2 px-4"
                                            >
                                                <CheckCircle size={14} />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setSelectedId(selectedId === sub.id ? null : sub.id)}
                                                className="btn-danger text-xs py-2 px-4"
                                            >
                                                <XCircle size={14} />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Reject reason input (expanded) */}
                            {selectedId === sub.id && sub.status === 'pending' && (
                                <div className="pt-2 border-t border-[var(--glass-border)] animate-fade-in space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-[var(--vp-text-secondary)]">
                                        <MessageSquare size={14} />
                                        Rejection Reason
                                    </div>
                                    <textarea
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                        placeholder="Explain why this submission was rejected..."
                                        className="input-field"
                                        rows={2}
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => setSelectedId(null)} className="btn-ghost text-xs">
                                            Cancel
                                        </button>
                                        <button onClick={() => handleReject(sub.id)} className="btn-danger text-xs">
                                            Confirm Reject
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Admin notes (for non-pending) */}
                            {sub.admin_notes && sub.status !== 'pending' && (
                                <div className="pt-2 border-t border-[var(--glass-border)]">
                                    <p className="text-xs text-[var(--vp-text-muted)] flex items-center gap-1">
                                        <MessageSquare size={12} />
                                        {sub.admin_notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
