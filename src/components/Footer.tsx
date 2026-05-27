import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-rose-600 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Join Our Mission</h3>
            <p className="text-rose-100">Your support transforms lives. Every contribution matters.</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button onClick={() => navigate('donate')} className="bg-white text-rose-600 font-semibold px-6 py-3 rounded-lg hover:bg-rose-50 transition-colors shadow-md">
              Donate Now
            </button>
            <button onClick={() => navigate('membership')} className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-rose-600 transition-all">
              Become a Member
            </button>
            <button onClick={() => navigate('volunteer')} className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-rose-600 transition-all">
              Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Samriddhi Women</div>
                <div className="text-rose-400 text-xs">Welfare Society</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              Dedicated to empowering women through education, health, skills and legal support in Bhopal, Madhya Pradesh. Building a stronger society, one woman at a time.
            </p>
            <div className="space-y-1 text-xs text-gray-500">
              <div>Reg. No: MP/NGO/2020/001</div>
              <div>80G Certified | 12A Registered</div>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', page: 'home' },
                { label: 'About Us', page: 'about' },
                { label: 'Our Programs', page: 'programs' },
                { label: 'Photo Gallery', page: 'gallery' },
                { label: 'Donate Now', page: 'donate' },
                { label: 'Membership', page: 'membership' },
                { label: 'Internship', page: 'internship' },
                { label: 'Contact Us', page: 'contact' },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-full group-hover:w-2 transition-all"></span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-white mb-5">Our Programs</h4>
            <ul className="space-y-2.5">
              {[
                'Mahila Shakti Kendra',
                'Beti Bachao Beti Padhao',
                'Swasthya Seva',
                'Kaushal Vikas Training',
                'Saksham Mahila',
                'Gramin Vikas',
              ].map((prog) => (
                <li key={prog}>
                  <button
                    onClick={() => navigate('programs')}
                    className="text-sm text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-full group-hover:w-2 transition-all flex-shrink-0"></span>
                    {prog}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">Bhopal, Madhya Pradesh, India - 462001</span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <div>+91 98765 43210</div>
                  <div>+91 87654 32109</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@samriddhiwomenswelfare.org" className="text-sm text-gray-400 hover:text-rose-400 transition-colors break-all">
                  info@samriddhiwomenswelfare.org
                </a>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-xl">
              <div className="text-xs font-semibold text-rose-400 mb-2">Tax Exemption Benefits</div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Donations exempt under 80G</div>
                <div>• 12A registered for tax benefits</div>
                <div>• 80G receipt provided instantly</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Samriddhi Women Welfare Society. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <button onClick={() => navigate('privacy')} className="hover:text-gray-300 transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('terms')} className="hover:text-gray-300 transition-colors">Terms of Use</button>
            <a href="https://samriddhiwomenwelfaresociety.org" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              samriddhiwomenwelfaresociety.org <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
