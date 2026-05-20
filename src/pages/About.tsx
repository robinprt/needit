import { ShieldCheck, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-[#0F3D2E] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <ShieldCheck size={40} className="text-[#8FAF8D]" />
        </div>
        <h1 className="text-4xl font-bold text-[#1F1F1F]">À propos de NeedIt</h1>
        <p className="text-xl text-[#6B6B6B] leading-relaxed">
          NeedIt est né d'un constat simple : la fast fashion rend l'achat trop rapide, trop facile et trop automatique.
        </p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#E8E6DE]">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">Notre Mission</h2>
            <p className="text-[#6B6B6B] leading-relaxed text-lg">
              L'application veut réintroduire un temps de réflexion dans le parcours d'achat textile. Nous sommes constamment poussés par les algorithmes, les ventes flash et les influenceurs. Résultat : nos dressings débordent de vêtements peu portés.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#F7F5EF] p-6 rounded-2xl">
              <Heart className="text-[#F3B08C] mb-4" size={24} />
              <h3 className="font-bold text-[#1F1F1F] mb-2">Non Culpabilisant</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                NeedIt ne culpabilise pas. NeedIt aide à mieux choisir. Il n'y a pas d'interdit, juste un espace pour se demander : "En ai-je vraiment besoin ?"
              </p>
            </div>
            
            <div className="bg-[#E8F3E7] p-6 rounded-2xl">
              <Leaf className="text-[#0F3D2E] mb-4" size={24} />
              <h3 className="font-bold text-[#1F1F1F] mb-2">Le Green Cashback</h3>
              <p className="text-[#0F3D2E]/80 text-sm leading-relaxed">
                Nous pensons que la responsabilité doit être récompensée. C'est pourquoi chaque bon choix (seconde main, réparation, attente) génère du cashback.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E8E6DE]">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">Le Modèle NeedIt</h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              NeedIt s'intègre au moment clé de l'achat via une extension navigateur. Le système de Green Cashback est financé par nos partenaires : des marques responsables, des plateformes de seconde main et des services de réparation.
            </p>
            <ul className="space-y-2 text-[#6B6B6B]">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E]" />
                Rendre visible le besoin réel et les doublons
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E]" />
                Calculer l'impact environnemental estimé
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E]" />
                Proposer des alternatives responsables
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/tester" className="inline-flex items-center justify-center bg-[#1F1F1F] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg gap-2">
          Tester l'expérience NeedIt
        </Link>
      </div>
    </div>
  );
}
