'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterForm() {
    const { register: signup } = useAuth();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

    const onSubmit = async (data: RegisterInput) => {
        setServerError('');
        try {
            await signup(data);
        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 422) {
                const fieldErrors = err.response.data.errors as Record<string, string[]>;
                Object.entries(fieldErrors).forEach(([field, msgs]) =>
                    setError(field as keyof RegisterInput, { message: msgs[0] })
                );
            } else if (isAxiosError(err)) {
                setServerError(err.response?.data?.message ?? 'Registration failed');
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

            <Input label="Full Name" placeholder="Your name"
                {...register('name')} error={errors.name?.message} />

            <Input label="Email" type="email" placeholder="you@example.com"
                {...register('email')} error={errors.email?.message} />

            <Input label="Password" type="password" placeholder="At least 8 characters"
                {...register('password')} error={errors.password?.message} />

            <Input label="Confirm Password" type="password" placeholder="Repeat password"
                {...register('password_confirmation')} error={errors.password_confirmation?.message} />

            <Button type="submit" loading={isSubmitting}>Create Account</Button>

            <p className="pt-1 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500">
                    Sign In
                </Link>
            </p>
        </form>
    );
}
