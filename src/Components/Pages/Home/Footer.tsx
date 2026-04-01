import { useState } from "react"; // Added useState
import { GiGraduateCap } from "react-icons/gi";
import { FiGlobe, FiUsers, FiMail, FiPhone, FiX } from "react-icons/fi"; // Added FiX for close button

const LEGAL_CONTENT: Record<string, { title: string, body: string }> = {
    "Privacy Policy": {
        title: "Privacy Policy",
        body: "We value your privacy. CampusConnect collects minimal data required for campus communication. Your data is encrypted and never sold to third parties."
    },
    "Usage Terms": {
        title: "Usage Terms",
        body: "By using CampusConnect, you agree to maintain campus decorum. Harassment, spamming, or unauthorized access to administrative panels is strictly prohibited."
    },
    "Help Center": {
        title: "Help Center",
        body: "Need help? You can browse our documentation or reach out to your campus administrator for login issues and account permissions."
    },
    "Contact Support": {
        title: "Contact Support",
        body: "Our support team is available Mon-Fri, 9 AM - 6 PM. For urgent technical issues, please email tech-support@campusconnect.com."
    }
};

const FOOTER_LINKS = [
    { name: "Privacy Policy", href: "#" },
    { name: "Usage Terms", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Contact Support", href: "#" },
];

const CONTACT_INFO = [
    { icon: FiMail, text: "support@campusconnect.com", href: "mailto:support@campusconnect.com" },
    { icon: FiPhone, text: "+91 98765 43210", href: "tel:+919876543210" },
];

export default function Footer() {
    // 1. State to track which content to show
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <footer className="relative overflow-hidden font-sans border-t border-slate-100">
            {/* 🌈 Background Design Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L53.213 1.414 54.627 0zm-5.656 0l.83.828-1.415 1.415L47.556 1.414 48.97 0z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
                }}
            />

            {/* 💡 Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-300/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/20 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                
                {/* 🔝 Brand Section */}
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="flex items-center gap-2 text-3xl font-black italic text-slate-800">
                        <GiGraduateCap className="text-blue-600" size={34} />
                        <span>CampusConnect</span>
                    </div>

                    <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                        Empowering campuses with a modern digital communication platform — 
                        seamless notices, secure complaints, and real-time updates.
                    </p>
                </div>

                {/* 🔗 Navigation Links - Updated with onClick */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {FOOTER_LINKS.map((link) => (
                        <button 
                            key={link.name} 
                            onClick={() => setActiveModal(link.name)}
                            className="hover:text-blue-600 transition-all hover:scale-105 cursor-pointer"
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                {/* 📞 Contact Info */}
                <div className="flex flex-wrap justify-center gap-8 mt-8 text-slate-500 text-sm">
                    {CONTACT_INFO.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href} 
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                            <item.icon className="text-blue-500" />
                            {item.text}
                        </a>
                    ))}
                </div>

                {/* 🌐 Social Icons */}
                <div className="flex justify-center gap-4 mt-10">
                    <SocialIcon Icon={FiGlobe} />
                    <SocialIcon Icon={FiUsers} />
                </div>

                {/* © Bottom Bar */}
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest text-center mt-12 border-t border-slate-200/60 pt-8">
                    © {new Date().getFullYear()} CampusConnect. All rights reserved.
                </div>
            </div>

            {/* 📝 Modal Overlay - Appears when a link is clicked */}
            {activeModal && LEGAL_CONTENT[activeModal] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-slate-100">
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                        >
                            <FiX size={20} />
                        </button>
                        
                        <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                            <div className="w-2 h-8 bg-blue-600 rounded-full" />
                            {LEGAL_CONTENT[activeModal].title}
                        </h3>
                        
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {LEGAL_CONTENT[activeModal].body}
                        </p>
                        
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="mt-8 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
}

interface SocialIconProps {
    Icon: React.ComponentType<{ size: number; className?: string }>;
}

function SocialIcon({ Icon }: SocialIconProps) {
    return (
        <button className="group relative w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center border border-white/40 shadow-sm hover:shadow-lg transition-all active:scale-95">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 blur-md transition-all" />
            <Icon size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors z-10" />
        </button>
    );
}