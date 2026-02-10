import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';
    const role = searchParams.get('role') ?? 'creator';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Check if profile exists, update role if it does
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('id, role')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    // Update role to what user selected at login, UNLESS user is already an admin
                    // Admins should never be downgraded by logging in via the normal flow
                    if (profile.role !== 'admin') {
                        await supabase
                            .from('profiles')
                            .update({ role })
                            .eq('id', user.id);
                    }
                }

                // Check if creator profile exists
                const { data: creator } = await supabase
                    .from('creators')
                    .select('id')
                    .eq('user_id', user.id)
                    .single();

                // Auto-create creator profile if none exists
                if (!creator) {
                    await supabase.from('creators').insert({
                        user_id: user.id,
                        name: user.user_metadata?.full_name || user.user_metadata?.name || 'Creator',
                        phone: user.phone || '',
                        email: user.email,
                        avatar_url: user.user_metadata?.avatar_url || null,
                    });
                }
            }

            const forwardedHost = request.headers.get('x-forwarded-host');
            const isLocalEnv = process.env.NODE_ENV === 'development';

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`);
            } else {
                return NextResponse.redirect(`${origin}${next}`);
            }
        }
    }

    // OAuth error — redirect to login with error
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
