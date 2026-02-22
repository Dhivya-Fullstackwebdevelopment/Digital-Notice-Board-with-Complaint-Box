import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiBell, FiArrowRight } from "react-icons/fi";

interface Notice {
    id: string | number;
    category: string;
    date: string;
    title: string;
    content: string;
}

export default function NoticesPreview({ notices }: { notices: Notice[] }) {
    return (
        <section className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3 justify-center md:justify-start">
                            <FiBell className="text-blue-600" /> Latest Announcements
                        </h2>
                        <p className="text-slate-500 text-lg italic">Stay updated with the latest happenings.</p>
                    </div>
                    <Link to="/notices" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                        View All Notices <FiArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {notices.map((notice, idx) => (
                        <motion.div
                            key={notice.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-7 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase rounded-lg border border-blue-100">{notice.category}</span>
                                <span className="text-xs text-slate-400 font-bold">{notice.date}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{notice.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">{notice.content}</p>
                            <button className="text-sm font-bold text-slate-900 flex items-center gap-1 group-hover:gap-3 transition-all">
                                Read Full Notice <FiArrowRight size={14} className="text-blue-600" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}