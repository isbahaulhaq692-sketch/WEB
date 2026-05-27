import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />;
  }

  return <AdminDashboard onLogout={() => supabase.auth.signOut()} />;
}
