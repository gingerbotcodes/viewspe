'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Save, Instagram, Youtube, Phone, Mail, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface CreatorProfile {
    name: string;
    phone: string;
    email: string;
    avatar_url: string | null;
    instagram_handle: string | null;
    youtube_handle: string | null;
}

export default function SettingsPage() {
    const [profile, setProfile] = useState<CreatorProfile>({
        name: '',
        phone: '',
        email: '',
        avatar_url: null,
        instagram_handle: null,
        youtube_handle: null,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: creator } = await supabase
            .from('creators')
            .select('name, phone, email, avatar_url, instagram_handle, youtube_handle')
            .eq('user_id', user.id)
            .single();

        if (creator) {
            setProfile(creator);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSaved(false);

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error: updateError } = await supabase
            .from('creators')
            .update({
                name: profile.name,
                phone: profile.phone,
                instagram_handle: profile.instagram_handle,
                youtube_handle: profile.youtube_handle,
            })
            .eq('user_id', user.id);

        // Also update the profiles table name
        await supabase
            .from('profiles')
            .update({ name: profile.name, phone: profile.phone })
            .eq('id', user.id);

        setSaving(false);

        if (updateError) {
            setError(updateError.message);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 size={24} className="animate-spin text-[var(--vp-purple-light)]" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
                <p className="text-sm text-[var(--vp-text-muted)]">
                    Manage your profile and preferences
                </p>
            </div>

            {/* Avatar Section */}
            <div className="glass-card-static p-6 mb-6">
                <div className="flex items-center gap-4">
                    {profile.avatar_url ? (
                        <Image
                            src={profile.avatar_url}
                            alt="Avatar"
                            width={64}
                            height={64}
                            className="rounded-full border-2 border-[var(--vp-purple)]"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--gradient-primary)' }}>
                            <User size={28} className="text-white" />
                        </div>
                    )}
                    <div>
                        <p className="font-semibold text-lg">{profile.name || 'Creator'}</p>
                        <p className="text-sm text-[var(--vp-text-muted)]">{profile.email}</p>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSave}>
                <div className="glass-card-static p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Display Name
                            </label>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="input-field pl-11"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="input-field pl-11"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        {/* Email (readonly) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    className="input-field pl-11 opacity-60 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <p className="text-xs text-[var(--vp-text-muted)]">
                                Email is linked to your Google account and cannot be changed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Handles */}
                <div className="glass-card-static p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Social Media</h2>
                    <div className="space-y-4">
                        {/* Instagram */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                Instagram Handle
                            </label>
                            <div className="relative">
                                <Instagram size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="text"
                                    value={profile.instagram_handle || ''}
                                    onChange={(e) => setProfile({ ...profile, instagram_handle: e.target.value || null })}
                                    className="input-field pl-11"
                                    placeholder="@yourhandle"
                                />
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--vp-text-secondary)]">
                                YouTube Channel
                            </label>
                            <div className="relative">
                                <Youtube size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vp-text-muted)]" />
                                <input
                                    type="text"
                                    value={profile.youtube_handle || ''}
                                    onChange={(e) => setProfile({ ...profile, youtube_handle: e.target.value || null })}
                                    className="input-field pl-11"
                                    placeholder="@yourchannel"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error / Success messages */}
                {error && (
                    <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                        {error}
                    </div>
                )}
                {saved && (
                    <div className="mb-4 p-3 rounded-xl border border-green-500/30 bg-green-500/10 text-sm text-green-400 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Settings saved successfully!
                    </div>
                )}

                {/* Save Button */}
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary w-full py-3 disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <>
                            <Save size={18} />
                            Save Changes
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
