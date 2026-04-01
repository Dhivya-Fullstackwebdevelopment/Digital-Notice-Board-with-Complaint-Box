import { useEffect, useState } from "react";
import apiClient from "@/api/apiUrl";
import { motion } from "framer-motion";

export default function Stats() {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await apiClient.get("/api/dashboard/stats");

            if (res.data.Status === 1) {
                const d = res.data.data;
                setStats([
                    { label: "Total Notices", value: d.totalNotices },
                    { label: "Total Students", value: d.totalStudents },
                    { label: "Complaints", value: d.complaints.total },
                    { label: "Resolved %", value: `${Math.round((d.complaints.resolved / d.complaints.total) * 100)}%` }
                ]);
            }
        } catch (err) {
            console.error("Stats error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <section className="py-24 relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />

            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' ... %3C/svg%3E")`
                }}
            />

            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-300/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/30 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    {loading
                        ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse backdrop-blur-xl bg-white/50 p-6 rounded-2xl border border-white/40">
                                    <div className="h-10 bg-slate-200 rounded w-20 mx-auto mb-3"></div>
                                    <div className="h-4 bg-slate-200 rounded w-32 mx-auto"></div>
                                </div>
                            ))
                        )
                        : stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.15, type: "spring" }}
                                className="relative group p-[1px] rounded-2xl bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-transparent hover:from-blue-400/60 hover:via-indigo-400/40 transition-all"
                            >
                                <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all overflow-hidden">

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full" />

                                    <motion.div
                                        className="text-4xl font-extrabold text-blue-600 mb-2 group-hover:scale-110 transition-transform"
                                        initial={{ scale: 0.6 }}
                                        animate={{ scale: 1 }}
                                    >
                                        {stat.value}
                                    </motion.div>

                                    <div className="text-slate-500 font-semibold uppercase tracking-wider text-xs">
                                        {stat.label}
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-500 rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}