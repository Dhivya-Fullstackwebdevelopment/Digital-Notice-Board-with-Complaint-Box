import { motion } from "framer-motion";
import { FiBell, FiCalendar, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NoticeCard({ notice }: { notice: any }) {
  const categoryColors = {
    Academic: "bg-blue-50 text-blue-600 border-blue-100",
    Event: "bg-purple-50 text-purple-600 border-purple-100",
    Holiday: "bg-green-50 text-green-600 border-green-100",
    Emergency: "bg-red-50 text-red-600 border-red-100 animate-pulse",

    Placement: "bg-indigo-50 text-indigo-600 border-indigo-100",
    Examination: "bg-orange-50 text-orange-600 border-orange-100",
    Scholarship: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Sports: "bg-yellow-50 text-yellow-600 border-yellow-100",
    Hostel: "bg-pink-50 text-pink-600 border-pink-100",
    Library: "bg-cyan-50 text-cyan-600 border-cyan-100",
    Competition: "bg-violet-50 text-violet-600 border-violet-100",
    Other: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const styleKey = Object.keys(categoryColors).includes(notice.category)
    ? (notice.category as keyof typeof categoryColors)
    : "Other";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/Notice/${notice.id}`} className="block h-full">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${categoryColors[styleKey]}`}>
              {notice.category}
            </span>
            <div className="flex justify-between items-center space-x-4 text-slate-400 text-[10px] font-bold">
              <span className="flex items-center gap-1"><FiCalendar size={10} /> {notice.date}</span>
              <span className="flex items-center gap-1 text-blue-600 font-black"><FiClock size={10} /> {notice.time}</span>
            </div>
          </div>

          {/* Title: Reduced from text-2xl to text-lg */}
          <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {notice.title}
          </h3>

          {/* Content: Added flex-1 to push the button down */}
          <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3 flex-1">
            {notice.content}
          </p>

          {/* Footer Button: Always at the bottom */}
          <div className="mt-auto">
            <button className="flex items-center gap-2 text-[11px] font-black text-blue-600 hover:gap-3 transition-all uppercase tracking-wider">
              Read More
              <FiBell size={14} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}