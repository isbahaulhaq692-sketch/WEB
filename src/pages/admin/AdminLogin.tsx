import { useState } from 'react';
import { Lock, Heart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError('Invalid email or password.'); return; }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-gray-400 text-sm">Samriddhi Women Welfare Society</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-bold text-gray-900">Secure Login</h2>
          </div>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input type="email" className="input-field" placeholder="admin@samriddhiwomenswelfare.org" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input-field" placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
