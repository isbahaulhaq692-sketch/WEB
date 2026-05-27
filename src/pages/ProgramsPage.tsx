import { useEffect, useState } from 'react';
import { BookOpen, Stethoscope, Wrench, Scale, Sprout, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProgramsPageProps {
  setCurrentPage: (page: string) => void;
}

const categoryIcons: Record<string, any> = {
  women_empowerment: Users,
  education: BookOpen,
  health: Stethoscope,
  skill_development: Wrench,
  legal_support: Scale,
  rural_development: Sprout,
};

const categoryColors: Record<string, string> = {
  women_empowerment: 'bg-rose-50 text-rose-600 border-rose-100',
  education: 'bg-amber-50 text-amber-600 border-amber-100',
  health: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  skill_development: 'bg-blue-50 text-blue-600 border-blue-100',
  legal_support: 'bg-orange-50 text-orange-600 border-orange-100',
  rural_development: 'bg-teal-50 text-teal-600 border-teal-100',
};

const defaultPrograms = [
  {
    id: '1',
    title: 'Mahila Shakti Kendra',
    description: 'Women empowerment through comprehensive skill development, training and livelihood support programs. We provide vocational training in various trades to help women become financially independent.',
    category: 'women_empowerment',
    beneficiary_count: 1200,
    location: 'Bhopal & Surrounding Districts',
  },
  {
    id: '2',
    title: 'Beti Bachao Beti Padhao',
    description: 'Education and awareness campaign for girl child welfare and education. We provide scholarships, free books, stationery, and coaching support to underprivileged girls.',
    category: 'education',
    beneficiary_count: 800,
    location: 'MP Districts',
  },
  {
    id: '3',
    title: 'Swasthya Seva',
    description: 'Free health camps, medical checkups and awareness drives for women and children. We partner with hospitals and doctors for regular health screenings.',
    category: 'health',
    beneficiary_count: 2000,
    location: 'Bhopal, Vidisha, Sehore',
  },
  {
    id: '4',
    title: 'Kaushal Vikas',
    description: 'Skill development training for women in tailoring, computers, beauty, handicrafts and other trades. Certified courses recognized by NSDC.',
    category: 'skill_development',
    beneficiary_count: 650,
    location: 'Training Centers across Bhopal',
  },
  {
    id: '5',
    title: 'Saksham Mahila',
    description: 'Legal aid, counseling and support for women in distress. We provide free legal consultation, court support, and rehabilitation for domestic violence survivors.',
    category: 'legal_support',
    beneficiary_count: 400,
    location: 'Bhopal Legal Aid Center',
  },
  {
    id: '6',
    title: 'Gramin Vikas',
    description: 'Rural development and welfare programs for underprivileged women in villages across MP. Focus on sanitation, nutrition, and awareness.',
    category: 'rural_development',
    beneficiary_count: 950,
    location: '25+ Villages in MP',
  },
];

export default function ProgramsPage({ setCurrentPage }: ProgramsPageProps) {
  const [programs, setPrograms] = useState(defaultPrograms);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    supabase.from('programs').select('*').eq('is_active', true).order('display_order').then(({ data }) => {
      if (data && data.length > 0) setPrograms(data as any);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(programs.map((p) => p.category)))];
  const filtered = activeCategory === 'all' ? programs : programs.filter((p) => p.category === activeCategory);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">What We Do</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Our Programs & Initiatives</h1>
          <p className="text-gray-300 text-lg">Comprehensive programs designed to create lasting change in women's lives</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-rose-600 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { v: '6+', l: 'Active Programs' },
              { v: '5000+', l: 'Beneficiaries' },
              { v: '25+', l: 'Districts' },
              { v: '10+', l: 'Years Experience' },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="text-2xl font-bold text-white">{v}</div>
                <div className="text-rose-100 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((prog) => {
              const Icon = categoryIcons[prog.category] || Users;
              const colorClass = categoryColors[prog.category] || 'bg-gray-50 text-gray-600 border-gray-100';
              return (
                <div key={prog.id} className="card overflow-hidden group hover:-translate-y-2">
                  <div className={`p-6 border-b ${colorClass.split(' ').slice(0, 1).join(' ')} border-opacity-50`}>
                    <div className={`w-14 h-14 ${colorClass} border-2 rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{prog.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{prog.description}</p>
                  </div>
                  <div className="p-4 bg-gray-50 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">{Number(prog.beneficiary_count).toLocaleString()}</span> beneficiaries
                    </div>
                    <div className="text-xs text-gray-400">{prog.location}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How You Can Help</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Multiple ways to contribute to our programs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Donate',
                desc: 'Financial support for our programs. 80G tax benefits available.',
                icon: '💰',
                cta: 'Donate Now',
                page: 'donate',
                color: 'from-rose-500 to-rose-600',
              },
              {
                title: 'Volunteer',
                desc: 'Give your time and skills to help our beneficiaries directly.',
                icon: '🤝',
                cta: 'Volunteer',
                page: 'volunteer',
                color: 'from-amber-500 to-amber-600',
              },
              {
                title: 'Internship',
                desc: 'Learn while contributing. Internship certificates provided.',
                icon: '🎓',
                cta: 'Apply Now',
                page: 'internship',
                color: 'from-emerald-500 to-emerald-600',
              },
            ].map(({ title, desc, icon, cta, page, color }) => (
              <div key={title} className="card p-8 text-center hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl shadow-lg`}>
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
                <button onClick={() => navigate(page)} className="btn-primary w-full flex items-center justify-center gap-2">
                  {cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Income Generation', desc: '650+ women now earn independently through skill training and self-employment' },
              { title: 'Education Access', desc: '800+ girls received scholarships and education support' },
              { title: 'Health Outcomes', desc: '2000+ women received free medical care and health education' },
              { title: 'Legal Protection', desc: '400+ women received legal aid and protection services' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
