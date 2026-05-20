import { Leaf, Gift, Clock, History, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';

const PARTNERS = [
  { name: 'ReWear Market', type: 'Seconde main', offer: '5% de cashback sur les achats responsables', score: 92 },
  { name: 'GreenFix', type: 'Réparation textile', offer: '3 € offerts pour une réparation', score: 88 },
  { name: 'SlowMode', type: 'Marque responsable', offer: '7% de cashback sur les vêtements durables', score: 84 },
  { name: 'Local Frip', type: 'Friperie locale', offer: '5% de cashback en boutique', score: 90 },
  { name: 'RentFit', type: 'Location de vêtements', offer: '4% de cashback sur la location', score: 86 }
];

export default function Cashback() {
  const { stats, cashbackHistory } = useAppStore();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F1F1F]">Green Cashback</h1>
          <p className="text-[#6B6B6B] mt-1">Tes choix responsables sont récompensés</p>
        </div>
        <Link to="/recompenses" className="hidden sm:flex text-[#0F3D2E] font-medium items-center gap-2 hover:underline">
          <Gift size={20} />
          Voir mes badges
        </Link>
      </div>

      {/* Balance Card */}
      <div className="bg-[#0F3D2E] text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf size={160} />
        </div>
        <div className="relative z-10">
          <div className="text-sm font-semibold text-[#8FAF8D] uppercase tracking-widest mb-2">Solde Actuel</div>
          <div className="text-5xl md:text-7xl font-bold mb-6">
            {stats.greenCashback.toFixed(2)} <span className="text-3xl">€</span>
          </div>
          <button className="bg-white text-[#0F3D2E] px-8 py-4 rounded-xl font-bold hover:bg-[#F7F5EF] transition-all shadow-md">
            Utiliser mon cashback
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* History */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <History size={24} className="text-[#1F1F1F]" />
            <h2 className="text-2xl font-bold text-[#1F1F1F]">Historique</h2>
          </div>

          <div className="space-y-4">
            {cashbackHistory.length === 0 ? (
              <p className="text-[#6B6B6B]">Aucun gain pour le moment.</p>
            ) : (
              cashbackHistory.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-4 rounded-2xl bg-[#F7F5EF]">
                  <div>
                    <div className="font-bold text-[#1F1F1F]">{entry.reason}</div>
                    <div className="text-sm text-[#6B6B6B] flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      {entry.partner && ` • ${entry.partner}`}
                    </div>
                  </div>
                  <div className="font-bold text-[#0F3D2E] text-lg">
                    +{entry.amount.toFixed(2)} €
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Partners */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8E6DE] shadow-sm">
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Où utiliser le cashback ?</h2>
          
          <div className="space-y-4">
            {PARTNERS.map((partner, index) => (
              <div key={index} className="group border border-[#E8E6DE] p-4 rounded-2xl hover:border-[#0F3D2E] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#1F1F1F] group-hover:text-[#0F3D2E] transition-colors">{partner.name}</h3>
                    <div className="text-sm text-[#6B6B6B]">{partner.type}</div>
                  </div>
                  <div className="bg-[#E8F3E7] text-[#0F3D2E] text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    Score: {partner.score}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm font-medium text-[#1F1F1F]">{partner.offer}</div>
                  <ExternalLink size={16} className="text-[#6B6B6B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
