import { useState, useEffect } from 'react';
import { Heart, Users, Award, Globe, ArrowRight, CheckCircle, Star, Target, BookOpen, Stethoscope, Scale, Sprout, Wrench, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const stats = [
  { value: '5000+', label: 'Women Empowered', icon: Users },
  { value: '50+', label: 'Programs Run', icon: Target },
  { value: '10+', label: 'Years of Service', icon: Award },
  { value: '25+', label: 'Districts Covered', icon: Globe },
];

const features = [
  { icon: BookOpen, title: 'Education Support', desc: 'Scholarship and learning aid for girls' },
  { icon: Stethoscope, title: 'Health Camps', desc: 'Free medical checkup drives' },
  { icon: Wrench, title: 'Skill Training', desc: 'Vocational and livelihood programs' },
  { icon: Scale, title: 'Legal Aid', desc: 'Free legal counseling for women' },
  { icon: Sprout, title: 'Rural Outreach', desc: 'Reaching villages across MP' },
  { icon: Heart, title: 'Child Welfare', desc: 'Nutrition and care for children' },
];

const testimonials = [
  {
    name: 'Sunita Devi',
    location: 'Bhopal, MP',
    text: 'Samriddhi Society changed my life. With their skill training, I now run my own tailoring business and support my family.',
    rating: 5,
  },
  {
    name: 'Rekha Sharma',
    location: 'Vidisha, MP',
    text: 'The legal aid I received helped me fight for my rights. The team was supportive and guided me throughout.',
    rating: 5,
  },
  {
    name: 'Anita Patel',
    location: 'Sehore, MP',
    text: 'My daughter got a scholarship through their Beti Bachao program. Now she is studying engineering. Grateful forever!',
    rating: 5,
  },
];

const programCards = [
  { icon: Users, title: 'Mahila Shakti Kendra', desc: 'Women empowerment through training and livelihood support', color: 'bg-rose-50 text-rose-600' },
  { icon: BookOpen, title: 'Beti Bachao Beti Padhao', desc: 'Education support and awareness for the girl child', color: 'bg-amber-50 text-amber-600' },
  { icon: Stethoscope, title: 'Swasthya Seva', desc: 'Free health camps and medical support for women', color: 'bg-emerald-50 text-emerald-600' },
  { icon: Wrench, title: 'Kaushal Vikas', desc: 'Skill development in tailoring, computers, and more', color: 'bg-blue-50 text-blue-600' },
];

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('crowdfunding_campaigns').select('*').eq('is_active', true).limit(2).then(({ data }) => {
      if (data) setCampaigns(data);
    });
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/20 animate-fadeInUp">
              <span className="w-2 h-2 bg-rose-300 rounded-full animate-pulse-slow"></span>
              Empowering Women Since 2014 | Bhopal, Madhya Pradesh
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fadeInUp delay-100">
              Transforming Lives,<br />
              <span className="text-rose-300">Empowering Women</span>
            </h1>
            <p className="text-lg text-white/85 mb-8 leading-relaxed max-w-2xl animate-fadeInUp delay-200">
              Samriddhi Women Welfare Society works tirelessly to uplift women through education, health, skill development, and legal support across Madhya Pradesh.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
              <button onClick={() => navigate('donate')} className="btn-primary flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white" /> Donate Now
              </button>
              <button onClick={() => navigate('membership')} className="btn-outline flex items-center gap-2">
                Become a Member <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('programs')} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2">
                Our Programs <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="stat-card rounded-2xl p-6 text-center border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-rose-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">About Our Society</div>
              <h2 className="section-title">Dedicated to Women's Welfare Since 2014</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Samriddhi Women Welfare Society is a registered NGO based in Bhopal, Madhya Pradesh. Founded with a vision to create an equitable society, we work across multiple domains to uplift women and girls from marginalized communities.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our society is 80G and 12A certified, enabling donors to receive tax benefits on their contributions. We believe in transparency, accountability, and measurable impact in everything we do.
              </p>
              <div className="space-y-3 mb-8">
                {['Registered under Societies Registration Act', '80G & 12A Tax Exemption Certificate', 'FCRA Registered for International Donations', 'Transparent Fund Utilization Reports'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('about')} className="btn-primary flex items-center gap-2 w-fit">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Women empowerment program"
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px]">
                <div className="text-3xl font-bold text-rose-600 mb-1">10+</div>
                <div className="text-sm text-gray-600">Years of dedicated service to women</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-rose-600 text-white rounded-2xl p-4 shadow-xl">
                <div className="text-2xl font-bold mb-0.5">5000+</div>
                <div className="text-xs text-rose-100">Lives Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">What We Do</div>
            <h2 className="section-title">Our Core Programs</h2>
            <p className="section-subtitle">Comprehensive programs designed to create lasting change in the lives of women and girls</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {programCards.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 group cursor-pointer hover:-translate-y-2" onClick={() => navigate('programs')}>
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 text-rose-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => navigate('programs')} className="btn-secondary flex items-center gap-2 mx-auto">
              View All Programs <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-rose-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6646916/pexels-photo-6646916.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose to Support Us?</h2>
            <p className="text-rose-100 max-w-2xl mx-auto">Every rupee you donate is used effectively for maximum impact</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-semibold text-white text-sm mb-1">{title}</div>
                <div className="text-rose-200 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">Fundraising</div>
              <h2 className="section-title">Active Campaigns</h2>
              <p className="section-subtitle">Support our ongoing campaigns to make a direct impact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((camp) => {
                const percent = Math.min(100, Math.round((camp.raised_amount / camp.goal_amount) * 100));
                return (
                  <div key={camp.id} className="card overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {camp.title.includes('Girl') ? '👧' : '❤️'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{camp.title}</h3>
                      <p className="text-gray-500 text-sm mb-5 leading-relaxed">{camp.description}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Raised: <strong className="text-rose-600">₹{Number(camp.raised_amount).toLocaleString('en-IN')}</strong></span>
                          <span className="text-gray-600">Goal: <strong>₹{Number(camp.goal_amount).toLocaleString('en-IN')}</strong></span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="mt-1.5 text-right text-xs text-gray-500">{percent}% funded</div>
                      </div>
                      <button onClick={() => navigate('donate')} className="btn-primary w-full">
                        Donate to This Campaign
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">Stories</div>
            <h2 className="section-title">Lives We've Touched</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-rose-600 font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-3">Membership</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Become Part of Our Family</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Join thousands of members who are making a difference. Get your Member ID Card, Membership Certificate, and participate in all society activities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {['Member ID Card', 'Appointment Letter', 'Membership Certificate'].map((item) => (
              <div key={item} className="flex items-center gap-2 justify-center bg-white/5 border border-white/10 rounded-xl py-3 px-4">
                <CheckCircle className="w-4 h-4 text-rose-400" />
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('membership')} className="btn-primary text-base px-8 py-4 flex items-center gap-2 mx-auto">
            Join as Member <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-rose-600 font-semibold text-sm uppercase tracking-widest mb-3">Gallery</div>
              <h2 className="text-3xl font-bold text-gray-900">Our Activities in Pictures</h2>
            </div>
            <button onClick={() => navigate('gallery')} className="btn-secondary hidden md:flex items-center gap-2">
              View All Photos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=400',
              'https://images.pexels.com/photos/6646916/pexels-photo-6646916.jpeg?auto=compress&cs=tinysrgb&w=400',
            ].map((url, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl cursor-pointer group ${i === 0 ? 'md:row-span-2' : ''}`}
                onClick={() => navigate('gallery')}
              >
                <img
                  src={url}
                  alt={`Activity ${i + 1}`}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${i === 0 ? 'h-full min-h-[300px]' : 'h-40 md:h-48'}`}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <button onClick={() => navigate('gallery')} className="btn-secondary">View All Photos</button>
          </div>
        </div>
      </section>
    </div>
  );
}
