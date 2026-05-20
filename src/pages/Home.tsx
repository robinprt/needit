import { Link } from 'react-router-dom';
import { ShieldCheck, Target, TrendingDown, Leaf, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function Home() {
  const { stats } = useAppStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-8 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[#E8E6DE] text-[#0F3D2E] text-sm font-semibold mb-6">
            Achète moins vite, choisis mieux.
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F1F1F] mb-6 leading-tight">
            Avant d'acheter, demande-toi si tu en as <span className="text-[#0F3D2E]">vraiment besoin.</span>
          </h1>
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-2xl mx-auto leading-relaxed">
            NeedIt t'aide à ralentir les achats impulsifs, éviter les doublons et récompenser tes choix textiles responsables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/tester"
              className="w-full sm:w-auto bg-[#0F3D2E] text-white px-8 py-4 rounded-2xl font-medium hover:bg-[#0F3D2E]/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Target size={20} />
              Tester mon achat
            </Link>
            <Link
              to="/dressing"
              className="w-full sm:w-auto bg-white text-[#1F1F1F] px-8 py-4 rounded-2xl font-medium border border-[#E8E6DE] hover:bg-[#F7F5EF] transition-all flex items-center justify-center gap-2"
            >
              Voir mon dressing
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Quick View */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {[
          { label: "Score global", value: `${stats.globalScore}/100`, icon: ShieldCheck, color: "text-[#8FAF8D]" },
          { label: "Doublons évités", value: stats.avoidedDuplicates, icon: Target, color: "text-[#F3B08C]" },
          { label: "CO₂ évité", value: `${stats.savedCO2} kg`, icon: TrendingDown, color: "text-[#6B6B6B]" },
          { label: "Cashback", value: `${stats.greenCashback.toFixed(2)} €`, icon: Leaf, color: "text-[#0F3D2E]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-[#E8E6DE] flex flex-col items-center justify-center text-center shadow-sm">
            <stat.icon size={24} className={`${stat.color} mb-2`} />
            <span className="text-2xl font-bold text-[#1F1F1F]">{stat.value}</span>
            <span className="text-sm text-[#6B6B6B]">{stat.label}</span>
          </div>
        ))}
      </motion.section>

      {/* Why NeedIt? */}
      <section className="bg-white rounded-[2rem] p-8 md:p-12 border border-[#E8E6DE] shadow-sm">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1F1F1F] mb-6">Pourquoi NeedIt ?</h2>
            <div className="space-y-4">
              <p className="text-[#6B6B6B] leading-relaxed">
                Les promotions, les tendances et les algorithmes nous poussent à acheter vite. Résultat : beaucoup de vêtements sont peu portés, ou existent déjà dans notre dressing sous une forme similaire.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                NeedIt n'interdit pas d'acheter. NeedIt ajoute simplement un <strong>temps de réflexion de 30 secondes</strong> pour vous aider à prendre la meilleure décision.
              </p>
              <Link to="/a-propos" className="inline-flex items-center gap-2 text-[#0F3D2E] font-medium hover:underline mt-4">
                En savoir plus sur notre mission <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#F7F5EF] p-6 rounded-2xl">
              <h3 className="font-bold text-[#1F1F1F] mb-2 text-lg">Score Besoin</h3>
              <p className="text-sm text-[#6B6B6B]">Évalue l'utilité réelle d'un vêtement de A à E avant de l'acheter.</p>
            </div>
            <div className="bg-[#E8E6DE] p-6 rounded-2xl">
              <h3 className="font-bold text-[#1F1F1F] mb-2 text-lg">Dressing Anti-Doublon</h3>
              <p className="text-sm text-[#6B6B6B]">Détecte si tu possèdes déjà une pièce similaire pour éviter les achats inutiles.</p>
            </div>
            <div className="bg-[#0F3D2E] p-6 rounded-2xl sm:col-span-2 text-white">
              <h3 className="font-bold mb-2 text-lg">Green Cashback</h3>
              <p className="text-sm text-white/80">Gagne des récompenses quand tu adoptes un comportement responsable (seconde main, attente 24h, doublon évité).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
