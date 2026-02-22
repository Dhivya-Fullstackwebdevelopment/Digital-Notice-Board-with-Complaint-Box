import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiShare2, FiClock, FiBookmark, FiDownload, FiFileText, FiImage } from "react-icons/fi";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../Navbar";
import clgimg from "../../assests/clg.jpeg";

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const adminNotices = JSON.parse(localStorage.getItem("campus_notices") || "[]");
    const allNotices = [...adminNotices,
    {
        id: "1",
        title: "End Semester Examination Schedule",
        category: "Academic",
        date: "Oct 24, 2025",
        content: "Detailed exam schedule for all departments...",
        department: "Examination Cell",
        urgent: true,
        image: `${clgimg}`,
        pdfUrl: "#" 
    },
    { id: "2", title: "Annual Cultural Fest", category: "Event", date: "Oct 22, 2025", content: "Join us for Utopia 2025...", department: "Student Council", urgent: false }
    ];

    const notice = allNotices.find((n) => n.id === id);

    if (!notice) return <div className="pt-40 text-center font-bold">Notice not found</div>;

    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-20">
            <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[110]" style={{ scaleX }} />
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 max-w-5xl mx-auto pt-32 px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-grow lg:w-2/3">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all mb-8 font-bold text-sm"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Board
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="prose prose-slate max-w-none"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                    {notice.category}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                                {notice.title}
                            </h1>
                            {notice.image && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-10 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl"
                                >
                                    <img src={notice.image} alt="Notice Visual" className="w-full h-auto object-cover max-h-[400px]" />
                                    <div className="bg-slate-50 px-6 py-3 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <FiImage /> Visual Attachment
                                    </div>
                                </motion.div>
                            )}

                            <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 mb-10">
                                <p className="text-slate-600 text-xl leading-relaxed whitespace-pre-wrap font-medium">
                                    {notice.content}
                                </p>
                            </div>

                            {notice.pdfUrl && (
                                <div className="mb-10 p-6 rounded-3xl border-2 border-dashed border-slate-200 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                                            <FiFileText size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Official_Notice_Document.pdf</p>
                                            <p className="text-xs text-slate-400 font-bold">PDF Document • 1.2 MB</p>
                                        </div>
                                    </div>
                                    <a
                                        href={notice.pdfUrl}
                                        download
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                    >
                                        <FiDownload /> Download PDF
                                    </a>
                                </div>
                            )}

                            <p className="text-slate-500 leading-8 text-lg">
                                Additional Details: This notice is issued for the current academic session.
                                Students are advised to contact the
                                <span className="text-blue-600 font-bold"> {notice.department || 'Administrative Office'}</span>
                                for further queries.
                            </p>
                        </motion.div>
                    </div>

                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 lg:sticky lg:top-32 h-fit"
                    >
                        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-blue-900/5">
                            <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs mb-6 pb-4 border-b border-slate-50">
                                Notice Details
                            </h4>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <FiCalendar />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Posted On</p>
                                        <p className="text-sm font-black text-slate-800">{notice.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                        <FiClock />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Est. Read Time</p>
                                        <p className="text-sm font-black text-slate-800">2 Minutes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                        <FiBookmark />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Issuing Body</p>
                                        <p className="text-sm font-black text-slate-800">{notice.department || "Admin"}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                                <FiShare2 /> Share Notice
                            </button>
                        </div>
                    </motion.aside>

                </div>
            </div>
        </div>
    );
}