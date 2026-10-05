import { CuisineProfile, CuisineCode, LanguageInfo, LanguageCode } from '../types/i18n';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'hi', name: 'Indian (Hindi)', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const CUISINES: Record<CuisineCode, CuisineProfile> = {
  classic: {
    id: 'classic',
    name: 'Classic Bistro',
    nativeName: 'Classic Kitchen',
    chefName: 'Chef Ada',
    flag: '🍳',
    bannerTitle: 'International Bistro Kitchen',
    tagline: 'Foundational recipes: Toast, Gourmet Burgers, Soups & Bento Boxes.',
    accentColor: 'amber',
    bgGradient: 'from-amber-50 to-stone-100',
    dishIcons: ['🍞', '🥪', '🍔', '🍲', '🥗', '🍱'],
    specialtyDishes: ['Buttered Toast', 'Triple Layer PB&J', 'Heirloom Carrot Soup', 'Deluxe Cheeseburger', 'Bento Box'],
    rushHourDishes: [
      { name: 'Toasted Bagel', icon: '🥯', steps: ['Grab Bread', 'Toast', 'Plate'] },
      { name: 'Vegetable Soup', icon: '🍲', steps: ['Chop Carrot', 'Boil Pot', 'Serve'] },
      { name: 'Caesar Salad', icon: '🥗', steps: ['Chop Lettuce', 'Drizzle Dressing', 'Toss'] },
      { name: 'Classic Burger', icon: '🍔', steps: ['Grill Patty', 'Stack Bun', 'Serve'] }
    ]
  },
  chinese: {
    id: 'chinese',
    name: 'Chinese Cuisine',
    nativeName: '中华料理 (Chinese Kitchen)',
    chefName: 'Chef Li (李大厨)',
    flag: '🇨🇳',
    bannerTitle: 'Wok & Bamboo Steamer Station',
    tagline: 'Master precision slicing, wok heat distribution, and dumpling folding algorithms!',
    accentColor: 'red',
    bgGradient: 'from-red-50 to-amber-50',
    dishIcons: ['🥟', '🍚', '🥢', '🥠', '🥡', '🫖', '🍜'],
    specialtyDishes: ['Yangzhou Fried Rice (扬州炒饭)', 'Steamed Dumplings (手工水饺)', 'Pork Baozi (鲜肉大包)', 'Crispy Spring Rolls (黄金春卷)', 'Sweet Sesame Balls (麻团)'],
    rushHourDishes: [
      { name: 'Steamed Dumplings (水饺)', icon: '🥟', steps: ['Knead Dough', 'Fill Pork', 'Bamboo Steam'] },
      { name: 'Yangzhou Fried Rice (炒饭)', icon: '🍚', steps: ['Heat Wok', 'Toss Rice', 'Add Scallions'] },
      { name: 'Fluffy Baozi (鲜肉包)', icon: '🥡', steps: ['Fold Pleats', 'Steam Basket', 'Plate Warm'] },
      { name: 'Crispy Spring Rolls (春卷)', icon: '🥢', steps: ['Wrap Bamboo', 'Flash Fry', 'Sweet Chili Dip'] }
    ]
  },
  spanish: {
    id: 'spanish',
    name: 'Spanish Cuisine',
    nativeName: 'Cocina Española (Spanish Kitchen)',
    chefName: 'Chef Carmen (Chef Carmen)',
    flag: '🇪🇸',
    bannerTitle: 'Paella Pan & Tapas Bar',
    tagline: 'Orchestrate saffron seasoning, timed rice simmer, and tapas small-plate pipelines!',
    accentColor: 'yellow',
    bgGradient: 'from-amber-50 to-red-50',
    dishIcons: ['🥘', '🍤', '🧆', '🥖', '🍷', '🍊', '🥔'],
    specialtyDishes: ['Paella Valenciana', 'Tortilla de Patatas', 'Patatas Bravas', 'Churros con Chocolate', 'Gazpacho Andaluz'],
    rushHourDishes: [
      { name: 'Paella Valenciana', icon: '🥘', steps: ['Sauté Sofrito', 'Saffron Rice', 'Simmer Socarrat'] },
      { name: 'Tortilla de Patatas', icon: '🍳', steps: ['Slice Potatoes', 'Whisk Eggs', 'Cast Skillet Flip'] },
      { name: 'Patatas Bravas', icon: '🥔', steps: ['Chop Potato', 'Sizzle Fry', 'Top Spicy Brava'] },
      { name: 'Churros con Chocolate', icon: '🥖', steps: ['Pipe Fluted Dough', 'Fry Golden', 'Melt Dark Chocolate'] }
    ]
  },
  turkish: {
    id: 'turkish',
    name: 'Turkish Cuisine',
    nativeName: 'Türk Mutfağı (Turkish Kitchen)',
    chefName: 'Chef Mehmet (Şef Mehmet)',
    flag: '🇹🇷',
    bannerTitle: 'Ocakbaşı Charcoal Grill & Çay Station',
    tagline: 'Harmonize copper pot simmering, paper-thin phyllo layering, and fragrant spice queues!',
    accentColor: 'rose',
    bgGradient: 'from-rose-50 to-amber-50',
    dishIcons: ['🥙', '🍢', '🫓', '🍯', '☕', '🍅', '🫖'],
    specialtyDishes: ['Adana Shish Kebab (Adana Kebap)', 'Antep Pistachio Baklava (Fıstıklı Baklava)', 'Village Menemen', 'Crispy Lahmacun', 'Çaydanlık Turkish Tea & Simit'],
    rushHourDishes: [
      { name: 'Adana Shish Kebab', icon: '🍢', steps: ['Mince Lamb', 'Skewer Flat', 'Charcoal Grill'] },
      { name: 'Antep Baklava', icon: '🍯', steps: ['Layer 40 Phyllo', 'Pistachio Crumble', 'Sherbet Glaze'] },
      { name: 'Village Menemen', icon: '🍳', steps: ['Dice Sivri Biber', 'Simmer Tomatoes', 'Swirl Fresh Eggs'] },
      { name: 'Turkish Tea & Simit', icon: '🫖', steps: ['Double Kettle Brew', 'Molasses Sesame Crust', 'Tulip Glass Serve'] }
    ]
  },
  indian: {
    id: 'indian',
    name: 'Indian Cuisine',
    nativeName: 'भारतीय रसोई (Indian Kitchen)',
    chefName: 'Chef Priya (शेफ प्रिया)',
    flag: '🇮🇳',
    bannerTitle: 'Clay Tandoor & Tadka Spice Karahi',
    tagline: 'Balance aromatic tempering (Tadka), clay oven thermal dynamics, and stratified Biryani layers!',
    accentColor: 'orange',
    bgGradient: 'from-orange-50 to-emerald-50',
    dishIcons: ['🍛', '🫓', '🥟', '🍲', '🫖', '🍚', '🌿'],
    specialtyDishes: ['Hyderabadi Dum Biryani (दम बिरयानी)', 'Crispy Potato Samosa (आलू समोसा)', 'Tandoori Garlic Naan & Paneer', 'Slow-Simmered Dal Makhani', 'Cardamom Masala Chai'],
    rushHourDishes: [
      { name: 'Hyderabadi Dum Biryani', icon: '🍛', steps: ['Marinate Spices', 'Layer Basmati', 'Dough-Seal Dum'] },
      { name: 'Crispy Samosa', icon: '🥟', steps: ['Spice Potatoes', 'Cone Fold', 'Deep Golden Fry'] },
      { name: 'Tandoori Naan & Paneer', icon: '🫓', steps: ['Slap Wall Tandoor', 'Sizzle Paneer', 'Brush Ghee'] },
      { name: 'Cardamom Masala Chai', icon: '☕', steps: ['Crush Pods', 'Boil Assam Tea', 'Aerate Pour'] }
    ]
  },
  french: {
    id: 'french',
    name: 'French Cuisine',
    nativeName: 'Haute Cuisine (Bistrot Français)',
    chefName: 'Chef Pierre (Chef Pierre)',
    flag: '🇫🇷',
    bannerTitle: 'Boulangerie & Patisserie Copper Station',
    tagline: 'Execute precise mirepoix dicing, butter lamination recursion, and delicate sauce reductions!',
    accentColor: 'blue',
    bgGradient: 'from-blue-50 to-stone-50',
    dishIcons: ['🥐', '🍲', '🥖', '🧀', '🥞', '🍷', '🧈'],
    specialtyDishes: ['Ratatouille Provençale', 'All-Butter Croissant', 'Crêpe Suzette', 'Gratinée French Onion Soup', 'Chocolate Soufflé'],
    rushHourDishes: [
      { name: 'Ratatouille Provençale', icon: '🍲', steps: ['Mandoline Slice', 'Spiral Layering', 'Confit Bake'] },
      { name: 'All-Butter Croissant', icon: '🥐', steps: ['Laminate Butter', 'Tri-Fold Dough', 'Bake Honeycomb'] },
      { name: 'Crêpe Suzette', icon: '🥞', steps: ['Ladle Batter', 'Flip Paper-Thin', 'Grand Marnier Flambé'] },
      { name: 'French Onion Soup', icon: '🥣', steps: ['Caramelize Sweet Onions', 'Beef Consommé', 'Broil Gruyère'] }
    ]
  }
};
