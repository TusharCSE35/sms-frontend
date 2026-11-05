'use client';

import { useState } from 'react';
import { studentService } from '@/services/studentService';

type Props = {
    id: number;
    name: string;
    onDeleted: () => void;
    variant?: 'text' | 'button';
};

export default function DeleteButton({ id, name, onDeleted, variant = 'text' }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
        setLoading(true);
        try {
            await studentService.remove(id);
            onDeleted();
        } catch {
            alert('Failed to delete student');
            setLoading(false);
        }
    };

    const styles =
        variant === 'button'
            ? 'inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60'
            : 'inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 transition-colors hover:text-rose-500 disabled:cursor-not-allowed disabled:opacity-60';

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className={styles}
        >
            {loading && (
                <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                    />
                </svg>
            )}
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    );
}
