import React from 'react';

interface NavbarProps {
  hideNav: boolean;
}

const Navbar = ({ hideNav }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 z-50 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
           <span className="font-bold">CC</span>
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          Campus<span className="text-blue-600">Connect</span>
        </span>
      </div>

      {/* Only show links if hideNav is NOT true */}
      {!hideNav && (
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">Home</a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;