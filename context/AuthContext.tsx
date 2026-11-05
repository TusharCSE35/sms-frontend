'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import type { User } from '@/types/user';
import type { LoginInput, RegisterInput } from '@/lib/validations';

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (data: LoginInput) => Promise<void>;
    register: (data: RegisterInput) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                if (!cancelled) setLoading(false);
                return;
            }

            try {
                const currentUser = await authService.me();
                if (!cancelled) setUser(currentUser);
            } catch {
                localStorage.removeItem('token');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const saveSession = (token: string, user: User) => {
        localStorage.setItem('token', token);
        setUser(user);
    };

    const login = async (data: LoginInput) => {
        const res = await authService.login(data);
        saveSession(res.token, res.user);
        router.push('/dashboard');
    };

    const register = async (data: RegisterInput) => {
        const res = await authService.register(data);
        saveSession(res.token, res.user);
        router.push('/dashboard');
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}