import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';

const defaultGallery = [
  { id: '1', title: 'Skill Training Camp', category: 'training', image_url: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true },
  { id: '2', title: 'Women Empowerment Workshop', category: 'workshops', image_url: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: true },
  { id: '3', title: 'Health Camp Bhopal', category: 'health', image_url: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '4', title: 'Rural Outreach Program', category: 'outreach', image_url: 'https://images.pexels.com/photos/6646916/pexels-photo-6646916.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '5', title: 'Education Support Drive', category: 'education', image_url: 'https://images.pexels.com/photos/8923153/pexels-photo-8923153.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '6', title: 'Legal Aid Camp', category: 'legal', image_url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '7', title: 'Scholarship Distribution', category: 'education', image_url: 'https://images.pexels.com/photos/8923145/pexels-photo-8923145.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '8', title: 'Vocational Training', category: 'training', image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
  { id: '9', title: 'Community Awareness', category: 'outreach', image_url: 'https://images.pexels.com/photos/6647035/pexels-photo-6647035.jpeg?auto=compress&cs=tinysrgb&w=800', is_featured: false },
];

export default function GalleryPage() {
  const [gallery, setGallery] = useState(defaultGallery);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    supabase.from('gallery').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setGallery(data as any);
    });
  }, []);

  const categories = ['all', ...Array.from(new Set(gallery.map((g) => g.category)))];
  const filtered = activeFilter === 'all' ? gallery : gallery.filter((g) => g.category === activeFilter);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightbox((i) => (i !== null ? (i + 1) % filtered.length : null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-rose-400 font-semibold text-sm uppercase tracking-widest mb-4">Photo Gallery</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Our Activities in Pictures</h1>
          <p className="text-gray-300 text-lg">Capturing moments of transformation and empowerment</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeFilter === cat
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-white/70 text-xs capitalize">{item.category}</p>
                  </div>
                </div>
                {item.is_featured && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-full">Featured</div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">No images in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fadeIn"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-3"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-3"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[85vh] mx-auto px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox]?.image_url}
              alt={filtered[lightbox]?.title}
              className="max-h-[75vh] object-contain mx-auto rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium">{filtered[lightbox]?.title}</p>
              <p className="text-gray-400 text-sm capitalize">{filtered[lightbox]?.category}</p>
              <p className="text-gray-500 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
