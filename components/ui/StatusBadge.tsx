import React from 'react';
import { SubmissionStatus } from '@/lib/supabase/types';

interface StatusBadgeProps {
    status: SubmissionStatus | string;
}

const statusConfig: Record<string, { className: string; label: string }> = {
    active: { className: 'badge-active', label: 'Active' },
    pending: { className: 'badge-pending', label: 'Pending' },
    approved: { className: 'badge-approved', label: 'Approved' },
    rejected: { className: 'badge-rejected', label: 'Rejected' },
    earning: { className: 'badge-earning', label: 'Earning' },
    capped: { className: 'badge-capped', label: 'Capped' },
    completed: { className: 'badge-capped', label: 'Completed' },
    draft: { className: 'badge-capped', label: 'Draft' },
    paused: { className: 'badge-pending', label: 'Paused' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = statusConfig[status] || { className: 'badge-capped', label: status };

    return (
        <span className={`badge ${config.className}`}>
            <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                    background: 'currentColor',
                    opacity: 0.8,
                }}
            />
            {config.label}
        </span>
    );
}
