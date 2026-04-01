import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiBell, FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import apiClient from "@/api/apiUrl";

interface Notice {
    _id: string;
    noticeId: string;
    title: string;
    categoryName: string;
    content: string;
    createdAt: string;
}

export default function NoticesPreview() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await apiClient.get("/api/notices/usernotifications/list");
                if (response.data.Status === 1) {
                    setNotices(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching notices:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const duplicatedNotices = notices.length > 0
        ? [...notices, ...notices, ...notices, ...notices]
        : [];

    const formatDate = (dateStr: string) => {
        const dateObj = new Date(dateStr);

        const date = dateObj.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        const time = dateObj.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return { date, time };
    };

    if (loading) {
        return (
            <div className="py-24 bg-white text-center animate-pulse">
                <div className="h-8 w-48 bg-slate-100 mx-auto rounded-full mb-4" />
                <div className="flex gap-6 justify-center overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-80 h-48 bg-slate-50 rounded-[2.5rem] shrink-0" />
                    ))}
                </div>
            </div>
        );
    }

    if (notices.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-white relative border-y border-slate-100 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-10 md:mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">Notices</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center gap-3 justify-center md:justify-start tracking-tight">
                            <FiBell className="text-blue-600 shrink-0" /> Latest Announcements
                        </h2>
                    </div>
                    <Link to="/notices" className="group text-slate-900 font-bold flex items-center gap-2 text-sm md:text-base border-b-2 border-transparent hover:border-blue-600 transition-all pb-1">
                        View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

           <div className="relative z-10">
                <div className="max-w-[1400px] mx-auto overflow-hidden px-4">
                    <motion.div
                        className="flex gap-6 cursor-grab active:cursor-grabbing py-10"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {duplicatedNotices.map((notice, idx) => {
                            // FIX: Destructure the object here
                            const { date, time } = formatDate(notice.createdAt);

                            return (
                                <motion.div
                                    key={`${notice._id}-${idx}`}
                                    whileHover={{ y: -10 }}
                                    onClick={() => navigate(`/Notice/${notice.noticeId}`)}
                                    className="relative bg-white/70 backdrop-blur-md p-7 md:p-9 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all group/card w-[320px] md:w-[420px] shrink-0 flex flex-col cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/20 via-blue-600 to-blue-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity" />

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {notice.noticeId}
                                            </span>
                                        </div>
                                        {/* FIX: Render date and time strings separately */}
                                        <div className="flex flex-row space-x-4 items-end text-[10px] font-bold text-slate-500">
                                            <span className="flex items-center gap-1"><FiCalendar size={10}/> {date}</span>
                                            <span className="flex items-center gap-1 text-blue-600 font-black"><FiClock size={10}/> {time}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase rounded-full shadow-lg shadow-blue-200">
                                            {notice.categoryName}
                                        </span>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 group-hover/card:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        {notice.title}
                                    </h3>

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                        {notice.content}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-black text-slate-900 group-hover/card:text-blue-600 transition-colors uppercase tracking-tighter">
                                            Read More <FiArrowRight className="group-hover/card:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}