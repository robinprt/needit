import { useState } from 'react';
import { Shirt, Plus, Filter, AlertTriangle, Search, Trash2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import type { ClothingCategory } from '../types';
import { Link } from 'react-router-dom';

export default function Wardrobe() {
  const { wardrobe, removeClothingItem } = useAppStore();
  const [filter, setFilter] = useState<ClothingCategory | 'tous'>('tous');
  const [search, setSearch] = useState('');

  const filteredWardrobe = wardrobe
    .filter(item => filter === 'tous' || item.category === filter)
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()) || item.brand.toLowerCase().includes(search.toLowerCase()));

  // Identify potential duplicates across the entire wardrobe to badge them
  const duplicatesMap = new Map();
  wardrobe.forEach(item => {
    const key = `${item.category}-${item.color.toLowerCase()}`;
    duplicatesMap.set(key, (duplicatesMap.get(key) || 0) + 1);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1F1F1F]">Mon Dressing</h1>
          <p className="text-[#6B6B6B] mt-1">{wardrobe.length} pièces dans ton armoire</p>
        </div>
        <Link to="/tester" className="bg-[#0F3D2E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0F3D2E]/90 transition-all flex items-center gap-2">
          <Plus size={20} />
          Ajouter
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher (ex: T-shirt noir)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#E8E6DE] rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
          <Filter className="text-[#6B6B6B] shrink-0 mr-2" size={20} />
          {['tous', 't-shirt', 'pantalon', 'veste', 'chaussures', 'robe', 'autre'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
                filter === cat 
                  ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]' 
                  : 'bg-white text-[#6B6B6B] border-[#E8E6DE] hover:bg-[#F7F5EF]'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredWardrobe.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E6DE] shadow-sm flex flex-col items-center">
          <Shirt size={48} className="text-[#E8E6DE] mb-4" />
          <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">Aucun vêtement trouvé</h3>
          <p className="text-[#6B6B6B]">Essaie de modifier tes filtres ou ajoute un nouveau vêtement.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWardrobe.map(item => {
            const isDuplicate = duplicatesMap.get(`${item.category}-${item.color.toLowerCase()}`) > 1;
            
            return (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-[#E8E6DE] shadow-sm hover:shadow-md transition-shadow relative group">
                <button 
                  onClick={() => removeClothingItem(item.id)}
                  className="absolute top-4 right-4 text-[#E8E6DE] hover:text-[#F3B08C] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#F7F5EF] text-[#6B6B6B] text-xs font-semibold rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.type === 'seconde main' && (
                    <span className="px-3 py-1 bg-[#E8F3E7] text-[#0F3D2E] text-xs font-semibold rounded-full">
                      Seconde main
                    </span>
                  )}
                  {item.wornCount < 5 && (
                    <span className="px-3 py-1 bg-[#FFF5F0] text-[#D47C4A] text-xs font-semibold rounded-full">
                      Peu porté
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-[#1F1F1F] mb-1">{item.name}</h3>
                <p className="text-[#6B6B6B] text-sm mb-4">{item.brand} • {item.price} €</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E8E6DE]">
                  <div className="text-sm">
                    <strong className="text-[#1F1F1F]">{item.wornCount}</strong> <span className="text-[#6B6B6B]">ports</span>
                  </div>
                  <div className="text-sm text-[#6B6B6B]">
                    ~{Math.round(item.price / (item.wornCount || 1))} € / port
                  </div>
                </div>

                {isDuplicate && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFF5F0] border border-[#F3B08C] text-[#D47C4A] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-sm">
                    <AlertTriangle size={12} />
                    Doublon détecté
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
