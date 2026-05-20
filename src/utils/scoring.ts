import type { ClothingItem, ScoreGrade, ClothingCategory } from '../types';

export function calculateCO2Estimate(category: ClothingCategory, type: 'neuf' | 'seconde main'): number {
  let baseCo2 = 15; // default
  switch (category) {
    case 'veste':
      baseCo2 = 35;
      break;
    case 'pantalon':
      baseCo2 = 20;
      break;
    case 'chaussures':
      baseCo2 = 35;
      break;
    case 't-shirt':
      baseCo2 = 7;
      break;
    case 'robe':
      baseCo2 = 15;
      break;
    case 'accessoires':
    case 'autre':
      baseCo2 = 18;
      break;
  }
  
  if (type === 'seconde main') {
    return Math.round(baseCo2 * 0.1); // 90% reduction for second hand approx
  }
  return baseCo2;
}

export function detectDuplicate(newItem: Partial<ClothingItem>, wardrobe: ClothingItem[]): ClothingItem[] {
  return wardrobe.filter(item => 
    item.category === newItem.category && 
    (item.color.toLowerCase() === newItem.color?.toLowerCase() || item.type === newItem.type) // Basic duplicate logic
  );
}

interface ScoreData {
  realNeed: 'oui' | 'peut-etre' | 'non';
  frequency: 'tres-souvent' | 'souvent' | 'quelques-fois' | 'une-fois';
  hasDuplicate: 'non' | 'oui-un' | 'oui-plusieurs';
  type: 'neuf' | 'seconde main';
  canWait24h: 'oui' | 'non';
  occasion: string;
  price: number;
}

export function calculateNeedScore(data: ScoreData): { score: number, grade: ScoreGrade, message: string } {
  let score = 50; // Base score

  // Real Need
  if (data.realNeed === 'oui') score += 25;
  if (data.realNeed === 'non') score -= 20;

  // Frequency
  if (data.frequency === 'tres-souvent') score += 20;
  if (data.frequency === 'une-fois') score -= 25;

  // Duplicates
  if (data.hasDuplicate === 'non') score += 20;
  if (data.hasDuplicate === 'oui-plusieurs') score -= 25;

  // Type
  if (data.type === 'seconde main') score += 15;
  
  // Can wait
  if (data.canWait24h === 'oui') score += 10;

  // Occasion
  if (['tendance', 'influenceur', 'coup-de-coeur'].includes(data.occasion)) score -= 20;
  if (data.occasion === 'promotion') score -= 15;

  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  let grade: ScoreGrade = 'C';
  let message = "";

  if (score >= 85) {
    grade = 'A';
    message = "Achat cohérent avec ton besoin. Tu sembles avoir une vraie utilité pour ce vêtement.";
  } else if (score >= 70) {
    grade = 'B';
    message = "Achat plutôt raisonnable, mais vérifie ton dressing avant de valider.";
  } else if (score >= 50) {
    grade = 'C';
    message = "Cet achat mérite réflexion. Attendre 24h pourrait t’aider à décider.";
  } else if (score >= 30) {
    grade = 'D';
    message = "Risque d’achat impulsif élevé. Ton besoin semble faible ou influencé par une envie immédiate.";
  } else {
    grade = 'E';
    message = "Achat déconseillé. Doublon ou faible usage probable.";
  }

  return { score, grade, message };
}

export function calculateCashback(action: string, price: number, scoreGrade?: ScoreGrade): number {
  let cashback = 0;
  
  switch (action) {
    case 'seconde-main':
      cashback = price * 0.05;
      break;
    case 'achat-responsable':
      if (scoreGrade === 'A') cashback = price * 0.04;
      else if (scoreGrade === 'B') cashback = price * 0.02;
      break;
    case 'achat-evite':
      cashback = 1;
      break;
    case 'attente-24h':
      cashback = 0.50;
      break;
    case 'doublon-evite':
      cashback = 1.50;
      break;
    case 'reparation':
      cashback = 2;
      break;
  }
  
  return Number(cashback.toFixed(2));
}
