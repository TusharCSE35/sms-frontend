'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { studentService } from '@/services/studentService';
import type { Student } from '@/types/student';
import StudentForm from '@/components/students/StudentForm';
import type { StudentInput } from '@/lib/validations';

export default function EditStudentPage() {
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

    const handleUpdate = async (data: StudentInput) => {
        await studentService.update(id, data);
        router.push('/students');
    };

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

            <section className="relative mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6 shadow-sm sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-violet-200/40 blur-3xl" />

                <div className="relative">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-violet-600 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        Update record
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Edit Student
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Update {student.name}&apos;s information.
                    </p>
                </div>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
                <StudentForm
                    defaultValues={{
                        name: student.name,
                        email: student.email,
                        phone: student.phone ?? '',
                        roll: student.roll,
                        department: student.department,
                    }}
                    onSubmit={handleUpdate}
                    submitLabel="Update Student"
                />
            </div>
        </div>
    );
}
