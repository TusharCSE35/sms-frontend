'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { studentService } from '@/services/studentService';
import type { Student } from '@/types/student';

const CHART_COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#06b6d4',
    '#6366f1',
    '#84cc16',
];

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

type StatCardProps = {
    label: string;
    value: number;
    hint: string;
    accent: string;
    icon: React.ReactNode;
};

function StatCard({ label, value, hint, accent, icon }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                </p>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
                    {icon}
                </span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
            <p className="mt-0.5 text-xs text-slate-500">{hint}</p>
        </div>
    );
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const data = await studentService.getAll();
                if (!cancelled) {
                    setStudents(data);
                    setError('');
                }
            } catch {
                if (!cancelled) setError('Failed to load dashboard data');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const departmentData = useMemo(() => {
        const counts = new Map<string, number>();
        for (const student of students) {
            counts.set(student.department, (counts.get(student.department) ?? 0) + 1);
        }
        return Array.from(counts, ([name, count]) => ({ name, count })).sort(
            (a, b) => b.count - a.count
        );
    }, [students]);

    const monthlyCount = useMemo(() => {
        const now = new Date();
        return students.filter((student) => {
            const created = new Date(student.created_at);
            return (
                created.getMonth() === now.getMonth() &&
                created.getFullYear() === now.getFullYear()
            );
        }).length;
    }, [students]);

    const activity = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const days = 7;

        return Array.from({ length: days }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() - (days - 1 - index));

            const count = students.filter((student) => {
                const created = new Date(student.created_at);
                created.setHours(0, 0, 0, 0);
                return created.getTime() === date.getTime();
            }).length;

            return {
                label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                fullLabel: date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                }),
                count,
            };
        });
    }, [students]);

    const recentStudents = useMemo(
        () =>
            [...students]
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                )
                .slice(0, 5),
        [students]
    );

    if (loading) {
        return (
            <div
                role="status"
                className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
            >
                <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
                <p className="text-sm text-slate-500">Loading your dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700 shadow-sm"
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
                <div>
                    <p className="font-semibold">Unable to load dashboard</p>
                    <p className="mt-0.5 text-rose-600">{error}</p>
                </div>
            </div>
        );
    }

    const totalStudents = students.length;
    const weeklyCount = activity.reduce((sum, day) => sum + day.count, 0);
    const maxActivity = Math.max(1, ...activity.map((day) => day.count));
    const firstName = user?.name?.trim().split(' ')[0];

    const circumference = 2 * Math.PI * 42;
    const segments = departmentData.map((department, index) => {
        const dash = totalStudents
            ? (department.count / totalStudents) * circumference
            : 0;
        const offset = departmentData
            .slice(0, index)
            .reduce(
                (sum, item) =>
                    sum +
                    (totalStudents
                        ? (item.count / totalStudents) * circumference
                        : 0),
                0
            );
        return {
            ...department,
            color: CHART_COLORS[index % CHART_COLORS.length],
            dash,
            offset,
        };
    });

    return (
        <div className="space-y-6">
            <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

                <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Dashboard
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back{firstName ? `, ${firstName}` : ''}
                        </h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Here&apos;s a quick overview of your student records.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/students"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                        >
                            View Students
                        </Link>
                        <Link
                            href="/students/create"
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30"
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
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Add Student
                        </Link>
                    </div>
                </div>
            </section>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total students"
                    value={totalStudents}
                    hint="All student records"
                    accent="bg-blue-50 text-blue-600"
                    icon={
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    }
                />
                <StatCard
                    label="Departments"
                    value={departmentData.length}
                    hint="Represented in records"
                    accent="bg-violet-50 text-violet-600"
                    icon={
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
                            <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                            <path d="m3 12 9 5 9-5" />
                            <path d="m3 17 9 5 9-5" />
                        </svg>
                    }
                />
                <StatCard
                    label="Added this month"
                    value={monthlyCount}
                    hint="New records this month"
                    accent="bg-emerald-50 text-emerald-600"
                    icon={
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
                            <path d="M8 2v4M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                            <path d="M12 14v4M10 16h4" />
                        </svg>
                    }
                />
                <StatCard
                    label="Added this week"
                    value={weeklyCount}
                    hint="New records in 7 days"
                    accent="bg-amber-50 text-amber-600"
                    icon={
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
                            <path d="M3 3v18h18" />
                            <path d="m7 15 4-4 3 3 5-6" />
                        </svg>
                    }
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">
                                Student creation activity
                            </h2>
                            <p className="mt-0.5 text-sm text-slate-500">
                                New records added over the last 7 days.
                            </p>
                        </div>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                            {weeklyCount} this week
                        </span>
                    </div>

                    <div className="flex h-52 items-end gap-2 sm:gap-4">
                        {activity.map((day) => (
                            <div
                                key={day.fullLabel}
                                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                            >
                                <div className="flex w-full flex-1 items-end">
                                    <div
                                        className={`w-full rounded-t-lg transition-all ${
                                            day.count > 0
                                                ? 'bg-gradient-to-t from-blue-600 to-indigo-400 hover:from-blue-500 hover:to-indigo-300'
                                                : 'bg-slate-100'
                                        }`}
                                        style={{
                                            height: `${Math.max(
                                                (day.count / maxActivity) * 100,
                                                day.count > 0 ? 12 : 4
                                            )}%`,
                                        }}
                                        title={`${day.count} student${
                                            day.count === 1 ? '' : 's'
                                        } on ${day.fullLabel}`}
                                    />
                                </div>
                                <span className="text-[11px] font-medium text-slate-500">
                                    {day.label}
                                </span>
                                <span className="text-xs font-semibold text-slate-900">
                                    {day.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-slate-900">
                            Department distribution
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Share of students by department.
                        </p>
                    </div>

                    {departmentData.length === 0 ? (
                        <div className="flex h-56 flex-col items-center justify-center text-center text-sm text-slate-500">
                            No department data yet.
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-5">
                            <div className="relative h-40 w-40">
                                <svg
                                    viewBox="0 0 120 120"
                                    className="h-full w-full -rotate-90"
                                    role="img"
                                    aria-label="Department distribution chart"
                                >
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="42"
                                        fill="none"
                                        stroke="#f1f5f9"
                                        strokeWidth="14"
                                    />
                                    {segments.map((segment) => (
                                        <circle
                                            key={segment.name}
                                            cx="60"
                                            cy="60"
                                            r="42"
                                            fill="none"
                                            stroke={segment.color}
                                            strokeWidth="14"
                                            strokeDasharray={`${segment.dash} ${circumference}`}
                                            strokeDashoffset={-segment.offset}
                                        />
                                    ))}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-slate-900">
                                        {totalStudents}
                                    </span>
                                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                        Students
                                    </span>
                                </div>
                            </div>

                            <ul className="max-h-56 w-full space-y-2.5 overflow-y-auto pr-1">
                                {departmentData.map((department, index) => (
                                    <li
                                        key={department.name}
                                        className="flex items-center justify-between gap-3 text-sm"
                                    >
                                        <span className="flex min-w-0 items-center gap-2 text-slate-600">
                                            <span
                                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        CHART_COLORS[
                                                            index % CHART_COLORS.length
                                                        ],
                                                }}
                                            />
                                            <span className="truncate">
                                                {department.name}
                                            </span>
                                        </span>
                                        <span className="shrink-0 font-semibold text-slate-900">
                                            {totalStudents
                                                ? Math.round(
                                                      (department.count / totalStudents) *
                                                          100
                                                  )
                                                : 0}
                                            %
                                            <span className="ml-1 text-xs font-normal text-slate-500">
                                                ({department.count})
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">
                            Recently added students
                        </h2>
                        <p className="mt-0.5 text-sm text-slate-500">
                            Your latest student records.
                        </p>
                    </div>
                    <Link
                        href="/students"
                        className="text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
                    >
                        View all
                    </Link>
                </div>

                {recentStudents.length === 0 ? (
                    <div className="px-6 py-12 text-center text-sm text-slate-500">
                        No students yet.{' '}
                        <Link
                            href="/students/create"
                            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
                        >
                            Add your first student
                        </Link>
                        .
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-100">
                        {recentStudents.map((student) => (
                            <li
                                key={student.id}
                                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-slate-50/70"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white shadow-sm">
                                        {initials(student.name)}
                                    </span>
                                    <div className="min-w-0">
                                        <Link
                                            href={`/students/${student.id}`}
                                            className="block truncate font-medium text-slate-900 transition-colors hover:text-indigo-600"
                                        >
                                            {student.name}
                                        </Link>
                                        <p className="truncate text-xs text-slate-500">
                                            {student.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                                        {student.department}
                                    </span>
                                    <span className="hidden text-xs text-slate-500 sm:inline">
                                        {new Date(student.created_at).toLocaleDateString()}
                                    </span>
                                    <Link
                                        href={`/students/${student.id}`}
                                        className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                                    >
                                        View
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
