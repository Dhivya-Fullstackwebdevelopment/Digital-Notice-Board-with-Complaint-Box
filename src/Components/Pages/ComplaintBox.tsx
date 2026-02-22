import { useState } from "react";
import { FiSend, FiLock, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";

// Move long lists to constants to keep the component clean
const CATEGORIES = [
    { id: "1", label: "Internal Marks Issue" },
    { id: "2", label: "Attendance Shortage Dispute" },
    { id: "3", label: "Exam Timetable Conflict" },
    { id: "4", label: "Result Correction Request" },
    { id: "5", label: "Faculty Behavior Complaint" },
    { id: "6", label: "Project Evaluation Issue" },
    { id: "7", label: "Ragging Complaint" },
    { id: "8", label: "Verbal Harassment" },
    { id: "9", label: "Physical Harassment" },
    { id: "10", label: "Cyber Bullying" },
    { id: "11", label: "Sexual Harassment" },
    { id: "12", label: "Gender Discrimination" },
    { id: "13", label: "Classroom Maintenance" },
    { id: "14", label: "Washroom Cleanliness" },
    { id: "15", label: "Drinking Water Problem" },
    { id: "16", label: "Electrical Issue" },
    { id: "17", label: "Hostel Room Allocation" },
    { id: "18", label: "Hostel Food Quality" },
    { id: "19", label: "Hostel WiFi Problem" },
    { id: "20", label: "Library Resources" },
    { id: "22", label: "Bus/Transport Issue" },
    { id: "24", label: "Certificate Delay" },
    { id: "25", label: "Scholarship Issue" },
    { id: "27", label: "Portal/IT Login Issue" },
    { id: "30", label: "Campus Security Concern" },
    { id: "99", label: "Other" },
];

const DEPARTMENTS = [
    "Computer Science & Engineering", "Information Technology",
    "Electronics & Communication", "Electrical & Electronics",
    "Mechanical Engineering", "Civil Engineering",
    "Artificial Intelligence", "MBA", "BBA", "B.Com", "Other"
];

export default function ComplaintBox() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [category, setCategory] = useState("");
    const [department, setDepartment] = useState("");
    const [catSearch, setCatSearch] = useState("");
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [deptSearch, setDeptSearch] = useState("");
    const [isDeptOpen, setIsDeptOpen] = useState(false);
    const filteredCats = CATEGORIES.filter(c => c.label.toLowerCase().includes(catSearch.toLowerCase()));
    const filteredDepts = DEPARTMENTS.filter(d => d.toLowerCase().includes(deptSearch.toLowerCase()));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* THEME LAYER: Subtle Grid & Radial Glows */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 max-w-3xl mx-auto pt-28 px-6 pb-20">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-red-100 shadow-sm mb-6"
                    >
                        <FiLock size={12} className="fill-red-50" />
                        Anonymous & Secure
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Secure <span className="text-blue-600">Complaint Box</span>
                    </h1>

                    <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                        Your identity is protected by default. Reporting issues helps us build a safer campus for everyone.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="backdrop-blur-xl bg-white/70 border border-white shadow-2xl rounded-[3rem] p-8 md:p-12"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Identity Status</label>
                                    <div className="relative group">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Leave blank to remain 100% anonymous"
                                            className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-900 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Select Grid */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Issue Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Category</option>
                                            {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                                        </select>

                                        <AnimatePresence>
                                            {category === "99" && (
                                                <motion.input
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    type="text"
                                                    placeholder="Please specify category"
                                                    className="w-full mt-2 px-4 py-3 border text-black  placeholder-gray-500 border-blue-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                                                    required
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Department Selection */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Department</label>
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Dept</option>
                                            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                        </select>

                                        {/* NEW: Conditional Department Input */}
                                        <AnimatePresence>
                                            {department === "Other" && (
                                                <motion.input
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    type="text"
                                                    placeholder="Please specify department"
                                                    className="w-full mt-2 px-4 py-3 border text-black placeholder-gray-500 border-blue-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                                                    required
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="E.g. Electrical failure in Block B"
                                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 shadow-sm"
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Provide as much detail as possible. Location, time, and specific incident details help us resolve it faster."
                                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-900 shadow-sm resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Submit Report
                                    <FiSend />
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 px-8 bg-white border border-slate-100 rounded-[3rem] shadow-2xl"
                        >
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="text-3xl font-bold">✓</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Report Received</h2>
                            <p className="text-slate-500 text-lg leading-relaxed max-w-sm mx-auto">
                                Thank you for your feedback. Your report has been encrypted and sent to the administration.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-10 text-blue-600 font-bold hover:underline"
                            >
                                File another report
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}