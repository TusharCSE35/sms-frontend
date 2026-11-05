'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { studentService } from '@/services/studentService';
import StudentForm from '@/components/students/StudentForm';
import type { StudentInput } from '@/lib/validations';

export default function CreateStudentPage() {
    const router = useRouter();

    const handleCreate = async (data: StudentInput) => {
        await studentService.create(data);
        router.push('/students');
    };

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
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="relative">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        New record
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Add Student
                    </h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Fill in the student&apos;s information to create a new record.
                    </p>
                </div>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
                <StudentForm onSubmit={handleCreate} submitLabel="Save Student" />
            </div>
        </div>
    );
}
