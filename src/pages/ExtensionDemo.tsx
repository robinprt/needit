import { useState } from 'react';
import { ShoppingBag, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExtensionDemo() {
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1); // 1: Questions, 2: Result

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Extension Demo</h1>
        <p className="text-[#6B6B6B] mt-1">Simulation de l'extension Chrome NeedIt sur un site e-commerce</p>
      </div>

      <div className="relative border-4 border-[#1F1F1F] rounded-t-lg rounded-b-md overflow-hidden bg-white max-w-4xl mx-auto shadow-2xl">
        {/* Fake Browser Header */}
        <div className="bg-[#E8E6DE] p-3 flex items-center gap-2 border-b border-[#D1CFCA]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="ml-4 bg-white px-4 py-1 rounded text-sm text-[#6B6B6B] font-mono flex-1 text-center">
            fast-fashion-shop.com/produit/veste-oversize
          </div>
        </div>

        {/* Fake E-commerce Page */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 relative min-h-[500px]">
          {/* Product Image Placeholder */}
          <div className="md:w-1/2 bg-[#F7F5EF] aspect-[3/4] rounded-2xl flex items-center justify-center">
            <span className="text-[#6B6B6B]">Image Produit</span>
          </div>
          
          <div className="md:w-1/2 space-y-6">
            <div>
              <div className="text-sm text-red-500 font-bold mb-2">Vente Flash ! -30%</div>
              <h2 className="text-3xl font-bold text-[#1F1F1F]">Veste oversize beige</h2>
              <div className="text-sm text-[#6B6B6B] mt-1">Plus que 2 articles disponibles</div>
            </div>
            <div className="text-2xl font-bold text-[#1F1F1F]">
              <span className="line-through text-[#6B6B6B] text-lg mr-2">59,99 €</span>
              39,99 €
            </div>
            
            <button 
              onClick={() => setShowPopup(true)}
              className="w-full bg-[#1F1F1F] text-white py-4 font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              Ajouter au panier
            </button>
          </div>

          {/* NeedIt Extension Popup Overlay */}
          <AnimatePresence>
            {showPopup && (
              <div className="absolute inset-0 bg-[#1F1F1F]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative"
                >
                  <div className="bg-[#0F3D2E] text-white p-4 flex justify-between items-center">
                    <div className="font-bold flex items-center gap-2">
                      <ShieldCheck size={20} className="text-[#8FAF8D]" />
                      NeedIt
                    </div>
                    <button onClick={() => { setShowPopup(false); setStep(1); }} className="hover:bg-white/20 p-1 rounded-full">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    {step === 1 ? (
                      <div className="space-y-4">
                        <div className="font-bold text-[#1F1F1F] text-lg mb-2">Avant d'acheter...</div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">1. En as-tu vraiment besoin ?</label>
                          <select className="w-full bg-[#F7F5EF] border border-[#E8E6DE] rounded-lg px-3 py-2 text-sm outline-none">
                            <option>Non, c'est une envie</option>
                            <option>Peut-être</option>
                            <option>Oui, vrai besoin</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">2. As-tu une pièce similaire ?</label>
                          <select className="w-full bg-[#F7F5EF] border border-[#E8E6DE] rounded-lg px-3 py-2 text-sm outline-none">
                            <option>Oui, une veste beige Zara</option>
                            <option>Non</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">3. Vas-tu la porter souvent ?</label>
                          <select className="w-full bg-[#F7F5EF] border border-[#E8E6DE] rounded-lg px-3 py-2 text-sm outline-none">
                            <option>Quelques fois</option>
                            <option>Souvent</option>
                          </select>
                        </div>

                        <button 
                          onClick={() => setStep(2)}
                          className="w-full bg-[#0F3D2E] text-white py-3 rounded-xl font-bold mt-4"
                        >
                          Voir mon Score
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 rounded-full border-4 border-[#F3B08C] text-[#D47C4A] text-2xl font-bold flex items-center justify-center mx-auto mb-2">
                          D
                        </div>
                        <h3 className="font-bold text-lg text-[#1F1F1F]">Score: 35/100</h3>
                        
                        <div className="bg-[#FFF5F0] border border-[#F3B08C] p-3 rounded-xl text-left flex gap-2">
                          <AlertTriangle className="text-[#D47C4A] shrink-0" size={16} />
                          <div className="text-sm text-[#D47C4A]">
                            <strong>Doublon potentiel</strong><br/>
                            Tu possèdes déjà "Veste beige (Zara)".
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col gap-2">
                          <button onClick={() => { setShowPopup(false); setStep(1); }} className="w-full bg-[#F7F5EF] text-[#0F3D2E] py-2.5 rounded-xl font-bold border border-[#0F3D2E] hover:bg-[#E8F3E7] transition-colors">
                            J'attends 24h (+0.50€)
                          </button>
                          <button onClick={() => { setShowPopup(false); setStep(1); }} className="w-full text-[#6B6B6B] py-2 text-sm hover:underline">
                            Je continue l'achat
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
