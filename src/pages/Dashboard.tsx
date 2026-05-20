import { ShieldCheck, Target, TrendingDown, Leaf, PauseCircle, CheckCircle2, Wallet, Award } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { stats, wardrobe, purchaseHistory } = useAppStore();

  const percentageWornRegularly = wardrobe.length 
    ? Math.round((wardrobe.filter(w => w.wornCount >= 5).length / wardrobe.length) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Dashboard</h1>
        <p className="text-[#6B6B6B] mt-1">Ton impact et tes statistiques d'achat</p>
      </div>

      {/* Global Score Card */}
      <div className="bg-[#0F3D2E] rounded-[2rem] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg">
        <div className="flex-1">
          <div className="text-sm font-semibold text-[#8FAF8D] uppercase tracking-widest mb-2">Score Global NeedIt</div>
          <div className="text-6xl font-bold mb-4">{stats.globalScore}<span className="text-2xl text-white/60">/100</span></div>
          <p className="text-white/80 max-w-md leading-relaxed">
            Ton dressing est plutôt maîtrisé. Tu pourrais encore réduire les achats occasionnels et mieux utiliser certaines pièces.
          </p>
        </div>
        <div className="shrink-0">
          <div className="w-32 h-32 rounded-full border-8 border-[#8FAF8D] flex items-center justify-center relative">
            <ShieldCheck size={48} className="text-[#8FAF8D]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
            <Target size={20} className="text-[#0F3D2E]" />
            <h3 className="font-bold">Achats Testés</h3>
          </div>
          <div className="text-4xl font-bold text-[#1F1F1F] mb-2">{stats.testedPurchases}</div>
          <div className="text-sm text-[#6B6B6B]">Vêtements passés au Score Besoin</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
            <CheckCircle2 size={20} className="text-[#A7C9A4]" />
            <h3 className="font-bold">Achats Évités</h3>
          </div>
          <div className="text-4xl font-bold text-[#1F1F1F] mb-2">{stats.avoidedPurchases}</div>
          <div className="text-sm text-[#6B6B6B]">Achats impulsifs annulés</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
            <PauseCircle size={20} className="text-[#F3B08C]" />
            <h3 className="font-bold">Mis en pause</h3>
          </div>
          <div className="text-4xl font-bold text-[#1F1F1F] mb-2">{stats.pausedPurchases}</div>
          <div className="text-sm text-[#6B6B6B]">Achats différés de 24h</div>
        </div>

        {/* Impact Stats */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
            <TrendingDown size={20} className="text-[#6B6B6B]" />
            <h3 className="font-bold">Impact CO₂</h3>
          </div>
          <div className="text-4xl font-bold text-[#1F1F1F] mb-2">-{stats.savedCO2} kg</div>
          <div className="text-sm text-[#6B6B6B]">Émissions CO₂ évitées</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
          <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
            <Wallet size={20} className="text-[#0F3D2E]" />
            <h3 className="font-bold">Budget Préservé</h3>
          </div>
          <div className="text-4xl font-bold text-[#1F1F1F] mb-2">{stats.savedMoney} €</div>
          <div className="text-sm text-[#6B6B6B]">Argent non dépensé inutilement</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-[#1F1F1F] mb-4">
              <Leaf size={20} className="text-[#8FAF8D]" />
              <h3 className="font-bold">Green Cashback</h3>
            </div>
            <div className="text-4xl font-bold text-[#1F1F1F] mb-2">{stats.greenCashback.toFixed(2)} €</div>
            <div className="text-sm text-[#6B6B6B]">Cashback gagné à utiliser</div>
          </div>
          <Link to="/cashback" className="mt-4 text-[#0F3D2E] text-sm font-semibold hover:underline">
            Voir l'historique &rarr;
          </Link>
        </div>
      </div>

      {/* Dressing Insights */}
      <div className="bg-white rounded-[2rem] p-8 border border-[#E8E6DE] shadow-sm">
        <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Insights du Dressing</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[#6B6B6B]">Vêtements portés régulièrement</span>
              <span className="font-bold text-[#1F1F1F]">{percentageWornRegularly}%</span>
            </div>
            <div className="h-3 w-full bg-[#E8E6DE] rounded-full overflow-hidden">
              <div className="h-full bg-[#0F3D2E] rounded-full" style={{ width: `${percentageWornRegularly}%` }} />
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-[#F7F5EF] p-4 rounded-2xl">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
              <Award className="text-[#F3B08C]" size={24} />
            </div>
            <div>
              <div className="font-bold text-[#1F1F1F]">{stats.avoidedDuplicates} doublons évités</div>
              <div className="text-sm text-[#6B6B6B]">Bravo, tu n'as pas acheté deux fois la même chose.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tests */}
      {purchaseHistory.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">Derniers achats testés</h2>
          <div className="space-y-4">
            {purchaseHistory.slice(0, 3).map(test => (
              <div key={test.id} className="bg-white p-4 rounded-2xl border border-[#E8E6DE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1F1F1F]">{test.item.name}</div>
                  <div className="text-sm text-[#6B6B6B] capitalize">{test.status === 'pending' ? 'En attente' : test.status === 'validated' ? 'Acheté' : test.status === 'paused' ? 'En pause 24h' : 'Annulé'} • Score {test.grade}</div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-bold ${
                  test.grade === 'A' || test.grade === 'B' ? 'bg-[#E8F3E7] text-[#0F3D2E]' : 
                  test.grade === 'C' ? 'bg-[#F7F5EF] text-[#6B6B6B]' : 
                  'bg-[#FFF5F0] text-[#D47C4A]'
                }`}>
                  {test.score}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
