export default function Stats() {
    const stats = [
        { label: "Daily Notices", value: "24+" },
        { label: "Secure Reports", value: "150+" },
        { label: "Issues Resolved", value: "98%" },
        { label: "Campus Users", value: "5,000+" }
    ];

    return (
        <section className="py-24 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                            <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}