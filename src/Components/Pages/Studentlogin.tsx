// import { useState } from 'react';
// import collegeBg from '../../assests/clg.jpeg';
// import { GiGraduateCap } from 'react-icons/gi';
// import { FiLock, FiUser } from 'react-icons/fi';

// const StudentLogin = () => {
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden font-sans">
//       {/* Background with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center z-0"
//         style={{
//           backgroundImage: `url(${collegeBg})`,
//           transform: 'scale(1.1)', // Slightly more scale to prevent white edges during blur
//         }}
//       />
//       {/* Dark overlay to make the glass pop */}
//       <div className="absolute inset-0 bg-black/40 z-0 backdrop-blur-sm" />

//       {/* Card */}
//       {/* Card Container */}
//       <div
//         className="relative z-10 w-full max-w-[420px] mx-4 rounded-3xl border border-white/40 shadow-2xl px-10 pt-12 pb-10 flex flex-col items-center space-y-6" // Added space-y-6 here
//         style={{
//           background: 'rgba(255, 255, 255, 0.2)',
//           backdropFilter: 'blur(16px)',
//           WebkitBackdropFilter: 'blur(16px)'
//         }}
//       >
//         {/* Top Accent Bar */}
//         <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-600 to-blue-400" />

//         {/* Icon - Remove mt-6 from here, space-y handles it */}
//         <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-br from-blue-600 to-blue-500">
//           <GiGraduateCap size={38} className="text-white" />
//         </div>

//         {/* Title Section */}
//         <div className="text-center">
//           <h1 className="text-2xl font-extrabold text-white tracking-tight">Student Portal</h1>
//           <p className="text-sm text-blue-50 font-medium opacity-80">Access your campus notice board</p>
//         </div>

//         {/* Inputs Container */}
//         <div className="w-full space-y-4"> {/* Inner space between inputs */}
//           <div className="relative w-full">
//             <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={18} />
//             <input
//               type="text"
//               placeholder="Student ID / Roll No"
//               className="relative w-full pl-11 pr-4 py-4 rounded-xl border border-white/20 bg-white/80 backdrop-blur-md text-sm text-slate-800 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//             />
//           </div>

//           <div className="relative w-full ">
//             <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={18} />
//             <input
//               type="password"
//               placeholder="Password"
//               className="relative w-full pl-11 pr-4 py-4 rounded-xl border border-white/20 bg-white/80 backdrop-blur-md text-sm text-slate-800 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//             />
//           </div>
//         </div>

//         {/* Login Button */}
//         <button
//           className="w-full py-9 rounded-xl text-white text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
//         >
//           Login
//         </button>

//         {/* Forgot Link */}
//         <p className="text-xs text-white/80 text-center">
//           Forgot credentials?{' '}
//           <a href="#" className="text-white font-bold hover:underline decoration-blue-400 underline-offset-4">
//             Contact your Department staff
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import { useState } from 'react';
import collegeBg from '../../assests/clg.jpeg';
import { GiGraduateCap } from 'react-icons/gi';
import { FiLock, FiUser } from 'react-icons/fi';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${collegeBg})`,
          transform: 'scale(1.1)',
        }}
      />
      <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-sm" />

      {/* Card Container */}
      <div
        className="relative z-10 w-full max-w-[400px] mx-6 rounded-3xl border border-white/30 shadow-2xl px-8 py-10 flex flex-col items-center space-y-8"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {/* Top Accent Bar - Fixed to fit rounded corners */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-600 to-blue-400" />

        {/* Icon & Title Group */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-600 to-blue-500 border border-white/20">
            <GiGraduateCap size={36} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">Student Portal</h1>
            <p className="text-sm text-blue-100/80 font-medium">Access your campus notice board</p>
          </div>
        </div>

        {/* Inputs Container - Adjusted X/Y padding */}
        <div className="w-full space-y-5">
          <div className="relative w-full group">
            <label htmlFor="studentId" className="sr-only">Student ID</label>
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 z-10" size={18} />
            <input
              id="studentId"
              name="studentId"
              type="text"
              placeholder="Student ID / Roll No"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/20 transition-all duration-300 shadow-sm"
            />
          </div>

          <div className="relative w-full group">
            <label htmlFor="password" className="sr-only">Password</label>
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 z-10" size={18} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/20 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* Login Button - Reduced py-9 to py-4 to fix the "bulky" look */}
        <button
          className="w-full py-4 rounded-xl text-white text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
        >
          Login
        </button>

        {/* Footer Link */}
        <p className="text-xs text-white/60 text-center">
          Forgot credentials?{' '}
          <a href="#" className="text-blue-400 font-bold hover:text-white transition-colors underline-offset-4 decoration-blue-500/50 underline">
            Contact Dept Staff
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;