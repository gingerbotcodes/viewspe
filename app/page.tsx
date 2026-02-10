import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import {
  Zap,
  TrendingUp,
  Shield,
  Eye,
  Users,
  Wallet,
  ArrowRight,
  Play,
  Star,
  ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Play,
      title: 'Pick a Gig',
      description: 'Browse campaigns from top brands. Download the video asset and script.',
      gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    },
    {
      icon: TrendingUp,
      title: 'Post & Earn',
      description: 'Post the reel on Instagram or YouTube Shorts. Submit your link.',
      gradient: 'linear-gradient(135deg, #10B981, #059669)',
    },
    {
      icon: Eye,
      title: 'Views = Cash',
      description: 'We track your views daily. Earn ₹10–₹100 per 1,000 views automatically.',
      gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    },
    {
      icon: Wallet,
      title: 'Instant Payout',
      description: 'Withdraw earnings to your UPI or bank. No minimum threshold.',
      gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Creators' },
    { value: '₹25L+', label: 'Paid Out' },
    { value: '500+', label: 'Campaigns' },
    { value: '50M+', label: 'Views Tracked' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="hero-gradient relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Floating particles */}
        <div className="particle particle-purple" style={{ top: '20%', left: '10%', animation: 'float 6s ease-in-out infinite' }} />
        <div className="particle particle-green" style={{ top: '60%', left: '80%', animation: 'float 8s ease-in-out infinite 2s' }} />
        <div className="particle particle-purple" style={{ top: '40%', left: '70%', animation: 'float 7s ease-in-out infinite 1s' }} />
        <div className="particle particle-green" style={{ top: '80%', left: '20%', animation: 'float 9s ease-in-out infinite 3s' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in-up"
            style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <Zap size={14} className="text-[var(--vp-purple-light)]" />
            <span className="text-sm text-[var(--vp-purple-light)] font-medium">India&apos;s #1 Creator Earnings Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up delay-1">
            Post Reels.{' '}
            <span className="gradient-text">Get Paid.</span>
            <br />
            <span className="gradient-text-accent">Per View.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[var(--vp-text-secondary)] max-w-2xl mx-auto mb-10 animate-fade-in-up delay-2 leading-relaxed">
            Turn your Instagram Reels & YouTube Shorts into a daily income stream.
            Pick brand campaigns, post content, and earn for every view.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-3">
            <Link href="/dashboard" className="btn-primary text-base px-8 py-4 no-underline">
              Start Earning
              <ArrowRight size={18} />
            </Link>
            <Link href="/advertiser" className="btn-secondary text-base px-8 py-4 no-underline">
              I&apos;m an Advertiser
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto animate-fade-in-up delay-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-[var(--vp-text-muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-[var(--vp-purple-light)] tracking-wider uppercase">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Four steps to <span className="gradient-text">start earning</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className={`glass-card p-6 animate-fade-in-up delay-${i + 1}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: feature.gradient }}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <div className="text-xs font-bold text-[var(--vp-text-muted)] mb-2">
                  STEP {i + 1}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--vp-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="py-20 px-4" style={{ background: 'rgba(139, 92, 246, 0.03)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Trusted by <span className="gradient-text-accent">creators</span> across India
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Priya Sharma', handle: '@priyacreates', earnings: '₹45,000', quote: 'Made more in 2 weeks than my part-time job. The best platform for micro-influencers!' },
              { name: 'Arjun Kumar', handle: '@arjun_shorts', earnings: '₹1,20,000', quote: 'Finally a platform that actually pays. Already got 5 campaigns running simultaneously.' },
              { name: 'Sneha Patel', handle: '@sneha.vibes', earnings: '₹32,000', quote: 'Super easy to use. Just post reels and watch the money come in. Love the instant UPI payouts!' },
            ].map((testimonial, i) => (
              <div key={testimonial.name} className={`glass-card p-6 text-left animate-fade-in-up delay-${i + 1}`}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="var(--vp-purple-light)" className="text-[var(--vp-purple-light)]" />
                  ))}
                </div>
                <p className="text-sm text-[var(--vp-text-secondary)] mb-4 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-[var(--vp-text-muted)]">{testimonial.handle}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--vp-green)]">{testimonial.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center glass-card-static p-12 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15), transparent 70%)' }} />
          <div className="relative z-10">
            <Users size={40} className="mx-auto mb-4 text-[var(--vp-purple-light)]" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to <span className="gradient-text">earn</span>?
            </h2>
            <p className="text-[var(--vp-text-secondary)] mb-8 max-w-lg mx-auto">
              Join thousands of Indian creators already earning from their reels and shorts. No minimum followers required.
            </p>
            <Link href="/auth/login" className="btn-primary text-base px-10 py-4 no-underline">
              Create Free Account
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[var(--glass-border)] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--gradient-primary)' }}>
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold gradient-text">ViewsPeCash</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--vp-text-muted)]">
            <Link href="#" className="hover:text-white transition no-underline">Privacy</Link>
            <Link href="#" className="hover:text-white transition no-underline">Terms</Link>
            <Link href="#" className="hover:text-white transition no-underline">Support</Link>
          </div>
          <p className="text-xs text-[var(--vp-text-muted)]">
            © 2026 ViewsPeCash. Made in India 🇮🇳
          </p>
        </div>
      </footer>
    </div>
  );
}
