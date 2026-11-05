const steps = [
    {
        no: '1',
        title: 'Create an account',
        desc: 'Sign up with your name, email and password in under a minute.',
    },
    {
        no: '2',
        title: 'Add your students',
        desc: 'Enter name, roll, department and contact details for each student.',
    },
    {
        no: '3',
        title: 'Manage everything',
        desc: 'View, edit or remove student records anytime from your dashboard.',
    },
];

export default function HowItWorks() {
    return (
        <section className="border-y border-slate-200/70 bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-6xl px-6 py-20">
                <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-slate-900">
                    How it works
                </h2>
                <p className="mb-14 text-center text-slate-600">
                    Get started in three simple steps.
                </p>

                <div className="grid gap-10 md:grid-cols-3">
                    {steps.map((s) => (
                        <div key={s.no} className="text-center">
                            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-500/20">
                                {s.no}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-900">
                                {s.title}
                            </h3>
                            <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-600">
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
