import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap, FiMessageSquare, FiShield, FiBell } from "react-icons/fi";
import networkVideo from "../../../videos/herobg.mp4";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                <source src={networkVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-sm" />

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
            </div>
        </section>
    );
}