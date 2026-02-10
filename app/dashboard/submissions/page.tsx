import React from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import { getSubmissionsByCreator } from '@/lib/supabase/queries';
import { formatINR, formatViews } from '@/lib/viewCounter';
import { ExternalLink, Eye, IndianRupee } from 'lucide-react';

export default async function SubmissionsPage() {
    const submissions = await getSubmissionsByCreator('cr_1');

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">My Submissions</h1>
                <p className="text-[var(--vp-text-secondary)] text-sm mt-1">
                    Track all your campaign submissions and earnings
                </p>
            </div>

            {/* Submissions Table */}
            <div className="table-container glass-card-static">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Platform</th>
                            <th>Status</th>
                            <th>Views</th>
                            <th>Earned</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub.id}>
                                <td>
                                    <div>
                                        <p className="font-medium">{sub.campaign?.title || 'Unknown'}</p>
                                        <p className="text-xs text-[var(--vp-text-muted)]">
                                            Submitted {new Date(sub.submitted_at).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-sm">
                                        {sub.platform === 'instagram_reels' ? '📸 Reels' :
                                            sub.platform === 'youtube_shorts' ? '🎬 Shorts' : '📸🎬 Both'}
                                    </span>
                                </td>
                                <td>
                                    <StatusBadge status={sub.status} />
                                </td>
                                <td>
                                    <div className="flex items-center gap-1.5">
                                        <Eye size={14} className="text-[var(--vp-text-muted)]" />
                                        <span className="font-medium">{formatViews(sub.view_count)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-1.5">
                                        <IndianRupee size={14} className="text-[var(--vp-green)]" />
                                        <span className="font-medium text-[var(--vp-green)]">{formatINR(sub.earned)}</span>
                                    </div>
                                </td>
                                <td>
                                    <a
                                        href={sub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm text-[var(--vp-purple-light)] hover:underline"
                                    >
                                        <ExternalLink size={14} />
                                        View
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Admin notes for rejected submissions */}
            {submissions.filter(s => s.status === 'rejected' && s.admin_notes).length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[#F87171]">Action Required</h3>
                    {submissions
                        .filter(s => s.status === 'rejected' && s.admin_notes)
                        .map(sub => (
                            <div key={sub.id} className="glass-card-static p-4 border-l-4"
                                style={{ borderLeftColor: '#F87171' }}>
                                <p className="font-medium text-sm mb-1">{sub.campaign?.title}</p>
                                <p className="text-sm text-[var(--vp-text-secondary)]">{sub.admin_notes}</p>
                                <Link href={`/dashboard/campaigns/${sub.campaign_id}`}
                                    className="btn-secondary text-xs mt-3 inline-flex no-underline">
                                    Re-submit
                                </Link>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
