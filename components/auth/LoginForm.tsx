'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginForm() {
    const { login } = useAuth();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data: LoginInput) => {
        setServerError('');
        try {
            await login(data);
        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 422) {
                const fieldErrors = err.response.data.errors as Record<string, string[]>;
                Object.entries(fieldErrors).forEach(([field, msgs]) =>
                    setError(field as keyof LoginInput, { message: msgs[0] })
                );
            } else if (isAxiosError(err)) {
                setServerError(err.response?.data?.message ?? 'Login failed');
            } else {
                setServerError('Something went wrong');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {serverError && (
                <div
                    role="alert"
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm text-rose-700"
                >
                    {serverError}
                </div>
            )}

            <Input label="Email" type="email" placeholder="you@example.com"
                {...register('email')} error={errors.email?.message} />

            <Input label="Password" type="password" placeholder="••••••••"
                {...register('password')} error={errors.password?.message} />

            <Button type="submit" loading={isSubmitting}>Sign In</Button>

            <p className="pt-1 text-center text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500">
                    Sign Up
                </Link>
            </p>
        </form>
    );
}
