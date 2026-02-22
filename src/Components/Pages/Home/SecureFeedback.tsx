import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShield, FiSend } from "react-icons/fi";

export default function SecureFeedback() {
    const features = [
        "Completely anonymous reporting",
        "Encrypted data transmission",
        "Real-time status tracking",
        "Direct HOD/Staff intervention"
    ];

    return (
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
                        The Digital Complaint Box allows you to report issues ranging from ragging and harassment to facility problems without revealing your identity.
                    </p>
                    <ul className="space-y-4">
                        {features.map((item, i) => (
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

                {/* Animated Illustration */}
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
    );
}