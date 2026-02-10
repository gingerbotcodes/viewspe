import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import VettingCheck from '@/components/auth/VettingCheck';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let vettingStatus = 'none';
    if (user) {
        const { data: creator } = await supabase
            .from('creators')
            .select('vetting_status')
            .eq('user_id', user.id)
            .single();

        if (creator) {
            vettingStatus = creator.vetting_status || 'none';
        }
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <VettingCheck status={vettingStatus} />
            <div className="flex pt-16">
                <Sidebar role="creator" />
                <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
