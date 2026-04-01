import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import BeforeLoginNavbar from "./Components/BeforeloginNavbar";
import StudentLogin from "./Components/Pages/Studentlogin";
import Homepage from "./Components/Pages/Homepage";
import NoticeBoard from "./Components/Pages/NoticeBoard";
import ComplaintBox from "./Components/Pages/ComplaintBox";
import ComplaintStatus from "./Components/Pages/ComplaintStatus";
import NoticeDetail from "./Components/Pages/NoticeDetail";
import { ToastNotification } from "./Toast/ToastNotification";
import Notifications from "./Components/Pages/Home/Notifications";
import ProtectedRoute from "./Components/ProtectedRoute";

function LoginLayout() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <BeforeLoginNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<StudentLogin />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/Home" element={<Homepage />} />
            <Route path="/Notices" element={<NoticeBoard />} />
            <Route path="/Notice/:id" element={<NoticeDetail />} />
            <Route path="/ComplaintBox" element={<ComplaintBox />} />
            <Route path="/ComplaintStatus" element={<ComplaintStatus />} />
            <Route path="/Notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="*" element={<div className="text-center py-20 text-slate-400">404 | Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;