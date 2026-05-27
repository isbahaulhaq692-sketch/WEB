import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Heart, Image, MessageSquare, GraduationCap,
  TrendingUp, Settings, LogOut, Menu, X, Plus, Trash2, CheckCircle,
  Upload, Eye, BarChart3, DollarSign, UserCheck, Megaphone
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'donations', label: 'Donations', icon: Heart },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
  { id: 'internships', label: 'Internships', icon: GraduationCap },
  { id: 'beneficiaries', label: 'Beneficiaries', icon: UserCheck },
  { id: 'expenses', label: 'Expenses', icon: DollarSign },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'programs', label: 'Programs', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ members: 0, donations: 0, enquiries: 0, beneficiaries: 0, totalDonations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [members, donations, enquiries, beneficiaries] = await Promise.all([
        supabase.from('members').select('id', { count: 'exact' }),
        supabase.from('donations').select('amount'),
        supabase.from('enquiries').select('id', { count: 'exact' }),
        supabase.from('beneficiaries').select('id', { count: 'exact' }),
      ]);
      const total = (donations.data || []).reduce((s, d) => s + Number(d.amount), 0);
      setStats({
        members: members.count || 0,
        donations: (donations.data || []).length,
        enquiries: enquiries.count || 0,
        beneficiaries: beneficiaries.count || 0,
        totalDonations: total,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex pt-0">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">SWWS Admin</div>
              <div className="text-gray-400 text-xs">Management Panel</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === id ? 'bg-rose-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg capitalize">{activeTab}</h1>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden md:block">Samriddhi Women Welfare Society</span>
            <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
              <span className="text-rose-600 font-bold text-xs">AD</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === 'dashboard' && <DashboardTab stats={stats} setActiveTab={setActiveTab} />}
          {activeTab === 'members' && <MembersTab />}
          {activeTab === 'donations' && <DonationsTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'enquiries' && <EnquiriesTab />}
          {activeTab === 'internships' && <InternshipsTab />}
          {activeTab === 'beneficiaries' && <BeneficiariesTab />}
          {activeTab === 'expenses' && <ExpensesTab />}
          {activeTab === 'campaigns' && <CampaignsTab />}
          {activeTab === 'programs' && <ProgramsTab />}
          {activeTab === 'reports' && <ReportsTab stats={stats} />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ stats, setActiveTab }: { stats: any; setActiveTab: (t: string) => void }) {
  const cards = [
    { label: 'Total Members', value: stats.members, icon: Users, color: 'bg-blue-50 text-blue-600', tab: 'members' },
    { label: 'Total Donations', value: stats.donations, icon: Heart, color: 'bg-rose-50 text-rose-600', tab: 'donations' },
    { label: 'Amount Collected', value: `₹${Number(stats.totalDonations).toLocaleString('en-IN')}`, icon: DollarSign, color: 'bg-emerald-50 text-emerald-600', tab: 'donations' },
    { label: 'Pending Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'bg-amber-50 text-amber-600', tab: 'enquiries' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {cards.map(({ label, value, icon: Icon, color, tab }) => (
          <button key={label} onClick={() => setActiveTab(tab)} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all text-left group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Gallery Photo', icon: Image, tab: 'gallery' },
            { label: 'View Members', icon: Users, tab: 'members' },
            { label: 'View Donations', icon: Heart, tab: 'donations' },
            { label: 'Read Enquiries', icon: MessageSquare, tab: 'enquiries' },
          ].map(({ label, icon: Icon, tab }) => (
            <button key={label} onClick={() => setActiveTab(tab)} className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all text-sm font-medium text-gray-600">
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Members Tab
function MembersTab() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.from('members').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setMembers(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = members.filter((m) =>
    m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.member_id?.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, is_active: boolean) => {
    await supabase.from('members').update({ is_active, payment_status: is_active ? 'completed' : 'pending' }).eq('id', id);
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, is_active, payment_status: is_active ? 'completed' : 'pending' } : m));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input className="input-field flex-1" placeholder="Search by name, email, member ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="text-sm text-gray-500 flex items-center">{filtered.length} members</div>
      </div>
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Member ID', 'Name', 'Email', 'Phone', 'Plan', 'Amount', 'Status', 'Date', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-8 text-gray-400">No members found</td></tr>
                ) : filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-rose-600">{m.member_id}</td>
                    <td className="px-4 py-3 font-medium">{m.full_name}</td>
                    <td className="px-4 py-3 text-gray-500">{m.email}</td>
                    <td className="px-4 py-3">{m.phone}</td>
                    <td className="px-4 py-3 capitalize">{m.membership_plan}</td>
                    <td className="px-4 py-3 font-semibold">₹{Number(m.amount_paid).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {m.is_active ? 'Active' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(m.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateStatus(m.id, !m.is_active)}
                        className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${m.is_active ? 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}
                      >
                        {m.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Donations Tab
function DonationsTab() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase.from('donations').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setDonations(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = donations.filter((d) =>
    d.donor_name?.toLowerCase().includes(search.toLowerCase()) ||
    d.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = filtered.reduce((s, d) => s + Number(d.amount), 0);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-5 items-center">
        <input className="input-field flex-1" placeholder="Search by name, email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 text-sm font-semibold text-emerald-700">
          Total: ₹{totalAmount.toLocaleString('en-IN')}
        </div>
      </div>
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Receipt No', 'Donor', 'Email', 'Amount', 'Purpose', 'Method', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8 text-gray-400">No donations found</td></tr>
                ) : filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-rose-600">{d.receipt_number}</td>
                    <td className="px-4 py-3 font-medium">{d.donor_name}</td>
                    <td className="px-4 py-3 text-gray-500">{d.email}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">₹{Number(d.amount).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-xs">{d.donation_purpose}</td>
                    <td className="px-4 py-3 capitalize text-xs">{d.payment_method}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.payment_status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {d.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(d.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Gallery Tab
function GalleryTab() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image_url: '', category: 'activities', is_featured: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = () => {
    supabase.from('gallery').select('*').order('display_order').then(({ data }) => {
      setGallery(data || []);
      setLoading(false);
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('gallery').insert([form]);
    setSaving(false);
    setAdding(false);
    setForm({ title: '', description: '', image_url: '', category: 'activities', is_featured: false });
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    loadGallery();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-500">{gallery.length} photos</span>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {adding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Add New Photo</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Title *</label>
              <input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {['activities', 'training', 'health', 'education', 'outreach', 'events'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">Image URL *</label>
              <input className="input-field" placeholder="https://..." required value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <p className="text-xs text-gray-400 mt-1">Use image hosting services like Imgur, Cloudinary, or Pexels</p>
            </div>
            <div>
              <label className="label">Description</label>
              <input className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" id="featured" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 accent-rose-600" />
              <label htmlFor="featured" className="text-sm text-gray-700">Mark as Featured</label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                {saving ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <Upload className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Photo'}
              </button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-40">
                <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400'; }} />
                {img.is_featured && <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full">Featured</div>}
                <button onClick={() => handleDelete(img.id)} className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="p-3">
                <p className="font-medium text-gray-900 text-sm truncate">{img.title}</p>
                <p className="text-xs text-gray-400 capitalize">{img.category}</p>
              </div>
            </div>
          ))}
          {gallery.length === 0 && <div className="col-span-4 text-center py-12 text-gray-400">No photos yet. Add some!</div>}
        </div>
      )}
    </div>
  );
}

// Enquiries Tab
function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    supabase.from('enquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setEnquiries(data || []);
      setLoading(false);
    });
  }, []);

  const markRead = async (id: string) => {
    await supabase.from('enquiries').update({ status: 'read' }).eq('id', id);
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, status: 'read' } : e));
  };

  return (
    <div>
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-900">{enquiries.length} Enquiries</div>
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {enquiries.map((e) => (
                <button
                  key={e.id}
                  onClick={() => { setSelected(e); markRead(e.id); }}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected?.id === e.id ? 'bg-rose-50' : ''}`}
                >
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{e.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === 'new' ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>{e.status}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{e.subject || e.enquiry_type}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(e.created_at).toLocaleDateString('en-IN')}</p>
                </button>
              ))}
              {enquiries.length === 0 && <p className="text-center py-8 text-gray-400 text-sm">No enquiries</p>}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {selected ? (
              <>
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{selected.name}</h3>
                  <span className="text-xs text-gray-400">{new Date(selected.created_at).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selected.email}</span></div>
                  <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selected.phone || 'N/A'}</span></div>
                  <div><span className="text-gray-500">Type:</span> <span className="capitalize font-medium">{selected.enquiry_type}</span></div>
                  {selected.subject && <div><span className="text-gray-500">Subject:</span> <span className="font-medium">{selected.subject}</span></div>}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                <MessageSquare className="w-12 h-12 mb-3" />
                <p>Select an enquiry to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Internships Tab
function InternshipsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('internships').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setItems(data || []);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('internships').update({ status }).eq('id', id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };

  return (
    <div>
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Field', 'Duration', 'Status', 'Date', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8 text-gray-400">No applications</td></tr>
                ) : items.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{i.applicant_name}</td>
                    <td className="px-4 py-3 text-gray-500">{i.email}</td>
                    <td className="px-4 py-3">{i.phone}</td>
                    <td className="px-4 py-3 text-xs">{i.field_of_interest}</td>
                    <td className="px-4 py-3 capitalize text-xs">{i.duration?.replace('_', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${i.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : i.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {i.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(i.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus(i.id, 'approved')} className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200">Approve</button>
                        <button onClick={() => updateStatus(i.id, 'rejected')} className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Beneficiaries Tab
function BeneficiariesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: 'female', contact: '', address: '', benefit_type: '', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('beneficiaries').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setItems(data || []);
      setLoading(false);
    });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('beneficiaries').insert([{ ...form, age: form.age ? parseInt(form.age) : null }]);
    setSaving(false);
    setAdding(false);
    setForm({ name: '', age: '', gender: 'female', contact: '', address: '', benefit_type: '', notes: '' });
    supabase.from('beneficiaries').select('*').order('created_at', { ascending: false }).then(({ data }) => setItems(data || []));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-500">{items.length} beneficiaries</span>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
          <Plus className="w-4 h-4" /> Add Beneficiary
        </button>
      </div>
      {adding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="label">Name *</label><input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="label">Age</label><input type="number" className="input-field" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></div>
            <div><label className="label">Gender</label><select className="input-field" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></div>
            <div><label className="label">Contact</label><input className="input-field" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
            <div><label className="label">Benefit Type</label><input className="input-field" placeholder="e.g., Scholarship, Health" value={form.benefit_type} onChange={(e) => setForm({ ...form, benefit_type: e.target.value })} /></div>
            <div><label className="label">Address</label><input className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div className="md:col-span-3 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
                {saving ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : <CheckCircle className="w-4 h-4" />}
                Save
              </button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name', 'Age', 'Gender', 'Contact', 'Benefit Type', 'Date'].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length === 0 ? <tr><td colSpan={6} className="text-center py-8 text-gray-400">No beneficiaries</td></tr>
                  : items.map((i) => (
                    <tr key={i.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{i.name}</td>
                      <td className="px-4 py-3">{i.age || '-'}</td>
                      <td className="px-4 py-3 capitalize">{i.gender}</td>
                      <td className="px-4 py-3">{i.contact}</td>
                      <td className="px-4 py-3">{i.benefit_type}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(i.created_at).toLocaleDateString('en-IN')}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Expenses Tab
function ExpensesTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', amount: '', category: 'operations', description: '', expense_date: new Date().toISOString().split('T')[0] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('expenses').select('*').order('expense_date', { ascending: false }).then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('expenses').insert([{ ...form, amount: parseFloat(form.amount) }]);
    setSaving(false);
    setAdding(false);
    setForm({ title: '', amount: '', category: 'operations', description: '', expense_date: new Date().toISOString().split('T')[0] });
    supabase.from('expenses').select('*').order('expense_date', { ascending: false }).then(({ data }) => setItems(data || []));
  };

  const total = items.reduce((s, i) => s + Number(i.amount), 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 text-sm font-semibold text-rose-700">Total: ₹{total.toLocaleString('en-IN')}</div>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"><Plus className="w-4 h-4" /> Add Expense</button>
      </div>
      {adding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="label">Title *</label><input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><label className="label">Amount *</label><input type="number" className="input-field" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
            <div><label className="label">Category</label><select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{['operations', 'programs', 'salaries', 'travel', 'equipment', 'marketing'].map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="label">Date</label><input type="date" className="input-field" value={form.expense_date} onChange={(e) => setForm({ ...form, expense_date: e.target.value })} /></div>
            <div><label className="label">Description</label><input className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex gap-3 items-end">
              <button type="submit" disabled={saving} className="btn-primary text-sm flex items-center gap-1">{saving ? '...' : 'Save'}</button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Title', 'Amount', 'Category', 'Date', 'Description'].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.length === 0 ? <tr><td colSpan={5} className="text-center py-8 text-gray-400">No expenses</td></tr>
                  : items.map((i) => (
                    <tr key={i.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{i.title}</td>
                      <td className="px-4 py-3 font-bold text-rose-600">₹{Number(i.amount).toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 capitalize text-xs">{i.category}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(i.expense_date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{i.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Campaigns Tab
function CampaignsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', goal_amount: '', end_date: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('crowdfunding_campaigns').select('*').order('created_at', { ascending: false }).then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('crowdfunding_campaigns').insert([{ ...form, goal_amount: parseFloat(form.goal_amount) }]);
    setSaving(false);
    setAdding(false);
    setForm({ title: '', description: '', goal_amount: '', end_date: '' });
    supabase.from('crowdfunding_campaigns').select('*').order('created_at', { ascending: false }).then(({ data }) => setItems(data || []));
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await supabase.from('crowdfunding_campaigns').update({ is_active: !is_active }).eq('id', id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, is_active: !is_active } : i));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-500">{items.length} campaigns</span>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"><Plus className="w-4 h-4" /> New Campaign</button>
      </div>
      {adding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><label className="label">Campaign Title *</label><input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><label className="label">Goal Amount (₹) *</label><input type="number" className="input-field" required value={form.goal_amount} onChange={(e) => setForm({ ...form, goal_amount: e.target.value })} /></div>
            <div><label className="label">End Date</label><input type="date" className="input-field" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} /></div>
            <div className="md:col-span-2"><label className="label">Description</label><textarea className="input-field h-20 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Create'}</button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((c) => {
            const pct = Math.min(100, Math.round((c.raised_amount / c.goal_amount) * 100));
            return (
              <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{c.title}</h3>
                  <button onClick={() => toggleActive(c.id, c.is_active)} className={`text-xs px-3 py-1 rounded-full font-medium ${c.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{c.is_active ? 'Active' : 'Inactive'}</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">{c.description}</p>
                <div className="h-2 bg-gray-200 rounded-full mb-2"><div className="h-full bg-rose-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-semibold">₹{Number(c.raised_amount).toLocaleString('en-IN')} raised</span>
                  <span className="text-gray-500">of ₹{Number(c.goal_amount).toLocaleString('en-IN')} ({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Programs Tab
function ProgramsTab() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: 'women_empowerment', location: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('programs').select('*').order('display_order').then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from('programs').insert([form]);
    setSaving(false);
    setAdding(false);
    setForm({ title: '', description: '', category: 'women_empowerment', location: '' });
    supabase.from('programs').select('*').order('display_order').then(({ data }) => setItems(data || []));
  };

  const toggleActive = async (id: string, is_active: boolean) => {
    await supabase.from('programs').update({ is_active: !is_active }).eq('id', id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, is_active: !is_active } : i));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-500">{items.length} programs</span>
        <button onClick={() => setAdding(!adding)} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm"><Plus className="w-4 h-4" /> Add Program</button>
      </div>
      {adding && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">Program Title *</label><input className="input-field" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><label className="label">Category</label><select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{['women_empowerment', 'education', 'health', 'skill_development', 'legal_support', 'rural_development'].map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}</select></div>
            <div className="md:col-span-2"><label className="label">Description</label><textarea className="input-field h-20 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><label className="label">Location</label><input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
            <div className="flex gap-3 items-end">
              <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => setAdding(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <div className="text-center py-12 text-gray-400">Loading...</div> : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Title', 'Category', 'Location', 'Status', 'Action'].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 capitalize text-xs text-gray-500">{p.category?.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.location}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{p.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-4 py-3"><button onClick={() => toggleActive(p.id, p.is_active)} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-rose-100 hover:text-rose-600">{p.is_active ? 'Deactivate' : 'Activate'}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Reports Tab
function ReportsTab({ stats }: { stats: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-5">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Total Donations Received</span><span className="font-bold text-emerald-600">₹{Number(stats.totalDonations).toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Number of Donors</span><span className="font-bold">{stats.donations}</span></div>
            <div className="flex justify-between py-3"><span className="text-gray-600">Active Members</span><span className="font-bold">{stats.members}</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-5">Activity Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Total Beneficiaries</span><span className="font-bold text-blue-600">{stats.beneficiaries}</span></div>
            <div className="flex justify-between py-3 border-b"><span className="text-gray-600">Pending Enquiries</span><span className="font-bold text-amber-600">{stats.enquiries}</span></div>
            <div className="flex justify-between py-3"><span className="text-gray-600">Registered Members</span><span className="font-bold">{stats.members}</span></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-3">Export Reports</h3>
        <p className="text-sm text-gray-500 mb-4">Download data for offline analysis or printing</p>
        <div className="flex flex-wrap gap-3">
          {['Members Report', 'Donations Report', 'Beneficiaries Report', 'Expense Report'].map((r) => (
            <button key={r} className="btn-secondary py-2 px-4 text-sm">{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const s: Record<string, string> = {};
        data.forEach((row) => { s[row.key] = row.value; });
        setSettings(s);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fields = [
    { key: 'phone1', label: 'Primary Phone' },
    { key: 'phone2', label: 'Secondary Phone' },
    { key: 'email', label: 'Contact Email' },
    { key: 'address', label: 'Address' },
    { key: 'registration_no', label: 'Registration Number' },
    { key: '80g_no', label: '80G Certificate No' },
    { key: '12a_no', label: '12A Number' },
    { key: 'facebook', label: 'Facebook URL' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'youtube', label: 'YouTube URL' },
  ];

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-5">Site Settings</h3>
        <div className="space-y-4 mb-6">
          {fields.map(({ key, label }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                className="input-field"
                value={settings[key] || ''}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : saved ? <CheckCircle className="w-4 h-4" /> : null}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
