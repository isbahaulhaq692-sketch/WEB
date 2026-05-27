import { useState } from 'react';
import { CheckCircle, Heart, Clock, Users, Globe, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'volunteer', message: '', enquiry_type: 'volunteer' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('enquiries').insert([form]);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1600')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">Volunteer</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Volunteer With Us</h1>
          <p className="text-gray-300 text-lg">Give your time and skills to empower women. Every hour counts.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { icon: Heart, title: 'Make an Impact', desc: 'Directly affect lives positively' },
              { icon: Users, title: 'Community', desc: 'Join passionate change-makers' },
              { icon: Clock, title: 'Flexible Hours', desc: 'Contribute on your schedule' },
              { icon: Globe, title: 'Recognition', desc: 'Certificate & appreciation' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-5 text-center hover:-translate-y-1">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">How You Can Volunteer</h2>
              <div className="space-y-4">
                {[
                  { title: 'Teaching & Tutoring', desc: 'Help girls and women with education and digital literacy' },
                  { title: 'Health Camps', desc: 'Assist in organizing and running free health camps' },
                  { title: 'Skills Training', desc: 'Train women in your area of expertise' },
                  { title: 'Field Work', desc: 'Community outreach and rural visits' },
                  { title: 'Administration', desc: 'Help with office work, data entry, and management' },
                  { title: 'Digital & Marketing', desc: 'Social media, website, and communications support' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                      <p className="text-gray-500 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-500">We'll contact you soon about volunteering opportunities.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Register as Volunteer</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input type="email" className="input-field" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Phone</label>
                      <input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Area of Interest / Skills</label>
                      <textarea className="input-field h-24 resize-none" placeholder="Tell us your skills and how you'd like to help" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                      {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Send className="w-4 h-4" />}
                      {loading ? 'Registering...' : 'Register as Volunteer'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
