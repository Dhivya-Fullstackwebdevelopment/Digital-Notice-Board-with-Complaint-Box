import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiCalendar, FiTrash2, FiFileText, FiExternalLink, FiInfo } from "react-icons/fi";
import apiClient from "@/api/apiUrl";
import { NotifyError, NotifySuccess } from "@/Toast/ToastNotification";

interface Notice {
  _id: string;
  noticeId: string;
  title: string;
  categoryName: string;
  deptName: string;
  content: string;
  image: string;
  pdf: string;
  createdAt: string;
}

const Notifications = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/api/notices/usernotifications/list");
      if (response.data.Status === 1) {
        setNotices(response.data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      NotifyError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await apiClient.post("/api/notices/usernotifications/clear-all");
      if (response.status === 200) {
        setNotices([]);
        NotifySuccess("All notifications cleared");
      }
    } catch (error) {
      NotifyError("Failed to clear notifications");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6 pb-20 font-sans">
      <Navbar />

      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Notice Updates
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Stay updated with the latest campus announcements
            </p>
          </div>

          {notices.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95"
            >
              <FiTrash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {/* List Content */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="text-center py-20 text-slate-400 font-bold animate-pulse">
                Fetching latest updates...
              </div>
            ) : notices.length > 0 ? (
              notices.map((n) => (
                <motion.div
                  key={n._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group"
                >
                  {/* Category & Date */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 text-[10px] font-black uppercase bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                      {n.categoryName}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
                      <FiCalendar size={13} />
                      {formatDate(n.createdAt)}
                    </div>
                  </div>

                  {/* Title & Dept */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">
                    Department: {n.deptName}
                  </p>

                  {/* Message Body */}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 whitespace-pre-line">
                    {n.content}
                  </p>

                 
                  {/* Attachment: PDF & Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-50 flex flex-wrap gap-3 items-center justify-between">
                    

                    <span className="text-[10px] font-black text-slate-600 uppercase">
                      Ref: {n.noticeId}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[3rem]"
              >
                <FiBell size={40} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-slate-900 font-bold">No new notices</h3>
                <p className="text-slate-400 text-sm">You're all caught up!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Notifications;