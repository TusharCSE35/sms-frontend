'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { studentSchema, type StudentInput } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type Props = {
    defaultValues?: StudentInput;
    onSubmit: (data: StudentInput) => Promise<void>;
    submitLabel: string;
};

export default function StudentForm({ defaultValues, onSubmit, submitLabel }: Props) {
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<StudentInput>({
        resolver: zodResolver(studentSchema),
        defaultValues: defaultValues ?? {
            name: '',
            email: '',
            phone: '',
            roll: '',
            department: '',
        },
    });

    const submit = async (data: StudentInput) => {
        setServerError('');
        try {
            await onSubmit(data);
            reset();
        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 422) {
                const fieldErrors = err.response.data.errors as Record<string, string[]>;
                Object.entries(fieldErrors).forEach(([field, msgs]) =>
                    setError(field as keyof StudentInput, { message: msgs[0] })
                );
            } else if (isAxiosError(err)) {
                setServerError(err.response?.data?.message ?? 'Request failed');
            } else {
                setServerError('Something went wrong');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {serverError && (
                <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                    </svg>
                    {serverError}
                </div>
            )}

            <div>
                <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    <h2 className="text-sm font-semibold text-slate-900">Personal information</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Full Name" placeholder="Rahim Uddin"
                        {...register('name')} error={errors.name?.message} />
                    <Input label="Email" type="email" placeholder="rahim@example.com"
                        {...register('email')} error={errors.email?.message} />
                    <Input label="Phone (optional)" placeholder="017XXXXXXXX"
                        {...register('phone')} error={errors.phone?.message} />
                </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
                <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                            <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                            <path d="M22 10v6" />
                        </svg>
                    </span>
                    <h2 className="text-sm font-semibold text-slate-900">Academic details</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Roll" placeholder="101"
                        {...register('roll')} error={errors.roll?.message} />
                    <Input label="Department" placeholder="CSE"
                        {...register('department')} error={errors.department?.message} />
                </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                <div className="w-full sm:w-40">
                    <Button type="submit" loading={isSubmitting}>{submitLabel}</Button>
                </div>
                <Link
                    href="/students"
                    className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
