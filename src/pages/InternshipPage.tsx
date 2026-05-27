import { useState } from 'react';
import { CheckCircle, GraduationCap, Award, Clock, Users, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function InternshipPage() {
  const [form, setForm] = useState({
    applicant_name: '', email: '', phone: '', qualification: '',
    field_of_interest: '', duration: '3_months', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('internships').insert([form]);
    setLoading(false);
    if (err) { setError('Application failed. Please try again.'); return; }
    setSuccess(true);
  };

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.pexels.com/photos/8923153/pexels-photo-8923153.jpeg?auto=compress&cs=tinysrgb&w=1600')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">Internship</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Internship Program</h1>
          <p className="text-gray-300 text-lg">Learn while making a difference. Build your career in social work.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { icon: GraduationCap, title: 'Certificate', desc: 'Internship completion certificate' },
              { icon: Award, title: 'Experience', desc: 'Real social work exposure' },
              { icon: Clock, title: 'Flexible', desc: '1-6 month programs' },
              { icon: Users, title: 'Mentorship', desc: 'Expert guidance provided' },
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
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">About the Program</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Our internship program offers students and young professionals the opportunity to contribute to meaningful social work while gaining practical experience. Work directly with beneficiaries and learn from experienced social workers.
              </p>
              <h3 className="font-bold text-gray-900 mb-3">Available Fields</h3>
              <div className="space-y-2 mb-6">
                {['Social Work & Community Outreach', 'Women Empowerment Programs', 'Healthcare & Wellness', 'Education & Literacy', 'Legal Aid & Counseling', 'Digital Marketing & Communications', 'Fund Raising & Donor Relations'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                <h3 className="font-bold text-rose-900 mb-2">Stipend & Benefits</h3>
                <ul className="space-y-1 text-sm text-rose-700">
                  <li>• Completion certificate recognized nationally</li>
                  <li>• Letter of Recommendation on request</li>
                  <li>• Nominal stipend for full-time interns</li>
                  <li>• Flexible work-from-home options available</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="card p-8">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 mb-6">We'll review your application and contact you within 3-5 business days.</p>
                  <button onClick={() => { setSuccess(false); setForm({ applicant_name: '', email: '', phone: '', qualification: '', field_of_interest: '', duration: '3_months', message: '' }); }} className="btn-primary">Apply Again</button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Apply for Internship</h2>
                  {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input-field" placeholder="Your full name" required value={form.applicant_name} onChange={(e) => setForm({ ...form, applicant_name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Email *</label>
                        <input type="email" className="input-field" placeholder="email@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Phone *</label>
                        <input className="input-field" placeholder="+91 XXXXXXXXXX" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="label">Qualification</label>
                      <input className="input-field" placeholder="e.g., B.SW, MSW, BA, MBA" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Field of Interest</label>
                      <select className="input-field" value={form.field_of_interest} onChange={(e) => setForm({ ...form, field_of_interest: e.target.value })}>
                        <option value="">Select field</option>
                        <option>Social Work & Community Outreach</option>
                        <option>Women Empowerment Programs</option>
                        <option>Healthcare & Wellness</option>
                        <option>Education & Literacy</option>
                        <option>Legal Aid & Counseling</option>
                        <option>Digital Marketing & Communications</option>
                        <option>Fund Raising & Donor Relations</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Duration</label>
                      <select className="input-field" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>
                        <option value="1_month">1 Month</option>
                        <option value="2_months">2 Months</option>
                        <option value="3_months">3 Months</option>
                        <option value="6_months">6 Months</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Message / Motivation</label>
                      <textarea className="input-field h-24 resize-none" placeholder="Why do you want to intern with us?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                      {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Send className="w-4 h-4" />}
                      {loading ? 'Submitting...' : 'Submit Application'}
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
