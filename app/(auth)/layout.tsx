import Link from 'next/link';
import CurrentYear from '@/components/layout/CurrentYear';

function CheckIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-emerald-300"
            aria-hidden="true"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex min-h-[calc(100vh-130px)] items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4 py-12">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
                <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
                <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />
            </div>

            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[1.05fr_1fr]">
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
                        <div className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-violet-300/20 blur-2xl" />
                    </div>

                    <Link
                        href="/"
                        className="relative flex items-center gap-3 text-lg font-bold"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                                <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                                <path d="M22 10v6" />
                            </svg>
                        </span>
                        Student Management System
                    </Link>

                    <div className="relative">
                        <h2 className="mb-4 max-w-sm text-3xl font-bold leading-tight">
                            Everything your students need, in one place.
                        </h2>
                        <p className="mb-8 max-w-sm text-sm leading-relaxed text-blue-100">
                            Add, update and manage every student record with a simple, secure
                            dashboard built for modern institutions.
                        </p>
                        <ul className="space-y-3 text-sm text-blue-50">
                            <li className="flex items-center gap-3">
                                <CheckIcon /> Organize student records in seconds
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> Update details anytime, anywhere
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon /> Private, secure access for every user
                            </li>
                        </ul>
                    </div>

                    <p className="relative text-xs text-blue-100/80">
                        © <CurrentYear /> Student Management System
                    </p>
                </div>

                <div className="p-8 sm:p-10">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 lg:hidden"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
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
                        Student Management System
                    </Link>
                    {children}
                </div>
            </div>
        </main>
    );
}
