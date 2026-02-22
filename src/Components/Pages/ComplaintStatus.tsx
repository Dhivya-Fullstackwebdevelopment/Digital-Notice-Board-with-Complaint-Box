import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiClock, FiActivity, FiCheckCircle, FiHash, FiShield } from "react-icons/fi";
import Navbar from "../Navbar";

interface Complaint {
    id: string;
    subject: string;
    category: string;
    date: string;
    status: string;
    update: string;
}

const STATUS_STAGES = [
    { label: "Pending", icon: FiClock, color: "text-amber-500", bg: "bg-amber-500" },
    { label: "In Progress", icon: FiActivity, color: "text-blue-500", bg: "bg-blue-500" },
    { label: "Resolved", icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-500" }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function ComplaintStatus() {
    const [searchId, setSearchId] = useState("");
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!searchId) return;
        setLoading(true);
        setComplaint(null);

        setTimeout(() => {
            setComplaint({
                id: searchId,
                subject: "Electrical failure in Lab 3",
                category: "Electrical Issue",
                date: "Feb 20, 2026",
                status: "In Progress",
                update: "Technician assigned and parts ordered."
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* THEME LAYER */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto pt-28 px-6 pb-20">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 shadow-sm mb-6"
                    >
                        <FiShield size={12} className="fill-blue-50" />
                        Live Tracking System
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Track <span className="text-blue-600">Complaint Status</span>
                    </h1>

                    <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                        Enter your unique ID to see where your report is in our resolution pipeline.
                    </p>
                </div>

                {/* Search Bar themed like the Form inputs */}
                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onSubmit={handleSearch}
                    className="max-w-xl mx-auto mb-16 relative"
                >
                    <div className="relative group">
                        <FiHash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-20" />
                        <input
                            type="text"
                            placeholder="Enter Complaint ID (e.g. #CMP-102)"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full pl-14 pr-40 py-5 bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 font-bold placeholder:text-slate-400"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 px-8 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-50"
                        >
                            {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}> <FiActivity /> </motion.div> : <><FiSearch /> Track</>}
                        </button>
                    </div>
                </motion.form>

                <AnimatePresence>
                    {complaint && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {/* Main Card themed with the "rounded-[3rem]" and "bg-white/70" from the Box */}
                            <motion.div
                                variants={itemVariants}
                                className="backdrop-blur-xl bg-white/70 border border-white shadow-2xl rounded-[3rem] p-8 md:p-12 relative overflow-hidden"
                            >
                                <div className="flex justify-between items-center mb-16 relative px-4">
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: complaint.status === "Pending" ? "0%" : complaint.status === "In Progress" ? "50%" : "100%" }}
                                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                    />

                                    {STATUS_STAGES.map((stage, idx) => {
                                        const isCompleted = STATUS_STAGES.findIndex(s => s.label === complaint.status) >= idx;
                                        return (
                                            <div key={idx} className="relative z-10 flex flex-col items-center gap-4">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: idx * 0.2 + 0.8 }}
                                                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-700 ${isCompleted ? `${stage.bg} text-white shadow-2xl shadow-blue-200` : 'bg-white text-slate-300 border border-slate-100'}`}
                                                >
                                                    <stage.icon size={24} />
                                                </motion.div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {stage.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Details Grid */}
                                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 pt-10 border-t border-slate-200/50">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-widest text-blue-500">Subject</label>
                                        <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{complaint.subject}</p>
                                    </div>
                                    <div className="md:text-right space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Admin Comment</label>
                                        <p className="text-slate-600 font-medium italic">"{complaint.update}"</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                                            {complaint.category}
                                        </div>
                                        <div className="text-xs font-bold text-slate-400">
                                            ID: {complaint.id}
                                        </div>
                                    </div>
                                    <div className="md:text-right text-xs font-bold text-slate-400 self-center">
                                        Filed on {complaint.date}
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.p variants={itemVariants} className="text-center text-slate-500 text-sm font-medium">
                                If you believe this status is incorrect, please visit the HOD office or resubmit your complaint.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}