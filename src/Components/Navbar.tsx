import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PillNav from './HeaderStyle/PillNav';
import { GiGraduateCap } from 'react-icons/gi';
import { FiBell, FiLogOut, FiMenu, FiX } from 'react-icons/fi'; // Added Menu icons

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/Home' },
        { label: 'Notice', href: '/Notices' },
        { label: 'Complaint', href: '/ComplaintBox' },
        { label: 'Complaint Status', href: '/ComplaintStatus' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md px-4 md:px-6 py-3">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">

                {/* Brand Section */}
                <div
                    onClick={() => navigate('/Home')}
                    className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <GiGraduateCap size={22} />
                    </div>

                    <span className="text-lg font-black tracking-tighter text-slate-800 hidden sm:block">
                        CAMPUS<span className="text-blue-600">CONNECT</span>
                    </span>
                </div>

                {/* Desktop Navigation Pill - Hidden on Mobile */}
                <div className="hidden md:flex flex-grow justify-center">
                    <PillNav
                        items={navItems}
                        activeHref={location.pathname}
                    />
                </div>

                {/* Icons & Mobile Toggle */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative">
                        <FiBell size={22} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    </button>

                    {/* Logout Hidden on Mobile to save space (moved to menu) */}
                    <button onClick={() => navigate('/')} className="hidden md:block p-2 text-slate-500 hover:text-slate-800 transition-colors">
                        <FiLogOut size={22} />
                    </button>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden p-2 text-slate-800"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 md:hidden flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-300">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-sm font-bold uppercase tracking-wide p-3 rounded-xl transition-colors ${location.pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-slate-600'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide p-3 text-red-600 bg-red-50 rounded-xl"
                    >
                        <FiLogOut size={18} /> Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;