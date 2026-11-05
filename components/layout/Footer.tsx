import CurrentYear from '@/components/layout/CurrentYear';

export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
                © <CurrentYear /> Student Management System. All rights reserved.
            </div>
        </footer>
    );
}