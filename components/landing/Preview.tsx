const rows = [
    { roll: '101', name: 'Rahim Uddin', dept: 'CSE', email: 'rahim@example.com' },
    { roll: '102', name: 'Karim Hasan', dept: 'EEE', email: 'karim@example.com' },
    { roll: '103', name: 'Nusrat Jahan', dept: 'BBA', email: 'nusrat@example.com' },
];

export default function Preview() {
    return (
        <section className="mx-auto max-w-4xl px-6 py-20">
            <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-slate-900">
                Your students, one clean view
            </h2>
            <p className="mb-10 text-center text-slate-600">
                A simple dashboard to see and manage every student record.
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs font-medium text-slate-500">
                        Students overview
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                            <tr>
                                <th className="px-4 py-3.5 font-medium">Roll</th>
                                <th className="px-4 py-3.5 font-medium">Name</th>
                                <th className="px-4 py-3.5 font-medium">Department</th>
                                <th className="px-4 py-3.5 font-medium">Email</th>
                                <th className="px-4 py-3.5 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rows.map((r) => (
                                <tr
                                    key={r.roll}
                                    className="transition-colors hover:bg-slate-50/70"
                                >
                                    <td className="px-4 py-3.5 font-mono text-slate-500">
                                        {r.roll}
                                    </td>
                                    <td className="px-4 py-3.5 font-medium text-slate-900">
                                        {r.name}
                                    </td>
                                    <td className="px-4 py-3.5 text-slate-600">{r.dept}</td>
                                    <td className="px-4 py-3.5 text-slate-500">{r.email}</td>
                                    <td className="space-x-3 px-4 py-3.5 text-right">
                                        <span className="cursor-default font-medium text-blue-600">
                                            Edit
                                        </span>
                                        <span className="cursor-default font-medium text-rose-600">
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
