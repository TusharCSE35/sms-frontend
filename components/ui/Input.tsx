import { forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
    ({ label, error, id, ...props }, ref) => {
        const inputId = id ?? props.name;
        return (
            <div>
                <label
                    htmlFor={inputId}
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
                <input
                    ref={ref}
                    id={inputId}
                    {...props}
                    aria-invalid={error ? true : undefined}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 ${error
                            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10'
                        }`}
                />
                {error && (
                    <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
