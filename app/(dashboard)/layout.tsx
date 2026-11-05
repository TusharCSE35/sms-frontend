'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-sm text-gray-500">
                Loading...
            </div>
        );
    }

    return <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>;
}