import { CheckCircle, Users, Target, Heart, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

const team = [
  { name: 'Pooja Nigam', role: 'Founder & President', desc: 'Visionary leader with 10+ years in women welfare and social work in Madhya Pradesh.' },
  { name: 'Sunita Verma', role: 'Secretary General', desc: 'Expert in program management and beneficiary outreach across rural MP.' },
  { name: 'Dr. Anjali Singh', role: 'Health Director', desc: 'MBBS doctor leading free health camps and medical awareness programs.' },
  { name: 'Kavita Joshi', role: 'Legal Advisor', desc: 'Senior advocate providing free legal aid and counseling to women in need.' },
];

const milestones = [
  { year: '2014', event: 'Society Founded', desc: 'Samriddhi Women Welfare Society established in Bhopal, Madhya Pradesh' },
  { year: '2015', event: '12A Registration', desc: 'Received 12A registration for tax exemption on income' },
  { year: '2016', event: '80G Certificate', desc: 'Obtained 80G certification enabling donor tax benefits' },
  { year: '2018', event: '1000 Women Milestone', desc: 'Successfully impacted 1000+ women through various programs' },
  { year: '2020', event: 'FCRA Registration', desc: 'Registered for receiving foreign contributions' },
  { year: '2024', event: '5000+ Women Empowered', desc: 'Crossed major milestone of empowering 5000+ women across MP' },
];

export default function AboutPage({ setCurrentPage }: AboutPageProps) {
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
          style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">About Samriddhi Women Welfare Society</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            A dedicated NGO based in Bhopal, Madhya Pradesh working since 2014 to empower women and transform communities
          </p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Mission"
                className="rounded-2xl shadow-xl w-full object-cover h-[450px]"
              />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-rose-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To empower women and girls through education, health, skill development, and legal support, creating self-reliant individuals who contribute positively to society. We strive to eliminate gender-based discrimination and create equal opportunities for all women.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A society where every woman lives with dignity, equality, and opportunity. We envision a Madhya Pradesh where no woman is left behind - where every girl gets education, every woman gets healthcare, and every mother gets support.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Transparency', 'Accountability', 'Inclusivity', 'Empathy', 'Sustainability', 'Community'].map((val) => (
                    <div key={val} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Info */}
      <section className="py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal & Certification Details</h2>
            <p className="text-gray-500">Fully registered and certified NGO with complete transparency</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Society Registration', no: 'MP/NGO/2020/001', desc: 'Registered under Madhya Pradesh Societies Registration Act', color: 'border-rose-200 bg-rose-50' },
              { title: '80G Certificate', no: '80G/2020/001', desc: 'Donations eligible for 50% tax deduction under Section 80G', color: 'border-amber-200 bg-amber-50' },
              { title: '12A Registration', no: '12A/2020/001', desc: 'Income tax exemption on all organizational income', color: 'border-emerald-200 bg-emerald-50' },
            ].map(({ title, no, desc, color }) => (
              <div key={title} className={`rounded-2xl border-2 p-6 ${color}`}>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <div className="text-rose-600 font-mono text-sm mb-3">{no}</div>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Team</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Dedicated professionals working tirelessly for women's welfare</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, desc }) => (
              <div key={name} className="card p-6 text-center group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-rose-200 group-hover:to-rose-300 transition-all">
                  <Users className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
                <div className="text-rose-600 text-sm font-medium mb-3">{role}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Journey</div>
            <h2 className="text-3xl font-bold text-gray-900">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-rose-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
                      <div className="text-rose-600 font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-bold text-gray-900 mb-1">{m.event}</h3>
                      <p className="text-gray-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-md">
                    <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rose-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission Today</h2>
          <p className="text-rose-100 mb-8">Be part of the change. Donate, volunteer, or become a member.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('donate')} className="bg-white text-rose-600 font-bold px-8 py-3 rounded-lg hover:bg-rose-50 transition-colors">
              Donate Now
            </button>
            <button onClick={() => navigate('membership')} className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-rose-600 transition-all flex items-center gap-2">
              Join as Member <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
