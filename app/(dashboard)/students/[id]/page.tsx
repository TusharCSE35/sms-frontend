'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { studentService } from '@/services/studentService';
import type { Student } from '@/types/student';
import DeleteButton from '@/components/students/DeleteButton';

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function StudentDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        studentService
            .getOne(id)
            .then(setStudent)
            .catch(() => setStudent(null))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div
                role="status"
                className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
            >
                <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
                <p className="text-sm text-slate-500">Loading student...</p>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 text-rose-500 ring-1 ring-rose-100">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4M12 16h.01" />
                    </svg>
                </div>
                <p className="text-lg font-semibold text-slate-900">Student not found</p>
                <p className="mt-1 text-sm text-slate-500">
                    The record may have been removed or the link is invalid.
                </p>
                <Link
                    href="/students"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30"
                >
                    Back to students
                </Link>
            </div>
        );
    }

    const rows = [
        ['Roll', student.roll],
        ['Department', student.department],
        ['Email', student.email],
        ['Phone', student.phone || '-'],
        ['Added on', new Date(student.created_at).toLocaleDateString()],
    ];

    return (
        <div className="mx-auto max-w-3xl">
            <Link
                href="/students"
                className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
                Back to students
            </Link>

            <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
                            {initials(student.name)}
                        </span>
                        <div>
                            <span className="mb-1 inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                                {student.department}
                            </span>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                {student.name}
                            </h1>
                            <p className="text-sm text-slate-500">Roll {student.roll}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={`/students/${student.id}/edit`}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        >
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
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                            Edit
                        </Link>
                        <DeleteButton
                            id={student.id}
                            name={student.name}
                            onDeleted={() => router.push('/students')}
                            variant="button"
                        />
                    </div>
                </div>
            </section>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
                <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Student details
                </h2>
                <dl className="grid gap-4 sm:grid-cols-2">
                    {rows.map(([label, value]) => (
                        <div
                            key={label}
                            className={`rounded-xl border border-slate-100 bg-slate-50/70 p-4 ${
                                label === 'Email' ? 'sm:col-span-2' : ''
                            }`}
                        >
                            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                {label}
                            </dt>
                            <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
