import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pt-24 pb-24">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-200/60 via-indigo-200/60 to-violet-200/60 blur-3xl" />
                <div className="absolute -left-24 top-40 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
                <div className="absolute -right-24 top-24 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
            </div>

            <div className="mx-auto max-w-4xl text-center">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 shadow-sm backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Built for modern institutions
                </span>

                <h1 className="mb-5 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                    Student Management System
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
                    Add, update and manage your students in one simple place.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/register"
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/login"
                        className="w-full rounded-lg border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </section>
    );
}
