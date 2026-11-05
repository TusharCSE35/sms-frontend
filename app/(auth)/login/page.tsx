import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                Sign in
            </span>
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
            </h1>
            <p className="mb-6 text-sm text-slate-500">
                Sign in to manage your students.
            </p>
            <LoginForm />
        </>
    );
}
