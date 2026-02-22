import { GiGraduateCap } from "react-icons/gi";
import { FiGlobe, FiUsers } from "react-icons/fi";

export default function Footer() {
    return (
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
                    <SocialIcon Icon={FiGlobe} />
                    <SocialIcon Icon={FiUsers} />
                </div>

                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
                    © 2026 CampusConnect. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

// Small helper component for social icons
function SocialIcon({ Icon }: { Icon: React.ComponentType<{ size: number }> }) {
    return (
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:text-blue-600 border border-slate-200 shadow-sm transition-all cursor-pointer">
            <Icon size={18} />
        </div>
    );
}