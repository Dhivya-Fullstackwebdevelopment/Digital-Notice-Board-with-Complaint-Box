import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FiArrowRight,
    FiBell,
    FiShield,
    FiSend,
    FiZap,
    FiUsers,
    FiMessageSquare,
    FiGlobe
} from "react-icons/fi";
import { GiGraduateCap } from "react-icons/gi";
import Navbar from "../../Components/Navbar";
import networkVideo from "../../videos/herobg.mp4";

const MOCK_NOTICES = [
    {
        id: "1",
        title: "End Semester Examination Schedule Released",
        category: "Academic",
        date: "Oct 24, 2025",
        content: "The schedule for the upcoming end-semester examinations is now available on the official portal and campus display boards. Please check for any overlaps.",
    },
    {
        id: "2",
        title: "Annual Cultural Fest: 'Utopia' 2025 Registration Open",
        category: "Event",
        date: "Oct 22, 2025",
        content: "Registrations for the annual cultural festival 'Utopia' are now open. Interested students can sign up for various competitions and events.",
    },
    {
        id: "3",
        title: "Emergency Maintenance: Library Closed Today",
        category: "Emergency",
        date: "Oct 21, 2025",
        content: "The central library will be closed for emergency electrical maintenance today from 2:00 PM to 6:00 PM. We apologize for the inconvenience.",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
                {/* Video Layer */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src={networkVideo} type="video/mp4" />
                </video>

                {/* The Light Transparent Overlay - Adjusted for better contrast with video */}
                <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-sm" />

                {/* Content Container */}
                <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10 pt-24 sm:pt-20">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-50/90 text-blue-600 border border-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm"
                    >
                        <FiZap size={14} className="fill-blue-600" />
                        Digital Notice Board & Secure Feedback
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 px-2"
                    >
                        The Digital Heart of <br className="hidden sm:block" />
                        <span className="text-blue-600 italic">Campus Communication</span>
                    </motion.h1>

                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium px-4">
                        Replace physical notice boards with a smart digital dashboard. Empower students with a secure, anonymous way to report issues.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 px-6">
                        <Link to="/Notices" className="w-full sm:w-auto">
                            <button className="w-full px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                View Notice Board <FiArrowRight size={20} />
                            </button>
                        </Link>
                        <Link to="/ComplaintBox" className="w-full sm:w-auto">
                            <button className="w-full px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-900 border-2 border-white rounded-2xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2">
                                Submit a Complaint <FiMessageSquare size={18} />
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 pt-6">
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <FiShield className="text-green-600" /> 100% Anonymous
                        </div>
                        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <FiBell className="text-blue-600" /> Real-time Alerts
                        </div>
                    </div>
                </div>
            </section>
            {/* 2. NOTICES PREVIEW SECTION */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 text-center md:text-left">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3 justify-center md:justify-start">
                                <FiBell className="text-blue-600" /> Latest Announcements
                            </h2>
                            <p className="text-slate-500 text-lg italic">
                                Stay updated with the latest happenings, academic alerts, and campus events.
                            </p>
                        </div>
                        <Link to="/notices">
                            <button className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                                View All Notices <FiArrowRight size={16} />
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MOCK_NOTICES.map((notice, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase rounded-lg border border-blue-100">
                                        {notice.category}
                                    </span>
                                    <span className="text-xs text-slate-400 font-bold">{notice.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                    {notice.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    {notice.content}
                                </p>
                                <button className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:gap-3 transition-all">
                                    Read Full Notice <FiArrowRight size={14} className="text-blue-600" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SECURE FEEDBACK FEATURE */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100">
                            <FiShield className="w-4 h-4" />
                            <span>Secure Feedback System</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold">Your Voice Matters, <br />Your Privacy Guaranteed.</h2>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            The Digital Complaint Box allows you to report issues ranging from ragging and harassment to facility problems without revealing your identity. Every report is encrypted and handled directly by authorized staff.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Completely anonymous reporting",
                                "Encrypted data transmission",
                                "Real-time status tracking",
                                "Direct HOD/Staff intervention"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FiSend className="w-3 h-3 text-blue-600" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/ComplaintBox">
                            <button className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                                File a Complaint
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square"
                    >
                        <div className="absolute inset-0 bg-blue-400/10 rounded-3xl blur-3xl animate-pulse" />
                        <div className="relative z-10 w-full h-full bg-slate-50 border border-slate-200 rounded-3xl shadow-2xl p-8 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent" />
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-48 h-48 bg-white rounded-2xl shadow-xl border border-blue-100 flex items-center justify-center"
                            >
                                <FiShield className="w-20 h-20 text-blue-600" />
                            </motion.div>

                            <div className="absolute bottom-12 left-12 right-12 p-6 bg-white/80 backdrop-blur-md rounded-xl border border-blue-100">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <FiShield className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Secure Port</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Active Connection</div>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: [-100, 200] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="h-full w-1/3 bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. STATS SECTION */}
            <section className="py-24 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Daily Notices", value: "24+" },
                            { label: "Secure Reports", value: "150+" },
                            { label: "Issues Resolved", value: "98%" },
                            { label: "Campus Users", value: "5,000+" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                <div className="text-slate-500 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. FOOTER */}
            <footer className="bg-slate-50 py-16 border-t border-slate-200">
                <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
                    <div className="flex items-center justify-center gap-2 text-2xl font-black italic text-slate-800">
                        <GiGraduateCap className="text-blue-600" size={32} />
                        CampusConnect
                    </div>

                    <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                        The official digital communication platform for modern educational institutions.
                    </p>

                    <div className="flex justify-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Usage Terms</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-blue-600 border border-slate-200 shadow-sm transition-all cursor-pointer"><FiGlobe size={18} /></div>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-blue-600 border border-slate-200 shadow-sm transition-all cursor-pointer"><FiUsers size={18} /></div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
                        © 2026 CampusConnect. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}