import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiClock, FiActivity, FiCheckCircle, FiHash } from "react-icons/fi";
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
    { label: "Pending", icon: FiClock, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "In Progress", icon: FiActivity, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Resolved", icon: FiCheckCircle, color: "text-green-500", bg: "bg-green-50" }
];

export default function ComplaintStatus() {
    const [searchId, setSearchId] = useState("");
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(false);

    // Mock search function (Replace with your actual backend API call)
    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulating API Delay
        setTimeout(() => {
            setComplaint({
                id: searchId,
                subject: "Electrical failure in Lab 3",
                category: "Electrical Issue",
                date: "Feb 20, 2026",
                status: "In Progress", // Try changing this to 'Pending' or 'Resolved'
                update: "Technician assigned and parts ordered."
            });
            setLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* Theme Layers (Consistent with your ComplaintBox) */}
            <div className="absolute inset-0 z-0 opacity-[0.2]" 
                 style={{ backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 max-w-4xl mx-auto pt-32 px-6 pb-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Track Your <span className="text-blue-600">Complaint</span></h1>
                    <p className="text-slate-500 max-w-lg mx-auto">Enter your unique complaint ID to see the real-time resolution progress.</p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16">
                    <div className="relative group">
                        <FiHash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Enter Complaint ID (e.g. #CMP-102)"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full pl-14 pr-32 py-5 bg-white border border-slate-200 rounded-3xl shadow-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 font-medium"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-2">
                            {loading ? "..." : <><FiSearch /> Track</>}
                        </button>
                    </div>
                </form>

                <AnimatePresence>
                    {complaint && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Status Stepper */}
                            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[3rem] border border-white shadow-2xl">
                                <div className="flex justify-between items-center mb-12 relative">
                                    {/* Progress Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: complaint.status === "Pending" ? "0%" : complaint.status === "In Progress" ? "50%" : "100%" }}
                                        className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-1000"
                                    />

                                    {STATUS_STAGES.map((stage, idx) => {
                                        const isCompleted = STATUS_STAGES.findIndex(s => s.label === complaint.status) >= idx;
                                        return (
                                            <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-300 border border-slate-100'}`}>
                                                    <stage.icon size={24} />
                                                </div>
                                                <span className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? 'text-blue-600' : 'text-slate-400'}`}>{stage.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Complaint Details Grid */}
                                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Subject</label>
                                        <p className="text-xl font-bold text-slate-800">{complaint.subject}</p>
                                    </div>
                                    <div className="text-right">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Latest Update</label>
                                        <p className="text-slate-600 italic">"{complaint.update}"</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
                                        <p className="font-semibold text-slate-700">{complaint.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Date Filed</label>
                                        <p className="font-semibold text-slate-700">{complaint.date}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}