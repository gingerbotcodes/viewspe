import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex pt-16">
                <Sidebar role="creator" />
                <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
