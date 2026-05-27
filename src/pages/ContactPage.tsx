import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', enquiry_type: 'general' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('enquiries').insert([form]);
    setLoading(false);
    if (err) { setError('Failed to send message. Please try again.'); return; }
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '', enquiry_type: 'general' });
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">Get in Touch</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Contact Us</h1>
          <p className="text-gray-300 text-lg">We're here to help. Reach out for any queries, support, or collaboration.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: 'Phone', lines: ['+91 98765 43210', '+91 87654 32109'], color: 'bg-rose-50 text-rose-600' },
                { icon: Mail, title: 'Email', lines: ['info@samriddhiwomenswelfare.org', 'contact@samriddhiwomenswelfare.org'], color: 'bg-blue-50 text-blue-600' },
                { icon: MapPin, title: 'Address', lines: ['Samriddhi Women Welfare Society', 'Bhopal, Madhya Pradesh - 462001'], color: 'bg-emerald-50 text-emerald-600' },
                { icon: Clock, title: 'Office Hours', lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: By Appointment'], color: 'bg-amber-50 text-amber-600' },
              ].map(({ icon: Icon, title, lines, color }) => (
                <div key={title} className="card p-5 flex gap-4">
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                    {lines.map((l) => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 card p-8">
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="btn-primary">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">{error}</div>}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Full Name *</label>
                        <input className="input-field" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input type="email" className="input-field" placeholder="your@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="label">Phone</label>
                        <input className="input-field" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Enquiry Type</label>
                        <select className="input-field" value={form.enquiry_type} onChange={(e) => setForm({ ...form, enquiry_type: e.target.value })}>
                          <option value="general">General Enquiry</option>
                          <option value="donation">Donation</option>
                          <option value="membership">Membership</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="internship">Internship</option>
                          <option value="partnership">Partnership/CSR</option>
                          <option value="media">Media</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">Subject</label>
                      <input className="input-field" placeholder="Brief subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Message *</label>
                      <textarea className="input-field h-36 resize-none" placeholder="Your message..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Send className="w-4 h-4" />}
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="bg-gray-200 h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-10 h-10 mx-auto mb-2" />
          <p className="font-medium">Bhopal, Madhya Pradesh</p>
          <p className="text-sm">Visit us at our office</p>
        </div>
      </div>
    </div>
  );
}
