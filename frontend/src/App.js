import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Alumni from "./pages/Alumni";
import CampusLife from "./pages/CampusLife";
import Contact from "./pages/Contact";
import CreateEvent from "./pages/CreateEvent";
import DepartmentFaculty from "./pages/DepartmentFaculty";
import Departments from "./pages/Departments";
import Home from "./pages/Home";
import Placements from "./pages/Placements";
import ClubHeadLogin from "./pages/ClubHeadLogin";
import DepartmentDetail from "./pages/DepartmentDetail";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";
import cover1 from "./assets/cover-1.jpg";

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] relative">
      {/* Global fixed background texture & grain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background image backdrop at 6% opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${cover1})` }}
        />
        {/* Repeating SVG noise/grain layer at 3.5% opacity */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Relative wrapper to ensure content is interactive and stays above fixed background */}
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/departments/:code/faculty" element={<DepartmentFaculty />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:name" element={<ClubDetail />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/campus-life" element={<CampusLife />} />
          <Route path="/club-head/login" element={<ClubHeadLogin />} />
          <Route path="/club-head/create-event" element={<CreateEvent />} />
          <Route path="/alumni" element={<Alumni />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </div>
  );
}

export default App;