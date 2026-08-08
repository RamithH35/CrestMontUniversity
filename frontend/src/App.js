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

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
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
  );
}

export default App;