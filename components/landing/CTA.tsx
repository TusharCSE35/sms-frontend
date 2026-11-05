import Link from 'next/link';

export default function CTA() {
    return (
        <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-6 py-16 text-center shadow-2xl shadow-indigo-500/20">
                <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

                <div className="relative">
                    <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
                        Ready to get started?
                    </h2>
                    <p className="mb-8 text-blue-100">
                        Create a free account and start managing your students today.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 shadow-lg shadow-indigo-900/10 transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                    >
                        Create Free Account
                    </Link>
                </div>
            </div>
        </section>
    );
}
