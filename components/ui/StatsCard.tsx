import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    gradient?: 'purple' | 'green' | 'cyan' | 'warm';
    index?: number;
}

const gradientMap = {
    purple: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))',
    green: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
    cyan: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))',
    warm: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.05))',
};

const iconColorMap = {
    purple: 'var(--vp-purple-light)',
    green: 'var(--vp-green)',
    cyan: 'var(--vp-cyan)',
    warm: '#F472B6',
};

export default function StatsCard({
    label,
    value,
    icon: Icon,
    trend,
    gradient = 'purple',
    index = 0,
}: StatsCardProps) {
    return (
        <div
            className={`glass-card-static p-5 flex flex-col gap-3 animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
        >
            <div className="flex items-center justify-between">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: gradientMap[gradient] }}
                >
                    <Icon size={20} style={{ color: iconColorMap[gradient] }} />
                </div>
                {trend && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                            background: trend.startsWith('+')
                                ? 'rgba(16,185,129,0.1)'
                                : 'rgba(239,68,68,0.1)',
                            color: trend.startsWith('+') ? '#34D399' : '#F87171',
                        }}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-[var(--vp-text-muted)] mt-1">{label}</p>
            </div>
        </div>
    );
}
