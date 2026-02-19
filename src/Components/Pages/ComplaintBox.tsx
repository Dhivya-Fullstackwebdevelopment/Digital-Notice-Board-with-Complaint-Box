import { FiSend, FiLock } from 'react-icons/fi';
import Navbar from '../Navbar';
import { motion } from 'framer-motion';

export default function ComplaintBox() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-4xl mx-auto pt-32 px-6 pb-24">
                <div className="text-center mb-12">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 text-[11px] font-black uppercase tracking-widest rounded-full border border-red-100 mb-6"
                    >
                        <FiLock size={14}/> Anonymous & Secure
                    </motion.span>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Secure Complaint Box</h1>
                    <p className="text-slate-500 text-lg italic max-w-2xl mx-auto">
                        Report ragging, harassment, or facility issues without fear. Your identity remains protected.
                    </p>
                </div>

                <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-white">
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">File a New Report</h2>
                        <p className="text-slate-400">Provide as much detail as possible to help us address the issue effectively.</p>
                    </div>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Full Name</label>
                                <input type="text" placeholder="Leave blank to remain anonymous" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Your Department</label>
                                <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none appearance-none">
                                    <option>Select department</option>
                                    <option>Computer Applications</option>
                                    <option>Engineering</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Issue Category</label>
                            <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none">
                                <option>Select category</option>
                                <option>Ragging / Harassment</option>
                                <option>Facility Issues</option>
                                <option>Academic Grievances</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black text-slate-700 uppercase tracking-wider">Detailed Description</label>
                            <textarea rows={5} placeholder="Describe the incident, location, and people involved..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"></textarea>
                        </div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                        >
                            Submit Report <FiSend size={20} />
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
}