'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Phone, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function LoginContent() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';
    const authError = searchParams.get('error');

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
            },
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return;
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\s/g, '')}`;

        const { error } = await supabase.auth.signInWithOtp({
            phone: formattedPhone,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        setStep('otp');
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return;
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const formattedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\s/g, '')}`;

        const { error } = await supabase.auth.verifyOtp({
            phone: formattedPhone,
            token: otp,
            type: 'sms',
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        // Redirect to dashboard on success
        window.location.href = redirect;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
            {/* Decorative elements */}
            <div className="particle particle-purple" style={{ top: '15%', left: '15%', animation: 'float 6s ease-in-out infinite' }} />
            <div className="particle particle-green" style={{ top: '70%', right: '10%', animation: 'float 8s ease-in-out infinite 2s' }} />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 no-underline mb-4">
                        <Image
                            src="/logo.png"
                            alt="ViewsPeCash"
                            width={44}
                            height={44}
                            className="rounded-xl"
                        />
                        <span className="text-2xl font-bold gradient-text">ViewsPeCash</span>
                    </Link>
                    <p className="text-[var(--vp-text-secondary)] text-sm mt-2">
                        Sign in to start earning from your content
                    </p>
                </div>

                {/* Error Alert */}
                {(error || authError) && (
                    <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-2 text-sm text-red-400">
                        <AlertCircle size={16} />
                        {error || 'Authentication failed. Please try again.'}
                    </div>
                )}

                {/* Auth Card */}
                <div className="glass-card-static p-8">
                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--glass-border)] hover:border-[var(--vp-border-hover)] transition-all text-sm font-medium mb-6 disabled:opacity-50"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[var(--glass-border)]" />
                        <span className="text-xs text-[var(--vp-text-muted)]">or use phone</span>
                        <div className="flex-1 h-px bg-[var(--glass-border)]" />
                    </div>

                    {/* Phone Auth */}
                    {step === 'phone' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="input-field pl-11"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-[var(--vp-text-muted)]">
                                    Requires SMS provider setup in Supabase dashboard
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || !phone}
                                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send OTP
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                    Enter OTP
                                </label>
                                <p className="text-xs text-[var(--vp-text-muted)]">
                                    Sent to {phone}
                                </p>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="123456"
                                    className="input-field text-center text-lg tracking-[0.5em]"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || otp.length < 6}
                                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Verify & Login
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => { setStep('phone'); setError(null); }}
                                className="btn-ghost w-full text-sm"
                            >
                                Change number
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[var(--vp-text-muted)] mt-6">
                    By signing in, you agree to our{' '}
                    <Link href="#" className="text-[var(--vp-purple-light)] hover:underline">Terms</Link> and{' '}
                    <Link href="#" className="text-[var(--vp-purple-light)] hover:underline">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center hero-gradient">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
