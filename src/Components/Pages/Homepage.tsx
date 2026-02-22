import Navbar from "../../Components/Navbar";
import Footer from "./Home/Footer";
import Hero from "./Home/Hero";
import NoticesPreview from "./Home/NoticesPreview";
import SecureFeedback from "./Home/SecureFeedback";
import Stats from "./Home/Stats";

const MOCK_NOTICES = [
    {
        id: "1",
        title: "End Semester Examination Schedule Released",
        category: "Academic",
        date: "Oct 24, 2025",
        content: "The schedule for the upcoming end-semester examinations is now available on the official portal and campus display boards. Please check for any overlaps.",
    },
    {
        id: "2",
        title: "Annual Cultural Fest: 'Utopia' 2025 Registration Open",
        category: "Event",
        date: "Oct 22, 2025",
        content: "Registrations for the annual cultural festival 'Utopia' are now open. Interested students can sign up for various competitions and events.",
    },
    {
        id: "3",
        title: "Emergency Maintenance: Library Closed Today",
        category: "Emergency",
        date: "Oct 21, 2025",
        content: "The central library will be closed for emergency electrical maintenance today from 2:00 PM to 6:00 PM. We apologize for the inconvenience.",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 text-slate-900 font-sans selection:bg-blue-100 overflow-x-hidden">
            <Navbar />
            <Hero />
            <NoticesPreview notices={MOCK_NOTICES} />
            <SecureFeedback />
            <Stats />
            <Footer />
        </div>
    );
}