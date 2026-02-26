import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import NoticeCard from "./NoticeCard";
import { FiSearch, FiBell } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ALL_NOTICES = [
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
];

export default function Notices() {
    const [activeTabId, setActiveTabId] = useState(""); 
    const [searchQuery, setSearchQuery] = useState("");
    const [displayNotices, setDisplayNotices] = useState(ALL_NOTICES);

    const categories = [
        { id: "", label: "All" }, 
        { id: "1", label: "Academic" },
        { id: "2", label: "Event" },
        { id: "3", label: "Emergency" },
        { id: "4", label: "Placement" },
        { id: "5", label: "Examination" },
        { id: "6", label: "Scholarship" },
        { id: "7", label: "Sports" },
        { id: "8", label: "Hostel" },
        { id: "9", label: "Library" },
        { id: "10", label: "Competition" }
    ];

    useEffect(() => {
        const adminNotices = JSON.parse(localStorage.getItem("campus_notices") || "[]");
        setDisplayNotices([...adminNotices, ...ALL_NOTICES]);
    }, []);

    const filteredNotices = displayNotices.filter(notice => {
        // Find the label of the current active ID to compare with notice.category string
        const activeCategory = categories.find(cat => cat.id === activeTabId);
        
        const matchesTab = activeTabId === "" || 
            (activeCategory && notice.category.toLowerCase() === activeCategory.label.toLowerCase());
            
        const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans pb-20">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />
            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 mb-3"
                        >
                            <FiBell /> Campus Updates
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Digital <span className="text-blue-600">Notice Board</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" size={18} />
                        <input
                            type="text"
                            placeholder="Search notices..."
                            className="w-full pl-12 pr-6 py-4 bg-white/70 backdrop-blur-md border border-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold text-slate-900 placeholder-slate-400 shadow-xl shadow-slate-200/50"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="relative mb-10">
                    <div className="flex overflow-x-auto flex-nowrap gap-4 pb-6 pt-2 px-2 relative z-10 scrollbar-light">
                        {categories.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTabId(tab.id)}
                                className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap border shrink-0 ${activeTabId === tab.id
                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-300/50 scale-105"
                                    : "bg-white text-slate-400 border-slate-100 hover:text-blue-600 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notices Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredNotices.map((notice, index) => (
                            <motion.div
                                key={notice.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex"
                            >
                                <div className="w-full hover:translate-y-[-5px] transition-transform duration-300">
                                    <NoticeCard notice={notice} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredNotices.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-medium">No notices found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}