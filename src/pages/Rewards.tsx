import { Award, Target, Star, ShieldCheck, Shirt, Clock, Recycle, Zap } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const BADGES = [
  { id: '1', name: 'Achat réfléchi', desc: 'Score A obtenu', icon: ShieldCheck, unlocked: true },
  { id: '2', name: 'Anti-doublon', desc: 'Achat d\'un doublon évité', icon: Target, unlocked: true },
  { id: '3', name: 'Seconde main', desc: 'Achat de seconde main', icon: Recycle, unlocked: true },
  { id: '4', name: '24h sans craquer', desc: 'Achat mis en pause 24h', icon: Clock, unlocked: true },
  { id: '5', name: 'Dressing maîtrisé', desc: 'Plus de 80% de vêtements portés', icon: Shirt, unlocked: false },
  { id: '6', name: 'Vêtement rentabilisé', desc: 'Vêtement porté 30+ fois', icon: Star, unlocked: false },
  { id: '7', name: 'Consommateur conscient', desc: '5 achats impulsifs évités', icon: Zap, unlocked: false },
  { id: '8', name: 'Budget préservé', desc: '200€ économisés', icon: Award, unlocked: false },
];

export default function Rewards() {
  const { stats } = useAppStore();

  const unlockedCount = BADGES.filter(b => b.unlocked).length;
  const progress = (unlockedCount / BADGES.length) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Récompenses</h1>
        <p className="text-[#6B6B6B] mt-1">Tes NeedPoints et badges débloqués</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#0F3D2E] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <Star className="absolute -top-4 -right-4 text-white/10" size={120} />
            <div className="relative z-10">
              <div className="text-sm font-semibold text-[#8FAF8D] uppercase tracking-widest mb-2">NeedPoints</div>
              <div className="text-5xl font-bold mb-2">
                {stats.needPoints} <span className="text-2xl text-white/60">pts</span>
              </div>
              <p className="text-white/80 text-sm">
                Continue à faire les bons choix pour débloquer de nouveaux paliers.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8E6DE] shadow-sm">
            <h3 className="font-bold text-[#1F1F1F] mb-4">Progression Badges</h3>
            <div className="flex justify-between text-sm mb-2 text-[#6B6B6B]">
              <span>{unlockedCount} débloqués</span>
              <span>{BADGES.length} total</span>
            </div>
            <div className="h-3 w-full bg-[#E8E6DE] rounded-full overflow-hidden">
              <div className="h-full bg-[#A7C9A4] rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E8E6DE] shadow-sm">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Tes Badges</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BADGES.map(badge => {
                const Icon = badge.icon;
                return (
                  <div key={badge.id} className={`flex flex-col items-center p-4 rounded-2xl text-center border-2 transition-all ${
                    badge.unlocked 
                      ? 'border-[#8FAF8D] bg-[#F7F5EF]' 
                      : 'border-transparent bg-white opacity-50 grayscale'
                  }`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                      badge.unlocked ? 'bg-[#0F3D2E] text-[#8FAF8D]' : 'bg-[#E8E6DE] text-[#6B6B6B]'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div className="font-bold text-[#1F1F1F] text-sm mb-1">{badge.name}</div>
                    <div className="text-[10px] text-[#6B6B6B] leading-tight">{badge.desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
