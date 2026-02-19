import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import StudentLogin from "./Components/Pages/Studentlogin";
import Homepage from "./Components/Pages/Homepage";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Home Route */}
            <Route path="/Home" element={<Homepage />} />

            {/* Login Route */}
            <Route path="/" element={<StudentLogin />} />

            {/* Notice Archive (Placeholder) */}
            <Route path="/notices" element={
              <div className="py-24 text-center text-slate-500 font-bold">
                Notice Board Archive Coming Soon
              </div>
            } />

            {/* Complaint Form (Placeholder) */}
            <Route path="/complaint" element={
              <div className="py-24 text-center text-slate-500 font-bold">
                Anonymous Complaint Box Coming Soon
              </div>
            } />

            {/* 404 Page */}
            <Route path="*" element={
              <div className="flex items-center justify-center h-[60vh] text-slate-400 font-bold">
                404 | Page Not Found
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;