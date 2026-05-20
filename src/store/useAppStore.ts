import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ClothingItem, UserStats, CashbackHistoryEntry, PurchaseTestResult } from '../types';

interface AppState {
  wardrobe: ClothingItem[];
  stats: UserStats;
  cashbackHistory: CashbackHistoryEntry[];
  purchaseHistory: PurchaseTestResult[];
  
  addClothingItem: (item: ClothingItem) => void;
  removeClothingItem: (id: string) => void;
  addCashback: (amount: number, reason: string, partner?: string) => void;
  addPurchaseTest: (result: PurchaseTestResult) => void;
  updatePurchaseStatus: (id: string, status: PurchaseTestResult['status']) => void;
}

const initialWardrobe: ClothingItem[] = [
  {
    id: '1', name: 'Jean bleu', category: 'pantalon', color: 'bleu', price: 49,
    wornCount: 25, condition: 'bon', type: 'neuf', co2Estimate: 20,
    dateAdded: new Date().toISOString(), brand: 'Levi\'s'
  },
  {
    id: '2', name: 'T-shirt noir', category: 't-shirt', color: 'noir', price: 15,
    wornCount: 14, condition: 'bon', type: 'neuf', co2Estimate: 7,
    dateAdded: new Date().toISOString(), brand: 'Basic'
  },
  {
    id: '3', name: 'Veste beige', category: 'veste', color: 'beige', price: 65,
    wornCount: 3, condition: 'bon', type: 'neuf', co2Estimate: 25,
    dateAdded: new Date().toISOString(), brand: 'Zara'
  },
  {
    id: '4', name: 'Sneakers blanches', category: 'chaussures', color: 'blanc', price: 80,
    wornCount: 30, condition: 'bon', type: 'neuf', co2Estimate: 35,
    dateAdded: new Date().toISOString(), brand: 'Nike'
  },
  {
    id: '5', name: 'Robe noire', category: 'robe', color: 'noir', price: 35,
    wornCount: 2, condition: 'bon', type: 'neuf', co2Estimate: 15,
    dateAdded: new Date().toISOString(), brand: 'H&M'
  },
  {
    id: '6', name: 'Sweat vert', category: 'autre', color: 'vert', price: 40,
    wornCount: 8, condition: 'bon', type: 'seconde main', co2Estimate: 18,
    dateAdded: new Date().toISOString(), brand: 'Vintage'
  }
];

const initialCashbackHistory: CashbackHistoryEntry[] = [
  { id: '1', amount: 2.50, reason: 'Achat seconde main', date: new Date().toISOString() },
  { id: '2', amount: 1.50, reason: 'Doublon évité', date: new Date().toISOString() },
  { id: '3', amount: 0.50, reason: 'Achat mis en pause 24h', date: new Date().toISOString() }
];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      wardrobe: initialWardrobe,
      stats: {
        globalScore: 78,
        testedPurchases: 5,
        validatedPurchases: 2,
        avoidedPurchases: 2,
        pausedPurchases: 1,
        savedMoney: 120,
        savedCO2: 45,
        greenCashback: 12.40,
        needPoints: 350,
        avoidedDuplicates: 1
      },
      cashbackHistory: initialCashbackHistory,
      purchaseHistory: [],

      addClothingItem: (item) => set((state) => ({ 
        wardrobe: [item, ...state.wardrobe] 
      })),

      removeClothingItem: (id) => set((state) => ({
        wardrobe: state.wardrobe.filter(item => item.id !== id)
      })),

      addCashback: (amount, reason, partner) => set((state) => ({
        stats: { ...state.stats, greenCashback: state.stats.greenCashback + amount },
        cashbackHistory: [{
          id: Date.now().toString(),
          amount, reason, partner, date: new Date().toISOString()
        }, ...state.cashbackHistory]
      })),

      addPurchaseTest: (result) => set((state) => {
        const newStats = { ...state.stats, testedPurchases: state.stats.testedPurchases + 1 };
        return {
          purchaseHistory: [result, ...state.purchaseHistory],
          stats: newStats
        };
      }),

      updatePurchaseStatus: (id, status) => set((state) => {
        const history = state.purchaseHistory.map(p => 
          p.id === id ? { ...p, status } : p
        );
        
        // Update stats based on status
        let newStats = { ...state.stats };
        if (status === 'avoided') {
          newStats.avoidedPurchases += 1;
        } else if (status === 'paused') {
          newStats.pausedPurchases += 1;
        } else if (status === 'validated') {
          newStats.validatedPurchases += 1;
        }

        return { purchaseHistory: history, stats: newStats };
      })
    }),
    {
      name: 'needit-storage',
    }
  )
);
