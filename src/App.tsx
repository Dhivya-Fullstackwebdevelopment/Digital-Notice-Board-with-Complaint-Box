import Navbar from './Components/Navbar'; // Adjust path based on your folder structure
import './App.css';
import "./index.css";
import StudentLogin from './Components/Pages/Studentlogin';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Your separate Navbar file */}
      <Navbar hideNav={false} />

      {/* Main content area */}
      <main className="flex-grow">
        <StudentLogin />
      </main>
    </div>
  );
}

export default App;