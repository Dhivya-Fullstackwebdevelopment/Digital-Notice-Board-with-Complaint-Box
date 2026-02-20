import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import BeforeLoginNavbar from "./Components/BeforeloginNavbar";
import StudentLogin from "./Components/Pages/Studentlogin";
import Homepage from "./Components/Pages/Homepage";
import NoticeBoard from "./Components/Pages/NoticeBoard";
import ComplaintBox from "./Components/Pages/ComplaintBox";


// Layout for Login Page
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

// Layout for Other Pages
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
      <Routes>
        {/* Login Route */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<StudentLogin />} />
        </Route>

        {/* All Other Routes */}
        <Route element={<MainLayout />}>
          <Route path="/Home" element={<Homepage />} />
          <Route path="/Notices" element={<NoticeBoard />} />
          <Route path="/ComplaintBox" element={<ComplaintBox />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-[60vh] text-slate-400 font-bold">
              404 | Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;