import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, PauseCircle, Shirt } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { calculateNeedScore, detectDuplicate, calculateCashback } from '../utils/scoring';
import type { ClothingCategory, ClothingItem, PurchaseTestResult, ScoreGrade } from '../types';

export default function TestPurchase() {
  const navigate = useNavigate();
  const { wardrobe, addPurchaseTest, updatePurchaseStatus, addCashback, addClothingItem } = useAppStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 't-shirt' as ClothingCategory,
    color: '',
    price: 0,
    type: 'neuf' as 'neuf' | 'seconde main',
    occasion: 'besoin',
    realNeed: 'oui' as 'oui' | 'peut-etre' | 'non',
    frequency: 'souvent' as 'tres-souvent' | 'souvent' | 'quelques-fois' | 'une-fois',
    hasDuplicate: 'non' as 'non' | 'oui-un' | 'oui-plusieurs',
    canWait24h: 'oui' as 'oui' | 'non',
  });
  const [result, setResult] = useState<{score: number, grade: ScoreGrade, message: string} | null>(null);
  const [duplicates, setDuplicates] = useState<ClothingItem[]>([]);
  const [savedPurchaseId, setSavedPurchaseId] = useState<string | null>(null);

  const handleNext = () => setStep(s => s + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duplicatesFound = detectDuplicate(formData, wardrobe);
    setDuplicates(duplicatesFound);

    // Force 'hasDuplicate' if detected automatically to penalize score
    const duplicateStatus = duplicatesFound.length > 1 ? 'oui-plusieurs' : (duplicatesFound.length === 1 ? 'oui-un' : formData.hasDuplicate);

    const scoreResult = calculateNeedScore({
      ...formData,
      hasDuplicate: duplicateStatus
    });
    setResult(scoreResult);
    
    // Save test
    const testResult: PurchaseTestResult = {
      id: Date.now().toString(),
      item: formData,
      score: scoreResult.score,
      grade: scoreResult.grade,
      message: scoreResult.message,
      date: new Date().toISOString(),
      status: 'pending',
      potentialCashback: calculateCashback('achat-responsable', formData.price, scoreResult.grade)
    };
    addPurchaseTest(testResult);
    setSavedPurchaseId(testResult.id);
    setStep(3);
  };

  const handleAction = (action: 'validated' | 'paused' | 'avoided') => {
    if (!savedPurchaseId || !result) return;
    
    updatePurchaseStatus(savedPurchaseId, action);

    // Apply specific actions
    if (action === 'avoided' && (result.grade === 'D' || result.grade === 'E')) {
      const cb = calculateCashback('achat-evite', formData.price);
      addCashback(cb, 'Achat impulsif évité');
    }
    
    if (action === 'paused') {
      const cb = calculateCashback('attente-24h', formData.price);
      addCashback(cb, 'Achat mis en pause 24h');
    }

    if (action === 'validated') {
      const newItem: ClothingItem = {
        id: Date.now().toString(),
        name: formData.name || 'Nouveau vêtement',
        category: formData.category,
        color: formData.color,
        price: formData.price,
        type: formData.type,
        condition: 'neuf',
        wornCount: 0,
        co2Estimate: 15,
        brand: 'Inconnue',
        dateAdded: new Date().toISOString()
      };
      addClothingItem(newItem);
      
      if (formData.type === 'seconde main') {
        const cb = calculateCashback('seconde-main', formData.price);
        addCashback(cb, 'Achat seconde main');
      } else if (result.grade === 'A' || result.grade === 'B') {
        const cb = calculateCashback('achat-responsable', formData.price, result.grade);
        if (cb > 0) addCashback(cb, 'Achat responsable');
      }
    }

    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Tester un achat</h1>
        <div className="text-sm font-medium text-[#6B6B6B]">Étape {step} / 3</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#E8E6DE] space-y-6"
            onSubmit={(e) => { e.preventDefault(); handleNext(); }}
          >
            <h2 className="text-xl font-bold text-[#1F1F1F] mb-4">Parle-nous de ce vêtement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F1F1F]">Nom de l'article</label>
                <input required type="text" placeholder="Ex: T-shirt noir oversize" 
                  className="w-full bg-[#F7F5EF] border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F1F1F]">Catégorie</label>
                <select className="w-full bg-[#F7F5EF] border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all outline-none"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ClothingCategory})}>
                  <option value="t-shirt">T-shirt</option>
                  <option value="pantalon">Pantalon / Jean</option>
                  <option value="veste">Veste / Manteau</option>
                  <option value="robe">Robe</option>
                  <option value="chaussures">Chaussures</option>
                  <option value="accessoires">Accessoires</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F1F1F]">Prix (€)</label>
                <input required type="number" min="0" placeholder="0" 
                  className="w-full bg-[#F7F5EF] border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all outline-none"
                  value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1F1F1F]">Type d'achat</label>
                <select className="w-full bg-[#F7F5EF] border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all outline-none"
                  value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as 'neuf'|'seconde main'})}>
                  <option value="neuf">Neuf</option>
                  <option value="seconde main">Seconde main</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#1F1F1F]">Couleur principale</label>
                <input required type="text" placeholder="Ex: Noir" 
                  className="w-full bg-[#F7F5EF] border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0F3D2E] focus:bg-white transition-all outline-none"
                  value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#0F3D2E] text-white py-4 rounded-2xl font-medium hover:bg-[#0F3D2E]/90 transition-all shadow-md">
              Continuer
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#E8E6DE] space-y-6">
              <h2 className="text-xl font-bold text-[#1F1F1F] mb-4">3 questions pour être sûr</h2>

              <div className="space-y-3">
                <label className="text-base font-bold text-[#1F1F1F] block">1. Est-ce que j'en ai vraiment besoin ?</label>
                <div className="flex flex-col gap-2">
                  {[
                    { val: 'oui', label: "Oui, c'est un vrai besoin" },
                    { val: 'peut-etre', label: "Peut-être" },
                    { val: 'non', label: "Non, c'est surtout une envie" }
                  ].map(opt => (
                    <label key={opt.val} className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.realNeed === opt.val ? 'border-[#0F3D2E] bg-[#F7F5EF]' : 'border-[#E8E6DE] hover:bg-[#F7F5EF]'}`}>
                      <input type="radio" name="realNeed" value={opt.val} checked={formData.realNeed === opt.val}
                        onChange={() => setFormData({...formData, realNeed: opt.val as any})} className="hidden" />
                      <span className="font-medium text-[#1F1F1F]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-base font-bold text-[#1F1F1F] block">2. Est-ce que je vais vraiment le porter plusieurs fois ?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: 'tres-souvent', label: "Très souvent" },
                    { val: 'souvent', label: "Souvent" },
                    { val: 'quelques-fois', label: "Quelques fois" },
                    { val: 'une-fois', label: "Une seule fois" }
                  ].map(opt => (
                    <label key={opt.val} className={`flex items-center justify-center text-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.frequency === opt.val ? 'border-[#0F3D2E] bg-[#F7F5EF]' : 'border-[#E8E6DE] hover:bg-[#F7F5EF]'}`}>
                      <input type="radio" name="frequency" value={opt.val} checked={formData.frequency === opt.val}
                        onChange={() => setFormData({...formData, frequency: opt.val as any})} className="hidden" />
                      <span className="font-medium text-sm text-[#1F1F1F]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-base font-bold text-[#1F1F1F] block">3. Puis-je attendre 24h avant de l'acheter ?</label>
                <div className="flex gap-2">
                  <label className={`flex-1 flex justify-center items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.canWait24h === 'oui' ? 'border-[#0F3D2E] bg-[#F7F5EF]' : 'border-[#E8E6DE] hover:bg-[#F7F5EF]'}`}>
                    <input type="radio" name="wait" value="oui" checked={formData.canWait24h === 'oui'}
                      onChange={() => setFormData({...formData, canWait24h: 'oui'})} className="hidden" />
                    <span className="font-medium text-[#1F1F1F]">Oui</span>
                  </label>
                  <label className={`flex-1 flex justify-center items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${formData.canWait24h === 'non' ? 'border-[#F3B08C] bg-[#FFF5F0]' : 'border-[#E8E6DE] hover:bg-[#F7F5EF]'}`}>
                    <input type="radio" name="wait" value="non" checked={formData.canWait24h === 'non'}
                      onChange={() => setFormData({...formData, canWait24h: 'non'})} className="hidden" />
                    <span className="font-medium text-[#1F1F1F]">Non</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-white text-[#1F1F1F] py-4 rounded-2xl font-medium border border-[#E8E6DE] hover:bg-[#F7F5EF] transition-all">
                Retour
              </button>
              <button type="submit" className="w-2/3 bg-[#0F3D2E] text-white py-4 rounded-2xl font-medium hover:bg-[#0F3D2E]/90 transition-all shadow-md">
                Voir mon score
              </button>
            </div>
          </motion.form>
        )}

        {step === 3 && result && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#E8E6DE] text-center">
              <div className="text-sm font-semibold uppercase tracking-widest text-[#6B6B6B] mb-2">Score Besoin</div>
              <div className="flex justify-center mb-6">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold border-8
                  ${result.grade === 'A' ? 'border-[#8FAF8D] text-[#0F3D2E]' : 
                    result.grade === 'B' ? 'border-[#A7C9A4] text-[#0F3D2E]' : 
                    result.grade === 'C' ? 'border-[#E8E6DE] text-[#1F1F1F]' : 
                    result.grade === 'D' ? 'border-[#F3B08C] text-[#D47C4A]' : 
                    'border-[#D47C4A] text-[#D47C4A]'}`}>
                  {result.grade}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1F1F1F] mb-2">{result.score} / 100</h3>
              <p className="text-[#6B6B6B] leading-relaxed max-w-sm mx-auto">
                {result.message}
              </p>

              {duplicates.length > 0 && (
                <div className="mt-8 bg-[#FFF5F0] border border-[#F3B08C] p-4 rounded-2xl flex items-start gap-3 text-left">
                  <ShieldAlert className="text-[#D47C4A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#D47C4A]">Doublon potentiel détecté</strong>
                    <span className="text-sm text-[#D47C4A]/80">Tu as déjà {duplicates.length} pièce(s) similaire(s) ({duplicates.map(d => d.name).join(', ')}) dans ton dressing. Es-tu sûr d'en avoir besoin ?</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => handleAction('avoided')} className="bg-white border-2 border-[#8FAF8D] text-[#0F3D2E] py-4 rounded-2xl font-bold hover:bg-[#F7F5EF] transition-all flex justify-center items-center gap-2">
                <CheckCircle2 size={20} />
                Annuler l'achat
              </button>
              <button onClick={() => handleAction('paused')} className="bg-[#E8E6DE] text-[#1F1F1F] py-4 rounded-2xl font-bold hover:bg-[#E8E6DE]/80 transition-all flex justify-center items-center gap-2">
                <PauseCircle size={20} />
                Mettre en pause 24h
              </button>
              <button onClick={() => handleAction('validated')} className="sm:col-span-2 bg-[#F7F5EF] text-[#6B6B6B] py-4 rounded-2xl font-medium border border-[#E8E6DE] hover:bg-white transition-all flex justify-center items-center gap-2">
                <Shirt size={18} />
                J'achète et j'ajoute au dressing
              </button>
            </div>
            
            <p className="text-center text-sm text-[#6B6B6B]">
              <em>"Ce n'est pas une interdiction, c'est une meilleure décision."</em>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
