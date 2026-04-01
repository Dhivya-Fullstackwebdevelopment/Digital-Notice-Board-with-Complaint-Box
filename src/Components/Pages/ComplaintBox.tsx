import { useState } from "react";
import { FiSend, FiLock, FiUser, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import apiClient from "@/api/apiUrl";
import { ErrorMsg } from "../Reusable/ErrorTextMsg";
import { NotifyError, NotifySuccess } from "@/Toast/ToastNotification";

const CATEGORIES = [
    { id: "1", label: "Internal Marks Issue" },
    { id: "2", label: "Attendance Shortage Dispute" },
    { id: "3", label: "Exam Timetable Conflict" },
    { id: "4", label: "Result Correction Request" },
    { id: "5", label: "Faculty Behavior Complaint" },
    { id: "6", label: "Project Evaluation Issue" },
    { id: "7", label: "Ragging Complaint" },
    { id: "8", label: "Verbal Harassment" },
    { id: "9", label: "Physical Harassment" },
    { id: "10", label: "Cyber Bullying" },
    { id: "11", label: "Sexual Harassment" },
    { id: "12", label: "Gender Discrimination" },
    { id: "13", label: "Classroom Maintenance" },
    { id: "14", label: "Washroom Cleanliness" },
    { id: "15", label: "Drinking Water Problem" },
    { id: "16", label: "Electrical Issue" },
    { id: "17", label: "Hostel Room Allocation" },
    { id: "18", label: "Hostel Food Quality" },
    { id: "19", label: "Hostel WiFi Problem" },
    { id: "20", label: "Library Resources" },
    { id: "22", label: "Bus/Transport Issue" },
    { id: "24", label: "Certificate Delay" },
    { id: "25", label: "Scholarship Issue" },
    { id: "27", label: "Portal/IT Login Issue" },
    { id: "30", label: "Campus Security Concern" },
    { id: "99", label: "Other" },
];

const DEPARTMENTS = [
    { id: "1", label: "Computer Science & Engineering" },
    { id: "2", label: "Information Technology" },
    { id: "3", label: "Electronics & Communication" },
    { id: "4", label: "Electrical & Electronics" },
    { id: "5", label: "Mechanical Engineering" },
    { id: "6", label: "Civil Engineering" },
    { id: "7", label: "Artificial Intelligence" },
    { id: "8", label: "MBA" },
    { id: "9", label: "BBA" },
    { id: "10", label: "B.Com" },
    { id: "99", label: "Other" }
];

export default function ComplaintBox() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState("");

    const [formData, setFormData] = useState({
        studentName: "",
        categoryId: "",
        otherCategory: "",
        deptId: "",
        otherDept: "",
        subject: "",
        description: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.categoryId) newErrors.categoryId = "Issue Category is required";
        if (formData.categoryId === "99" && !formData.otherCategory) newErrors.otherCategory = "Please specify the category";
        if (!formData.deptId) newErrors.deptId = "Department is required";
        if (formData.deptId === "99" && !formData.otherDept) newErrors.otherDept = "Please specify the department";
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                ...formData,
                studentName: formData.studentName || "Anonymous",
                status: "pending",
                resolution: ""
            };

            const response = await apiClient.post("/api/complaints/create", payload);
            if (response.data.Status === 1) {
                setSubmittedId(response.data.data.complaintId);
                setIsSubmitted(true);
                NotifySuccess("Complaint submitted Successfully!");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            NotifyError("Failed to submit complaint. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            if (name === "categoryId" && value !== "99") {
                newData.otherCategory = "";
            }

            if (name === "deptId" && value !== "99") {
                newData.otherDept = "";
            }

            return newData;
        });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23000' stroke-width='1'%3E%3Cpath d='M36 34v-4H20v4H15V20h4v-5h10v5h5v10h10V15h10v15h-5v4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] pointer-events-none" />
            <Navbar />
            <div className="relative z-10 max-w-3xl mx-auto pt-28 px-6 pb-20">
                <div className="text-center mb-12">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-red-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-red-100 shadow-sm mb-6"
                    >
                        <FiLock size={12} className="fill-red-50" /> Anonymous & Secure
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Secure <span className="text-blue-600">Complaint Box</span>
                    </h1>
                </div>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="backdrop-blur-xl bg-white/70 border border-white shadow-2xl rounded-[3rem] p-8 md:p-12"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Identity Status */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Identity Status</label>
                                    <div className="relative group">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Leave blank to remain 100% anonymous"
                                            className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-white/50 focus:bg-white outline-none transition-all text-slate-900 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Category & Dept Grid */}
                                {/* Issue Category */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Issue Category<span className="text-red-600">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="categoryId"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white/50 outline-none text-slate-900 shadow-sm appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Category</option>
                                            {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                                        </select>
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <ErrorMsg message={errors.categoryId} />

                                    {formData.categoryId === "99" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                            <input name="otherCategory" value={formData.otherCategory} onChange={handleChange} type="text" placeholder="Specify category"
                                                className="w-full mt-2 px-4 py-3 border text-black placeholder-gray-500 border-blue-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                                            />
                                            <ErrorMsg message={errors.otherCategory} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Department */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Department<span className="text-red-600">*</span></label>
                                    <div className="relative">
                                        <select
                                            name="deptId"
                                            value={formData.deptId}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 border border-slate-200 rounded-2xl bg-white/50 outline-none text-slate-900 shadow-sm appearance-none cursor-pointer pr-10"
                                        >
                                            <option value="">Select Dept</option>
                                            {DEPARTMENTS.map(dept => <option key={dept.id} value={dept.id}>{dept.label}</option>)}
                                        </select>
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <ErrorMsg message={errors.deptId} />

                                    {formData.deptId === "99" && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                            <input name="otherDept" value={formData.otherDept} onChange={handleChange} type="text" placeholder="Specify department"
                                                className="w-full mt-2 px-4 py-3 border text-black placeholder-gray-500 border-blue-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                                            />
                                            <ErrorMsg message={errors.otherDept} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Subject */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Subject<span className="text-red-600">*</span></label>
                                    <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="E.g. Incorrect Internal Marks Displayed"
                                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl bg-white/50 outline-none text-slate-900 shadow-sm"
                                    />
                                    <ErrorMsg message={errors.subject} />
                                </div>

                                {/* Description */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Description<span className="text-red-600">*</span></label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows={5}
                                        placeholder="Provide as much detail as possible..."
                                        className="w-full px-6 py-4 border border-slate-200 rounded-2xl bg-white/50 outline-none text-slate-900 shadow-sm resize-none"
                                    />
                                    <ErrorMsg message={errors.description} />
                                </div>

                                {/* Submit Button */}
                                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
                                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-70"
                                >
                                    {loading ? "Submitting..." : "Submit Report"}
                                    <FiSend />
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 px-8 bg-white border border-slate-100 rounded-[3rem] shadow-2xl">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="text-3xl font-bold">✓</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Report Received</h2>

                            <div className="space-y-4">
                                <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
                                    Your complaint has been submitted successfully with ID: <br />
                                    <span className="text-blue-600 font-extrabold text-2xl tracking-wider">{submittedId}</span>
                                </p>

                                <p className="text-sm text-slate-500 bg-slate-50 py-3 px-6 rounded-xl border border-slate-100 inline-block">
                                    <span className="font-bold text-slate-700">Please note:</span> Use this ID to track your complaint status in the dashboard.
                                </p>
                            </div>

                            <button onClick={() => {
                                setIsSubmitted(false);
                                setSubmittedId("");
                                setFormData({ studentName: "", categoryId: "", otherCategory: "", deptId: "", otherDept: "", subject: "", description: "" })
                            }}
                                className="mt-10 block w-full text-blue-600 font-bold hover:underline">
                                File another report
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}