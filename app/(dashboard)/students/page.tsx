'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { studentService } from '@/services/studentService';
import type { Student } from '@/types/student';
import StudentTable from '@/components/students/StudentTable';

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const load = useCallback(async () => {
        try {
            setStudents(await studentService.getAll());
            setError('');
        } catch {
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    }, []);

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
                if (!cancelled) setError('Failed to load students');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return students;
        return students.filter((s) =>
            [s.name, s.roll, s.email, s.department].some((v) => v.toLowerCase().includes(q))
        );
    }, [students, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const pageStudents = filtered.slice(startIndex, startIndex + pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
        (pageNumber) =>
            pageNumber === 1 ||
            pageNumber === totalPages ||
            Math.abs(pageNumber - currentPage) <= 1
    );

    return (
        <div className="space-y-6">
            <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

                <div className="relative flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            Student records
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Students</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Manage every student record in one place.
                        </p>
                    </div>

                    <Link
                        href="/students/create"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
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
            </section>

            <div className="relative">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Search by name, roll, email or department..."
                    aria-label="Search students"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
            </div>

            {loading ? (
                <div
                    role="status"
                    className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"
                >
                    <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
                    <p className="text-sm text-slate-500">Loading students...</p>
                </div>
            ) : error ? (
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
                        <p className="font-semibold">Unable to load students</p>
                        <p className="mt-0.5 text-rose-600">{error}</p>
                    </div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-indigo-600 ring-1 ring-indigo-100">
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <p className="text-base font-semibold text-slate-900">
                        {students.length === 0 ? 'No students yet' : 'No match found'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        {students.length === 0
                            ? 'Add your first student to get started.'
                            : 'Try a different name, roll, email, or department.'}
                    </p>
                    {students.length === 0 && (
                        <Link
                            href="/students/create"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30"
                        >
                            Add Student
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <StudentTable students={pageStudents} onDeleted={load} />

                    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <label htmlFor="page-size">Rows per page</label>
                            <select
                                id="page-size"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                            >
                                {[5, 10, 20, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-slate-500">
                                Showing{' '}
                                <span className="font-semibold text-slate-900">
                                    {startIndex + 1}
                                </span>
                                {'–'}
                                <span className="font-semibold text-slate-900">
                                    {Math.min(startIndex + pageSize, filtered.length)}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold text-slate-900">
                                    {filtered.length}
                                </span>
                            </p>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
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
                                </button>

                                {pageNumbers.map((pageNumber, index) => {
                                    const previous = pageNumbers[index - 1];
                                    return (
                                        <span
                                            key={pageNumber}
                                            className="flex items-center gap-1"
                                        >
                                            {previous && pageNumber - previous > 1 && (
                                                <span className="px-1 text-sm text-slate-400">
                                                    …
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => setPage(pageNumber)}
                                                aria-current={
                                                    pageNumber === currentPage
                                                        ? 'page'
                                                        : undefined
                                                }
                                                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                                                    pageNumber === currentPage
                                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        </span>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage(Math.min(totalPages, currentPage + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
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
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
