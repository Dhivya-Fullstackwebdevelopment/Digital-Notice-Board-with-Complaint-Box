import { GiGraduateCap } from 'react-icons/gi';

const BeforeLoginNavbar = () => {

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md px-4 md:px-6 py-3">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                {/* Brand Section */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <GiGraduateCap size={22} />
                    </div>

                    <span className="text-lg font-black tracking-tighter text-slate-800 hidden sm:block">
                        CAMPUS<span className="text-blue-600">CONNECT</span>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default BeforeLoginNavbar;