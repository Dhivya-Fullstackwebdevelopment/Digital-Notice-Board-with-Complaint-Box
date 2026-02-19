import { useState } from 'react';
import collegeImg from '../../assests/clg.jpeg';
import { GiGraduateCap } from 'react-icons/gi';
import { FiLock, FiUser } from 'react-icons/fi';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  return (
    /* 1. fixed + inset-0 + overflow-hidden prevents all scrolling */
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden font-sans">
      
      {/* 2. Background Layer with Blur and Brightness */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105" // scale-105 prevents white edges when blurring
        style={{ 
            backgroundImage: `url(${collegeImg})`,
            filter: 'brightness(0.7) blur(4px)' // Applied blur to the background image itself
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-105 mx-4 rounded-2xl border border-white/40 shadow-2xl px-9 pt-10 pb-8 flex flex-col items-center bg-white/40 backdrop-blur-xl"
      >
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-[10%] right-[10%] h-0.75 rounded-b bg-linear-to-r from-blue-600 to-blue-400" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg mb-5">
          <GiGraduateCap size={36} color="#fff" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Student Portal</h1>
        <p className="text-sm text-slate-600 mb-7 font-medium">Access your campus notice board</p>

        {/* Student ID Input */}
        <div className="relative w-full mb-3.5">
          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
          <input
            type="text"
            placeholder="Student ID / Roll No"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/60 bg-white/70 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
        </div>

        {/* Password Input */}
        <div className="relative w-full mb-2">
          <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/60 bg-white/70 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
          />
        </div>

        {/* Login Button */}
        <button className="w-full mt-4 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white text-sm font-bold tracking-wide shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all duration-150 cursor-pointer">
          Login
        </button>

        {/* Forgot */}
        <p className="mt-5 text-xs text-slate-700 text-center">
          Forgot credentials?{' '}
          <a href="#" className="text-blue-700 font-bold hover:underline">
            Contact Staff
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;