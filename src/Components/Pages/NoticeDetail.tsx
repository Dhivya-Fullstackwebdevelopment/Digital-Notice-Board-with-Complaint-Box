import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiShare2, FiClock, FiBookmark, FiDownload, FiFileText, FiImage, FiChevronDown, FiAlertCircle } from "react-icons/fi";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "../Navbar";
import clgimg from "../../assests/clg.jpeg";

const DEPARTMENTS = [
    "Computer Science & Engineering", "Information Technology",
    "Electronics & Communication", "Electrical & Electronics",
    "Mechanical Engineering", "Civil Engineering",
    "Artificial Intelligence", "MBA", "BBA", "B.Com"
];

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDept, setSelectedDept] = useState("");
    const [isDownloading, setIsDownloading] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const adminNotices = JSON.parse(localStorage.getItem("campus_notices") || "[]");
    const allNotices = [...adminNotices,
    {
        id: "1",
        title: "End Semester Examination Schedule Released - Spring 2026",
        category: "Academic",
        date: "Oct 24, 2025",
        content: `Scheduling a content exam involves identifying the specific topics, creating a structured, realistic study timeline, and utilizing tools to track progress. Key strategies include breaking down the syllabus into manageable chunks, using active recall to reinforce memory, and scheduling regular breaks to avoid burnout.`,
        description: `The upcoming Spring 2026 End Semester Examinations are a critical milestone for all undergraduate and postgraduate students. This comprehensive schedule has been designed to provide ample preparation time between core technical papers. We encourage all students to utilize the peer-mentorship programs available at the Student Success Centre.`,
        additionalDetails: [
            "Mandatory Documentation: Students must carry their valid Hall Tickets and Institutional ID cards.",
            "Punctuality: Candidates report to halls at least 30 minutes prior.",
            "Prohibited Items: Smartwatches and mobile phones are strictly prohibited.",
            "Stationery: Only transparent pouches and water bottles are allowed inside."
        ],
        department: "Examination Cell",
        urgent: true,
        image: clgimg,
        pdfUrl: "#"
    },
    {
        id: "2",
        title: "Annual Cultural Fest 'Utopia 2025' - Grand Celebration",
        category: "Event",
        date: "Oct 22, 2025",
        content: `Utopia 2025 is our flagship annual cultural extravaganza, bringing together creativity, talent, and diversity under one roof. This year's theme, 'Elysian Dreams,' promises an immersive journey through art, music, and dance, featuring over 50 competitive events and a star-studded pro-show.`,
        description: `We are thrilled to announce that registration for Utopia 2025 is officially open. This festival serves as a platform for students to showcase their extracurricular prowess beyond the classroom. From high-octane battle of bands and classical dance recitals to literary debates and digital art exhibitions, there is a stage for every passion. 

The event will span three days, starting with a grand inaugural ceremony in the main auditorium. We have invited industry leaders and renowned artists to judge the premier categories. Beyond the competitions, the campus will transform into a vibrant hub with food stalls, flea markets, and interactive gaming zones. We expect a footfall of over 5,000 students from across the region, making this our biggest celebration yet.`,
        additionalDetails: [
            "Registration: All participants must register via the student portal by Nov 5th.",
            "Identity Verification: Entry is strictly restricted to valid student ID card holders.",
            "Volunteer Opportunities: Students interested in organizing can sign up at the Dean's office.",
            "External Participants: Guest entries must be pre-approved via the official Utopia website.",
            "Security Protocol: Please adhere to the campus code of conduct during all evening shows."
        ],
        department: "Student Council",
        urgent: false,
        // image: clgimg,
        pdfUrl: "#"
    }
    ];

    const notice = allNotices.find((n) => n.id === id);

    const handleDownload = () => {
        if (!selectedDept) return;
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            alert(`Generating PDF for ${selectedDept}`);
        }, 2000);
    };

    if (!notice) return <div className="pt-40 text-center font-bold">Notice not found</div>;

    return (
        <div className="min-h-screen bg-white relative overflow-hidden font-sans pb-10">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[110]" style={{ scaleX }} />
            <Navbar />

            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-[1200px] mx-auto pt-24 px-6">

                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all mb-8 font-bold text-xs"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Notice Board
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-8 mb-8 border-b border-slate-100 pb-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"> <FiCalendar size={18} /> </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                            <p className="text-xs font-black text-slate-800">{notice.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"> <FiBookmark size={18} /> </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Issuing Body</p>
                            <p className="text-xs font-black text-slate-800">{notice.department}</p>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl font-bold text-[10px] transition-all border border-slate-100">
                            <FiShare2 /> Share Notice
                        </button>
                    </div>
                </motion.div>

                <div className="w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-200">
                                {notice.category}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                            {notice.title}
                        </h1>

                        {notice.image && (
                            <div className="mb-10 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl">
                                <img src={notice.image} alt="Visual" className="w-full h-auto object-cover max-h-[500px]" />
                                <div className="bg-slate-50 px-8 py-3 flex items-center gap-3 text-slate-500 text-[9px] font-bold uppercase tracking-widest border-t border-slate-100">
                                    <FiImage size={14} /> Official Visual Attachment
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-50/50 w-full rounded-[2rem] p-8 md:p-10 border border-slate-100 mb-8">
                            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold italic">
                                "{notice.content}"
                            </p>
                        </div>

                        <div className="prose w-full prose-slate max-w-none mb-12 px-2">
                            <p className="text-slate-600 text-sm md:text-base leading-7">
                                {notice.description}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-slate-900 w-full font-black uppercase text-xs tracking-[0.2em] mb-8 border-l-4 border-blue-600 pl-4">
                                Important Notice Guidelines
                            </h3>
                            <div className="grid gap-3">
                                {notice.additionalDetails?.map((detail: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-[10px] shadow-lg shadow-blue-100">
                                            {idx + 1}
                                        </span>
                                        <p className="text-slate-600 font-medium text-sm leading-relaxed">
                                            {detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 rounded-[3rem] border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-white shadow-sm mb-10">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                                    <FiFileText size={28} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-1">Documents & Attachments</h4>
                                    <p className="text-slate-500 font-medium text-[11px]">Download your department-specific details below.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 relative">
                                    <select
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                        className="w-full pl-5 pr-10 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none font-bold text-slate-700 text-xs shadow-sm"
                                    >
                                        <option value="">Choose Your Department...</option>
                                        {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                                    </select>
                                    <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>

                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading || !selectedDept}
                                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${isDownloading
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 disabled:opacity-50"
                                        }`}
                                >
                                    {isDownloading ? "Generating..." : <><FiDownload /> Download PDF</>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}