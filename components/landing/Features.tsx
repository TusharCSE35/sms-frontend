const features = [
    {
        title: 'Add Students',
        desc: 'Create student records with name, roll, department and contact info.',
        accent: 'bg-blue-50 text-blue-600 ring-blue-100',
        glow: 'from-blue-500/10',
        icon: (
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6M22 11h-6" />
            </svg>
        ),
    },
    {
        title: 'Edit Anytime',
        desc: 'Update student information whenever something changes.',
        accent: 'bg-violet-50 text-violet-600 ring-violet-100',
        glow: 'from-violet-500/10',
        icon: (
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
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
        ),
    },
    {
        title: 'Secure & Private',
        desc: 'Every user sees only their own students after login.',
        accent: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
        glow: 'from-emerald-500/10',
        icon: (
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
    },
];

export default function Features() {
    return (
        <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="mb-12 text-center">
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                    Everything you need
                </h2>
                <p className="mx-auto max-w-xl text-slate-600">
                    Simple tools to keep every student record organized.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                    >
                        <div
                            className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${f.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
                        />
                        <div
                            className={`relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${f.accent}`}
                        >
                            {f.icon}
                        </div>
                        <h3 className="relative mb-2 text-lg font-semibold text-slate-900">
                            {f.title}
                        </h3>
                        <p className="relative text-sm leading-relaxed text-slate-600">
                            {f.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
