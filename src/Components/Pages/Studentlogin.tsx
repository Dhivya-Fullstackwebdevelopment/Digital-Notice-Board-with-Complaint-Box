import { useState } from 'react';
import collegeBg from '../../assests/clg.jpeg';
import { GiGraduateCap } from 'react-icons/gi';
import { FiLock, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (studentId && password) {
      console.log("Login Successful");
      navigate("/Home");
    } else {
      alert("Please enter credentials");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${collegeBg})`,
          filter: 'brightness(0.85) contrast(1.1)', 
        }}
      />
      <div className="absolute inset-0 bg-white/10 z-0 backdrop-blur-[2px]" />

      <div
        className="relative z-10 w-full max-w-[400px] mx-6  rounded-3xl border border-white/60 shadow-2xl px-8 py-8 flex flex-col items-center space-y-6"
        style={{
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r from-blue-600 to-blue-400" />

        {/* Icon & Title Group - Tighter spacing */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br from-blue-600 to-blue-500">
            <GiGraduateCap size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Portal</h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Notice Board</p>
          </div>
        </div>

        {/* Inputs Container - Reduced vertical gaps */}
        <div className="w-full space-y-4">
          <div className="relative w-full group">
            <label htmlFor="studentId" className="sr-only">Student ID</label>
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 z-10" size={18} />
            <input
              id="studentId"
              name="studentId"
              type="text"
              placeholder="Student ID / Roll No"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="relative w-full group">
            <label htmlFor="password" className="sr-only">Password</label>
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 z-10" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] transition-all duration-200"
        >
          Login
        </button>

        {/* Footer Link */}
        <p className="text-[11px] text-slate-500 text-center font-medium">
          Forgot credentials?{' '}
          <a href="#" className="text-blue-600 font-bold hover:underline decoration-2">
            Contact Dept Staff
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;