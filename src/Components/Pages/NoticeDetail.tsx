import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiShare2, FiBookmark, FiDownload, FiFileText, FiImage, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../Navbar";
import apiClient from "@/api/apiUrl"; // Ensure this points to your axios instance
import { FcDepartment } from "react-icons/fc";

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isHoveringImage, setIsHoveringImage] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const fetchNoticeDetails = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/notices/${id}`);
                if (response.data.Status === 1) {
                    setNotice(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching notice details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticeDetails();
    }, [id]);

    const handleDownload = () => {
        setIsDownloading(true);

        setTimeout(() => {
            setIsDownloading(false);

            if (notice?.pdf) {
                window.open(notice.pdf, "_blank");
            }
        }, 1000);
    };

    if (loading) return <div className="pt-40 text-center font-bold animate-pulse">Loading Notice Details...</div>;
    if (!notice) return <div className="pt-40 text-center font-bold">Notice not found</div>;

    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-10">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[110]" style={{ scaleX }} />
            <Navbar />

            <div className="relative z-10 max-w-[1200px] mx-auto pt-24 px-6">
                <motion.button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all mb-8 font-bold text-xs"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Notice Board
                </motion.button>

                {/* Metadata Header */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-8 mb-8 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"> <FiCalendar size={18} /> </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                            <p className="text-xs font-black text-slate-800">{new Date(notice.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"> <FiBookmark size={18} /> </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                            <p className="text-xs font-black text-slate-800">{notice.categoryId === "99" ? notice.otherCategory : notice.categoryName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center shrink-0"> <FcDepartment size={18} /> </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Issuing Department</p>
                            <p className="text-xs font-black text-slate-800">{notice.deptId === "99" ? notice.otherDept : notice.deptName}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                    {notice.title}
                </h1>

                {notice.image && (
                    <div className="relative mb-10 group">
                        <motion.div
                            onMouseEnter={() => setIsHoveringImage(true)}
                            onMouseLeave={() => setIsHoveringImage(false)}
                            onClick={() => window.open(notice.image, "_blank")}
                            className="rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl cursor-zoom-in relative"
                        >
                            <img
                                src={notice.image}
                                alt="Notice"
                                className="w-full h-auto object-top object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Hover Overlay Hint */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold text-slate-900 shadow-lg">
                                    Hover to Expand / Click to Open
                                </span>
                            </div>

                            <div className="bg-slate-50 px-8 py-3 flex items-center gap-3 text-slate-500 text-[9px] font-bold uppercase tracking-widest border-t border-slate-100">
                                <FiImage size={14} /> Official Attachment
                            </div>
                        </motion.div>

                        {/* Full Image Preview on Hover */}
                        <AnimatePresence>
                            {isHoveringImage && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none"
                                >
                                    {/* Backdrop */}
                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

                                    {/* The Full Image */}
                                    <motion.img
                                        src={notice.image}
                                        className="relative z-10 max-w-full max-h-full rounded-2xl shadow-2xl object-contain border-4 border-white"
                                        layoutId="noticeImage"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className="bg-slate-50/50 w-full rounded-[2rem] p-8 md:p-10 border border-slate-100 mb-12">
                    <p className="text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                        {notice.content}
                    </p>
                </div>

                {notice.pdf && (
                    <div className="p-10 rounded-[3rem] border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-white shadow-sm mb-10">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <FiFileText size={28} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Official Documents</h4>
                                <p className="text-slate-500 font-medium text-[11px]">Download the attached PDF for full details.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl md:col-span-3 ${isDownloading
                                    ? "bg-green-500 text-white"
                                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                    }`}
                            >
                                {isDownloading ? "Opening..." : <><FiDownload /> Download Attachment</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}