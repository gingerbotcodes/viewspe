import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, IndianRupee, Clock, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/ui/StatsCard';
import { formatINR } from '@/lib/viewCounter';

export default function WalletPage() {
    // Mock wallet data
    const balance = 8400;
    const totalEarnings = 15600;
    const pendingPayout = 3200;

    const transactions = [
        { id: 1, type: 'earning', description: 'Ludo King Promo — 2,260 views', amount: 2260, date: '2026-02-09' },
        { id: 2, type: 'earning', description: 'FitTrack Band Unboxing — 1,200 views', amount: 36, date: '2026-02-08' },
        { id: 3, type: 'payout', description: 'UPI Payout to user@upi', amount: -5000, date: '2026-02-05' },
        { id: 4, type: 'earning', description: 'LearnCode Bootcamp — 5,000 views', amount: 375, date: '2026-02-04' },
        { id: 5, type: 'earning', description: 'CryptoTrade App — 12,000 views', amount: 1200, date: '2026-02-03' },
        { id: 6, type: 'payout', description: 'UPI Payout to user@upi', amount: -2000, date: '2026-02-01' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold">Wallet</h1>
                <p className="text-[var(--vp-text-secondary)] text-sm mt-1">
                    Manage your earnings and payouts
                </p>
            </div>

            {/* Balance Card */}
            <div className="glass-card-static p-8 relative overflow-hidden">
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.08), transparent 60%)' }} />
                <div className="relative z-10">
                    <p className="text-sm text-[var(--vp-text-muted)] mb-2">Available Balance</p>
                    <p className="text-4xl sm:text-5xl font-bold gradient-text-accent mb-6">
                        {formatINR(balance)}
                    </p>
                    <button className="btn-success text-base px-8 py-3">
                        <Wallet size={18} />
                        Withdraw via UPI
                    </button>
                    <p className="text-xs text-[var(--vp-text-muted)] mt-3">
                        Instant payout to your linked UPI ID
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard
                    label="Total Earnings"
                    value={formatINR(totalEarnings)}
                    icon={TrendingUp}
                    gradient="green"
                    index={0}
                />
                <StatsCard
                    label="Current Balance"
                    value={formatINR(balance)}
                    icon={IndianRupee}
                    gradient="purple"
                    index={1}
                />
                <StatsCard
                    label="Pending Payout"
                    value={formatINR(pendingPayout)}
                    icon={Clock}
                    gradient="warm"
                    index={2}
                />
            </div>

            {/* Transaction History */}
            <div>
                <h2 className="text-lg font-bold mb-4">Transaction History</h2>
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="glass-card-static p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0
                                        ? 'bg-[rgba(16,185,129,0.1)]'
                                        : 'bg-[rgba(239,68,68,0.1)]'
                                    }`}>
                                    {tx.amount > 0
                                        ? <ArrowDownRight size={20} className="text-[var(--vp-green)]" />
                                        : <ArrowUpRight size={20} className="text-[#F87171]" />
                                    }
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{tx.description}</p>
                                    <p className="text-xs text-[var(--vp-text-muted)]">
                                        {new Date(tx.date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <span className={`font-bold text-sm ${tx.amount > 0 ? 'text-[var(--vp-green)]' : 'text-[#F87171]'
                                }`}>
                                {tx.amount > 0 ? '+' : ''}{formatINR(Math.abs(tx.amount))}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
