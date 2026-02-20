import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import NoticeCard from "./NoticeCard";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const ALL_NOTICES = [
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
    { id: "1", title: "End Semester Examination Schedule", category: "Academic", date: "Oct 24, 2025", content: "Schedule is out now. Please check the department portal for details." },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Registrations open for Utopia 2025. Sign up now!" },
];

export default function Notices() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [displayNotices, setDisplayNotices] = useState(ALL_NOTICES);

    const categories = ["All", "Academic", "Event", "Emergency"];

    useEffect(() => {
        const adminNotices = JSON.parse(localStorage.getItem("campus_notices") || "[]");
        setDisplayNotices([...adminNotices, ...ALL_NOTICES]);
    }, []);

    const filteredNotices = displayNotices.filter(notice => {
        const matchesTab = activeTab === "All" || notice.category.toLowerCase() === activeTab.toLowerCase();
        const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-100 pb-20 selection:bg-blue-100">
            <Navbar />

            <div className="max-w-7xl mx-auto pt-32 px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-6">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                        Digital Notice Board
                    </h1>

                    <div className="relative w-full md:w-80 group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-11 pr-6 py-3 bg-white border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm font-medium text-black placeholder-slate-400 shadow-inner"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Custom Tabs with Shadow Line */}
                <div className="relative mb-8">
                    <div className="flex flex-wrap gap-3 pb-3 relative z-10">
                        {categories.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {/* Shadow Line: A subtle border with an outer shadow for depth */}
                    <div className="absolute bottom-[11px] left-0 right-0 h-[1px] bg-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.08)]" />                </div>

                {/* Notices Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {filteredNotices.map((notice, index) => (
                        <motion.div
                            key={notice.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex"
                        >
                            <div className="w-full">
                                <NoticeCard notice={notice} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}