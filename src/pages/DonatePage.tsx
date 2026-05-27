import { useState } from 'react';
import { CheckCircle, Heart, CreditCard, Smartphone, Building2, FileText, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';

const donationAmounts = [500, 1000, 2100, 5000, 11000, 21000];
const purposes = [
  'General Donation',
  'Girls Education',
  'Women Health Camp',
  'Skill Development',
  'Rural Outreach',
  'Legal Aid Fund',
  'Child Nutrition',
  'Specific Campaign',
];
const paymentMethods = [
  { id: 'upi', label: 'UPI / GPay / PhonePe', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking / RTGS / NEFT', icon: Building2 },
  { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
  { id: 'cheque', label: 'Cheque / DD', icon: FileText },
];

export default function DonatePage() {
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [form, setForm] = useState({
    donor_name: '', email: '', phone: '',
    pan_number: '', address: '',
    donation_purpose: 'General Donation',
    payment_reference: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [receiptNo, setReceiptNo] = useState('');
  const [error, setError] = useState('');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const generateReceiptNo = () => {
    const d = new Date();
    return `SWWS-DON-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}-${Math.floor(10000 + Math.random() * 90000)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) { setError('Please enter a valid amount.'); return; }
    setLoading(true);
    setError('');
    const rNo = generateReceiptNo();
    const { error: err } = await supabase.from('donations').insert([{
      ...form,
      amount: finalAmount,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cheque' ? 'pending' : 'completed',
      receipt_number: rNo,
      is_80g_eligible: true,
    }]);
    setLoading(false);
    if (err) { setError('Donation submission failed. Please try again.'); return; }
    setReceiptNo(rNo);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full card p-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-emerald-600 fill-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Donation!</h2>
          <p className="text-gray-500 mb-2">Your generosity helps us empower more women.</p>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
            <div className="text-2xl font-bold text-rose-600 mb-1">₹{finalAmount.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-500 mb-3">Amount Donated</div>
            <div className="font-mono text-sm bg-white border border-rose-100 rounded-lg px-3 py-2">{receiptNo}</div>
            <div className="text-xs text-gray-500 mt-1">Receipt Number (80G)</div>
          </div>
          <div className="space-y-2 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> 80G receipt will be emailed to you</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> Tax exemption certificate attached</div>
            <div className="flex items-center gap-2 justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /> Impact report will be shared quarterly</div>
          </div>
          <button onClick={() => { setSuccess(false); setForm({ donor_name: '', email: '', phone: '', pan_number: '', address: '', donation_purpose: 'General Donation', payment_reference: '' }); setCustomAmount(''); }} className="btn-primary w-full">
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-rose-700 to-gray-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Donate & Make a Difference</h1>
          <p className="text-rose-100 text-lg mb-4">Your donation is eligible for 50% tax deduction under Section 80G</p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/20">
            <Shield className="w-4 h-4" /> 100% Secure | 80G & 12A Certified NGO
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount */}
                <div className="card p-7">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Select Donation Amount</h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setSelectedAmount(a); setCustomAmount(''); }}
                        className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${!customAmount && selectedAmount === a ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300 hover:text-rose-600'}`}
                      >
                        ₹{a.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="label">Or Enter Custom Amount (₹)</label>
                    <input
                      type="number"
                      min="100"
                      className="input-field"
                      placeholder="Enter amount (minimum ₹100)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Purpose */}
                <div className="card p-7">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Donation Purpose</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {purposes.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setForm({ ...form, donation_purpose: p })}
                        className={`py-2.5 px-3 rounded-lg text-xs font-medium border-2 transition-all text-left ${form.donation_purpose === p ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-white border-gray-200 text-gray-600 hover:border-rose-200'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="card p-7">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Donor Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input className="input-field" placeholder="As per PAN card" required value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Email *</label>
                        <input type="email" className="input-field" placeholder="your@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Mobile *</label>
                        <input className="input-field" placeholder="+91 XXXXXXXXXX" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">PAN Number (for 80G)</label>
                        <input className="input-field" placeholder="ABCDE1234F" value={form.pan_number} onChange={(e) => setForm({ ...form, pan_number: e.target.value.toUpperCase() })} />
                      </div>
                    </div>
                    <div>
                      <label className="label">Address</label>
                      <textarea className="input-field h-20 resize-none" placeholder="Full address for 80G receipt" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="card p-7">
                  <h2 className="text-xl font-bold text-gray-900 mb-5">Payment Method</h2>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {paymentMethods.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-sm ${paymentMethod === id ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-gray-200 hover:border-rose-200 text-gray-600'}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100 text-sm">
                      <p className="font-medium text-blue-900 mb-1">Pay via UPI:</p>
                      <span className="font-mono font-bold text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-lg block">samriddhi.welfare@upi</span>
                    </div>
                  )}
                  {paymentMethod === 'netbanking' && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100 text-sm space-y-1">
                      <p className="font-medium text-blue-900 mb-2">Bank Transfer Details:</p>
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-blue-700">Account:</span><span className="font-semibold">Samriddhi Women Welfare Society</span>
                        <span className="text-blue-700">Account No:</span><span className="font-mono">123456789012</span>
                        <span className="text-blue-700">IFSC:</span><span className="font-mono">SBIN0001234</span>
                        <span className="text-blue-700">Bank:</span><span>SBI Bhopal</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod !== 'cheque' && (
                    <div>
                      <label className="label">Transaction / Reference Number *</label>
                      <input className="input-field" placeholder="Enter payment reference" required value={form.payment_reference} onChange={(e) => setForm({ ...form, payment_reference: e.target.value })} />
                    </div>
                  )}

                  {error && <div className="mt-3 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}

                  <button type="submit" disabled={loading} className="mt-5 btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
                    {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <Heart className="w-5 h-5 fill-white" />}
                    {loading ? 'Processing...' : `Donate ₹${(finalAmount || 0).toLocaleString('en-IN')}`}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Donation Summary</h3>
                <div className="text-4xl font-bold text-rose-600 mb-1">₹{(finalAmount || 0).toLocaleString('en-IN')}</div>
                <div className="text-sm text-gray-500 mb-4">{form.donation_purpose}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax Savings (80G)</span>
                    <span className="text-emerald-600 font-medium">~₹{Math.round((finalAmount || 0) * 0.25).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Net Cost to You</span>
                    <span className="font-bold">₹{Math.round((finalAmount || 0) * 0.75).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="card p-6 bg-emerald-50 border-emerald-100">
                <h3 className="font-bold text-emerald-900 mb-3">Tax Benefits</h3>
                <div className="space-y-2 text-sm text-emerald-700">
                  <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> 50% deduction under Section 80G</div>
                  <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Receipt sent within 24 hours</div>
                  <div className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> Valid for IT return filing</div>
                </div>
              </div>

              {/* Impact */}
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Impact</h3>
                <div className="space-y-3">
                  {[
                    { amount: 500, impact: 'Provide stationery to 1 girl' },
                    { amount: 1000, impact: 'Fund 1 health camp checkup' },
                    { amount: 5000, impact: 'Skill training for 1 woman' },
                    { amount: 11000, impact: 'Scholarship for 1 girl/year' },
                  ].map(({ amount, impact }) => (
                    <div key={amount} className={`flex gap-3 p-3 rounded-xl text-sm transition-colors ${finalAmount >= amount ? 'bg-rose-50 border border-rose-100' : 'bg-gray-50'}`}>
                      <span className={`font-bold min-w-[70px] ${finalAmount >= amount ? 'text-rose-600' : 'text-gray-400'}`}>₹{amount.toLocaleString('en-IN')}</span>
                      <span className={finalAmount >= amount ? 'text-gray-700' : 'text-gray-400'}>{impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
