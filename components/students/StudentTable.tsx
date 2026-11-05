'use client';

import Link from 'next/link';
import type { Student } from '@/types/student';
import DeleteButton from '@/components/students/DeleteButton';

type Props = {
    students: Student[];
    onDeleted: () => void;
};

function initials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function StudentTable({ students, onDeleted }: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-slate-900">Student records</h2>
                    <p className="text-xs text-slate-500">
                        {students.length} {students.length === 1 ? 'student' : 'students'} shown
                    </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    Directory
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                            <th className="px-5 py-3.5 font-medium">Roll</th>
                            <th className="px-5 py-3.5 font-medium">Name</th>
                            <th className="px-5 py-3.5 font-medium">Department</th>
                            <th className="px-5 py-3.5 font-medium">Email</th>
                            <th className="px-5 py-3.5 font-medium">Phone</th>
                            <th className="px-5 py-3.5 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((s) => (
                            <tr key={s.id} className="transition-colors hover:bg-slate-50/70">
                                <td className="px-5 py-4">
                                    <span className="inline-flex rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-600">
                                        {s.roll}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white shadow-sm">
                                            {initials(s.name)}
                                        </span>
                                        <Link
                                            href={`/students/${s.id}`}
                                            className="font-medium text-slate-900 transition-colors hover:text-indigo-600"
                                        >
                                            {s.name}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                                        {s.department}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-slate-500">{s.email}</td>
                                <td className="px-5 py-4 text-slate-500">{s.phone || '-'}</td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-4">
                                        <Link
                                            href={`/students/${s.id}`}
                                            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/students/${s.id}/edit`}
                                            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteButton id={s.id} name={s.name} onDeleted={onDeleted} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
