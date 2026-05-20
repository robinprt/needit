export type ClothingCategory = 't-shirt' | 'pantalon' | 'veste' | 'robe' | 'chaussures' | 'accessoires' | 'autre';
export type ClothingCondition = 'neuf' | 'bon' | 'usé' | 'à réparer';
export type ClothingType = 'neuf' | 'seconde main';
export type ScoreGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  brand: string;
  price: number;
  dateAdded: string;
  condition: ClothingCondition;
  type: ClothingType;
  wornCount: number;
  co2Estimate: number;
}

export interface PurchaseTestResult {
  id: string;
  item: Partial<ClothingItem>;
  score: number;
  grade: ScoreGrade;
  message: string;
  date: string;
  status: 'validated' | 'paused' | 'cancelled' | 'avoided' | 'pending';
  potentialCashback: number;
}

export interface CashbackHistoryEntry {
  id: string;
  amount: number;
  reason: string;
  date: string;
  partner?: string;
}

export interface UserStats {
  globalScore: number;
  testedPurchases: number;
  validatedPurchases: number;
  avoidedPurchases: number;
  pausedPurchases: number;
  savedMoney: number;
  savedCO2: number;
  greenCashback: number;
  needPoints: number;
  avoidedDuplicates: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string; // Icon name from lucide-react
}
