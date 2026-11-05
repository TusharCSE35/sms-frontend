import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                Get started
            </span>
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
                Create your account
            </h1>
            <p className="mb-6 text-sm text-slate-500">
                Start managing your students today.
            </p>
            <RegisterForm />
        </>
    );
}
