import { useState } from 'react';
import { CheckCircle, CreditCard, Smartphone, Building2, Users, Award, FileText, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

const plans = [
  {
    id: 'annual',
    name: 'Annual Member',
    price: 500,
    duration: '1 Year',
    color: 'border-rose-200',
    badge: '',
    features: ['Member ID Card', 'Membership Certificate', 'Annual Newsletter', 'Participation in Events', 'Digital Certificate'],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Member',
    price: 2100,
    duration: 'Lifetime',
    color: 'border-rose-500',
    badge: 'Most Popular',
    features: ['Member ID Card', 'Membership Certificate', 'Appointment Letter', 'Achievement Certificate', '80G Receipt', 'Priority Support', 'All Events Access'],
  },
  {
    id: 'patron',
    name: 'Patron Member',
    price: 5100,
    duration: 'Lifetime',
    color: 'border-amber-500',
    badge: 'Premium',
    features: ['All Lifetime Benefits', 'Special Recognition', 'Annual Report', 'Trustee Meeting Invite', 'CSR Partnership', 'Dedicated Support'],
  },
];

const paymentMethods = [
  { id: 'upi', label: 'UPI / GPay / PhonePe', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
  { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
  { id: 'offline', label: 'Offline / Cash / DD', icon: FileText },
];

export default function MembershipPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('lifetime');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', address: '',
    city: 'Bhopal', state: 'Madhya Pradesh', pincode: '', payment_reference: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState('');

  const plan = plans.find((p) => p.id === selectedPlan)!;

  const generateMemberId = () => {
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `SWWS-${year}-${rand}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const mId = generateMemberId();
    const validUntil = selectedPlan === 'annual' ? new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0] : null;
    const { error: err } = await supabase.from('members').insert([{
      ...form,
      membership_plan: selectedPlan,
      amount_paid: plan.price,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'offline' ? 'pending' : 'completed',
      member_id: mId,
      valid_until: validUntil,
      is_active: paymentMethod !== 'offline',
    }]);
    setLoading(false);
    if (err) { setError('Registration failed. Please try again.'); return; }
    setMemberId(mId);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full card p-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Family!</h2>
          <p className="text-gray-500 mb-6">Your membership has been registered successfully.</p>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
            <div className="text-rose-600 font-mono text-2xl font-bold mb-2">{memberId}</div>
            <div className="text-sm text-gray-600">Your Member ID</div>
          </div>
          <div className="space-y-2 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> Member ID Card will be dispatched</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> Membership Certificate via email</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> 80G receipt will be sent</div>
          </div>
          <button onClick={() => { setSuccess(false); setStep(1); setForm({ full_name: '', email: '', phone: '', address: '', city: 'Bhopal', state: 'Madhya Pradesh', pincode: '', payment_reference: '' }); }} className="btn-primary w-full">
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">Membership</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Join Samriddhi Family</h1>
          <p className="text-gray-300 text-lg">Become a member and be part of our mission to empower women</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-rose-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { icon: Users, label: 'Member ID Card' },
              { icon: FileText, label: 'Appointment Letter' },
              { icon: Award, label: 'Membership Certificate' },
              { icon: Star, label: 'Achievement Certificate' },
              { icon: CheckCircle, label: '80G Donation Receipt' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Icon className="w-6 h-6 text-rose-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s}
                </div>
                <span className={`text-sm font-medium hidden md:block ${step >= s ? 'text-gray-900' : 'text-gray-400'}`}>
                  {s === 1 ? 'Choose Plan' : s === 2 ? 'Your Details' : 'Payment'}
                </span>
                {s < 3 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-rose-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Plans */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Select Membership Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {plans.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`relative card p-6 cursor-pointer transition-all border-2 hover:-translate-y-1 ${selectedPlan === p.id ? `${p.color} ring-2 ring-rose-500` : 'border-transparent'}`}
                  >
                    {p.badge && (
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white ${p.badge === 'Premium' ? 'bg-amber-500' : 'bg-rose-600'}`}>
                        {p.badge}
                      </div>
                    )}
                    <div className="text-center mb-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
                      <div className="text-3xl font-bold text-rose-600 mb-1">₹{p.price.toLocaleString('en-IN')}</div>
                      <div className="text-sm text-gray-500">{p.duration}</div>
                    </div>
                    <ul className="space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {selectedPlan === p.id && (
                      <div className="mt-4 w-full py-2 bg-rose-600 text-white text-center rounded-lg text-sm font-medium">
                        Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button onClick={() => setStep(2)} className="btn-primary px-12">Continue with {plan.name}</button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="card p-8">
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input-field" placeholder="As on ID proof" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input type="email" className="input-field" placeholder="your@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Mobile Number *</label>
                    <input className="input-field" placeholder="+91 XXXXXXXXXX" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="label">Address</label>
                    <textarea className="input-field h-20 resize-none" placeholder="Full address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="label">City</label>
                      <input className="input-field" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">State</label>
                      <input className="input-field" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Pincode</label>
                      <input className="input-field" placeholder="462001" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                    <button type="submit" className="btn-primary flex-1">Continue to Payment</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
              <div className="card p-8">
                {/* Order Summary */}
                <div className="bg-rose-50 rounded-xl p-5 mb-6 border border-rose-100">
                  <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{plan.name} ({plan.duration})</span>
                    <span className="font-semibold">₹{plan.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="text-emerald-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t border-rose-200 pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-rose-600 text-lg">₹{plan.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <label className="label mb-3">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-sm ${paymentMethod === id ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 hover:border-rose-200 text-gray-600'}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Instructions */}
                {paymentMethod === 'upi' && (
                  <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">UPI Payment Instructions</h4>
                    <p className="text-sm text-blue-700 mb-2">Pay ₹{plan.price.toLocaleString('en-IN')} to:</p>
                    <div className="font-mono bg-white border border-blue-200 rounded-lg px-4 py-2 text-blue-900 font-bold">samriddhi.welfare@upi</div>
                    <p className="text-xs text-blue-600 mt-2">After payment, enter the UTR/Transaction ID below</p>
                  </div>
                )}
                {paymentMethod === 'netbanking' && (
                  <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Bank Account Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-blue-700">Account Name:</span><span className="font-semibold">Samriddhi Women Welfare Society</span>
                      <span className="text-blue-700">Account No:</span><span className="font-mono font-bold">123456789012</span>
                      <span className="text-blue-700">IFSC Code:</span><span className="font-mono font-bold">SBIN0001234</span>
                      <span className="text-blue-700">Bank:</span><span className="font-semibold">State Bank of India</span>
                    </div>
                  </div>
                )}
                {paymentMethod === 'offline' && (
                  <div className="bg-amber-50 rounded-xl p-5 mb-6 border border-amber-100">
                    <h4 className="font-bold text-amber-900 mb-2">Offline Payment</h4>
                    <p className="text-sm text-amber-700">Visit our office in Bhopal or pay via DD/Cheque in favor of "Samriddhi Women Welfare Society". Your membership will be activated after verification.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {paymentMethod !== 'offline' && (
                    <div>
                      <label className="label">Transaction / UTR Reference Number *</label>
                      <input className="input-field" placeholder="Enter payment reference number" required value={form.payment_reference} onChange={(e) => setForm({ ...form, payment_reference: e.target.value })} />
                    </div>
                  )}
                  {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}
                  <div className="flex gap-4 pt-2">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
                      {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : null}
                      {loading ? 'Processing...' : `Confirm Registration - ₹${plan.price.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center">By registering, you agree to our terms and conditions</p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
