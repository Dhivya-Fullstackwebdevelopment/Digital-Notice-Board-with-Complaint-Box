import { useState } from 'react';
import collegeBg from '../../assests/clg.jpeg';
import { GiGraduateCap } from 'react-icons/gi';
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'; 
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import apiClient from '@/api/apiUrl';
import { NotifyError, NotifySuccess } from '@/Toast/ToastNotification';
import { ErrorMsg } from '../Reusable/ErrorTextMsg';

const loginSchema = z.object({
  registerNo: z.string().min(1, "Register No is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const StudentLogin = () => {
  const [formData, setFormData] = useState({ registerNo: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Eye icon state
  const navigate = useNavigate();

  // Helper to update field and clear its error
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' })); // Clear error when typing
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post("/api/students/login", formData);
      
      if (response.data.Status === 1) {
        localStorage.setItem("studentToken", response.data.token);
        NotifySuccess("Login Successful!");
        navigate("/Home");
      } else {
        NotifyError(response.data.message || "Invalid Credentials");
      }
    } catch (error: any) {
      NotifyError(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${collegeBg})`, filter: 'brightness(0.85)' }} />
      
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-[400px] mx-6 rounded-3xl border border-white/60 shadow-2xl px-8 py-8 flex flex-col items-center space-y-6 bg-white/85 backdrop-blur-xl">
        <div className="absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r from-blue-600 to-blue-400" />

        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 shadow-md">
            <GiGraduateCap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student Portal</h1>
        </div>

        <div className="w-full space-y-4">
          {/* Register No */}
          <div className="relative w-full">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
            <input
              type="text"
              placeholder="Register No"
              value={formData.registerNo}
              onChange={e => handleChange('registerNo', e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
            <ErrorMsg message={errors.registerNo} />
          </div>

          {/* Password with Eye Icon */}
          <div className="relative w-full">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={e => handleChange('password', e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
            <ErrorMsg message={errors.password} />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-bold uppercase bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;