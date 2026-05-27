import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import MembershipPage from './pages/MembershipPage';
import DonatePage from './pages/DonatePage';
import InternshipPage from './pages/InternshipPage';
import VolunteerPage from './pages/VolunteerPage';
import AdminPanel from './pages/admin/AdminPanel';

const PUBLIC_PAGES = ['home', 'about', 'programs', 'gallery', 'contact', 'membership', 'donate', 'internship', 'volunteer'];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'programs' && <ProgramsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'membership' && <MembershipPage />}
        {currentPage === 'donate' && <DonatePage />}
        {currentPage === 'internship' && <InternshipPage />}
        {currentPage === 'volunteer' && <VolunteerPage />}
        {!PUBLIC_PAGES.includes(currentPage) && (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
              <p className="text-gray-500 mb-6">This page is under construction.</p>
              <button onClick={() => setCurrentPage('home')} className="btn-primary">Go Home</button>
            </div>
          </div>
        )}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
