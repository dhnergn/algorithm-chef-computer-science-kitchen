/**
 * Localization and Cuisine Types for Algorithm Chef
 */

export type LanguageCode = 'en' | 'zh' | 'es' | 'tr' | 'hi' | 'fr';

export type CuisineCode = 'classic' | 'chinese' | 'spanish' | 'turkish' | 'indian' | 'french';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface CuisineProfile {
  id: CuisineCode;
  name: string;
  nativeName: string;
  chefName: string;
  flag: string;
  bannerTitle: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  dishIcons: string[];
  specialtyDishes: string[];
  rushHourDishes: {
    name: string;
    icon: string;
    steps: string[];
  }[];
}
