import { useState, useEffect } from 'react';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'About Us', page: 'about' },
  { label: 'Programs', page: 'programs' },
  { label: 'Gallery', page: 'gallery' },
  {
    label: 'Get Involved',
    children: [
      { label: 'Become a Member', page: 'membership' },
      { label: 'Internship', page: 'internship' },
      { label: 'Volunteer', page: 'volunteer' },
    ],
  },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    setMobileOpen(false);
    setDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Top bar */}
      <div className={`hidden md:block transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-rose-600' : 'bg-rose-700/80'}`}>
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center text-white text-xs">
          <span>Reg. No: MP/NGO/2020/001 | 80G & 12A Certified NGO</span>
          <div className="flex gap-4">
            <span>+91 98765 43210</span>
            <span>info@samriddhiwomenswelfare.org</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-md group-hover:bg-rose-700 transition-colors">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="text-left">
              <div className={`font-bold text-sm leading-tight transition-colors ${scrolled || currentPage !== 'home' ? 'text-gray-900' : 'text-white'}`}>Samriddhi Women</div>
              <div className={`text-xs leading-tight transition-colors ${scrolled || currentPage !== 'home' ? 'text-rose-600' : 'text-rose-200'}`}>Welfare Society</div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled || currentPage !== 'home' ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50' : 'text-white hover:text-rose-200'}`}
                  >
                    {link.label} <ChevronDown className="w-3 h-3" />
                  </button>
                  {dropdown && (
                    <div
                      onMouseEnter={() => setDropdown(true)}
                      onMouseLeave={() => setDropdown(false)}
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 min-w-[180px] py-2 animate-fadeIn"
                    >
                      {link.children.map((child) => (
                        <button
                          key={child.page}
                          onClick={() => navigate(child.page)}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page!)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === link.page
                      ? 'text-rose-600 bg-rose-50'
                      : scrolled || currentPage !== 'home'
                      ? 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                      : 'text-white hover:text-rose-200'
                  }`}
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => navigate('donate')} className="btn-primary py-2 px-4 text-sm">
              Donate Now
            </button>
            <button onClick={() => navigate('admin')} className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1">
              Admin
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled || currentPage !== 'home' ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{link.label}</div>
                  {link.children.map((child) => (
                    <button
                      key={child.page}
                      onClick={() => navigate(child.page)}
                      className="block w-full text-left px-6 py-2 text-sm text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page!)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPage === link.page ? 'bg-rose-50 text-rose-600' : 'text-gray-700 hover:bg-rose-50 hover:text-rose-600'}`}
                >
                  {link.label}
                </button>
              )
            )}
            <div className="pt-3 flex gap-2">
              <button onClick={() => navigate('donate')} className="flex-1 btn-primary py-2.5 text-sm">Donate Now</button>
              <button onClick={() => navigate('membership')} className="flex-1 btn-secondary py-2.5 text-sm">Join Us</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
