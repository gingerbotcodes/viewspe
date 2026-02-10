import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Check if the user has a creator profile, create one if not
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
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
