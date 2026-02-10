'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function VettingCheck({ status }: { status: string }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // If status is 'none' (not started), force redirect to onboarding
        // unless already there or in settings
        if (status === 'none' && !pathname.includes('/dashboard/onboarding') && !pathname.includes('/dashboard/settings')) {
            router.push('/dashboard/onboarding');
        }
    }, [status, pathname, router]);

    if (status === 'pending' && !pathname.includes('/dashboard/onboarding')) {
        return (
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-center text-sm text-yellow-200">
                Your profile is currently under review. Some features may be restricted.
            </div>
        );
    }

    if (status === 'rejected' && !pathname.includes('/dashboard/onboarding')) {
        return (
            <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 text-center text-sm text-red-200">
                Your profile was not approved. Please update your details in Settings or contact support.
            </div>
        );
    }

    return null;
}
