export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Canteen {
  id: string;
  name: string;
  type: "student" | "business" | "asian";
  description: string;
  city: "Lahti";
  address: string;
  website?: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface Meal {
  id: string;
  canteenId: string;
  title: string;
  studentPrice: number;
  regularPrice: number;
  portionsLeft: number;
  ingredients: string[];
  tags: string[];
  dietaryTags: string[];
  pickupTime: string;
  image: string;
  co2Saved: number;
  urgencyLevel: "high" | "medium" | "low";
  createdAt: string;
  isVegan: boolean;
}

export interface OrderItem {
  mealId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  canteenId: string;
  canteenName: string;
  canteenAddress: string;
  pickupTime: string;
  totalPrice: number;
  createdAt: string;
  qrCode: string;
  co2Saved: number;
}

export interface UserProfile {
  name: string;
  email: string;
  isVerified: boolean;
  totalSaved: number;
  co2Prevented: number;
  ordersCount: number;
  favoriteCanteens: string[];
  guildId: string | null;
}

export interface Guild {
  id: string;
  name: string;
  mealsRescued: number;
  co2Saved: number;
  members: number;
}

export const guilds: Guild[] = [
  { id: "armatuuri", name: "Armatuuri", mealsRescued: 156, co2Saved: 342, members: 24 },
  { id: "cluster", name: "Cluster", mealsRescued: 203, co2Saved: 445, members: 31 },
  { id: "dominus", name: "Dominus", mealsRescued: 178, co2Saved: 389, members: 27 },
  { id: "enklaavi", name: "Enklaavi", mealsRescued: 134, co2Saved: 294, members: 22 },
  { id: "tesseract", name: "Tesseract", mealsRescued: 189, co2Saved: 414, members: 29 },
  { id: "fuusio", name: "Fuusio", mealsRescued: 167, co2Saved: 366, members: 25 },
  { id: "kapital", name: "Kapital", mealsRescued: 145, co2Saved: 318, members: 23 },
  { id: "kaplaaki", name: "Kaplaaki", mealsRescued: 198, co2Saved: 433, members: 30 },
  { id: "ketek", name: "KeTek", mealsRescued: 123, co2Saved: 269, members: 20 },
  { id: "krk", name: "KRK", mealsRescued: 175, co2Saved: 384, members: 26 },
  { id: "lateksii", name: "Lateksii", mealsRescued: 142, co2Saved: 311, members: 21 },
  { id: "pelletti", name: "Pelletti", mealsRescued: 165, co2Saved: 362, members: 24 },
  { id: "sosa", name: "SoSA", mealsRescued: 154, co2Saved: 338, members: 23 },
  { id: "satky", name: "Sätky", mealsRescued: 188, co2Saved: 412, members: 28 },
];

// Sample reviews for canteens
const sampleReviews: Review[] = [
  { id: "r1", userName: "Mikael L.", rating: 5, comment: "Great food quality and friendly staff!", date: "2024-04-08" },
  { id: "r2", userName: "Sanna K.", rating: 4, comment: "Good portions, nice atmosphere.", date: "2024-04-05" },
  { id: "r3", userName: "Juha R.", rating: 5, comment: "Best lunch spot on campus!", date: "2024-04-02" },
  { id: "r4", userName: "Emma T.", rating: 4, comment: "Fresh ingredients, reasonable prices.", date: "2024-03-28" },
];

export const canteens: Canteen[] = [
  {
    id: "isku",
    name: "Food&Co Isku Center",
    type: "business",
    description: "Business lunch with premium quality ingredients at Mukkula campus",
    city: "Lahti",
    address: "Mukkulankatu 19, Lahti",
    website: "https://foodco.fi/isku",
    phone: "+358 44 123 4567",
    rating: 4.5,
    reviewCount: 128,
    reviews: sampleReviews,
  },
  {
    id: "shiksha-mukkula",
    name: "Restaurant Shiksha",
    type: "asian",
    description: "Authentic Asian cuisine at Mukkula campus",
    city: "Lahti",
    address: "Mukkulankatu 19, Lahti",
    website: "https://shiksha.fi",
    phone: "+358 44 234 5678",
    rating: 4.7,
    reviewCount: 215,
    reviews: sampleReviews,
  },
  {
    id: "shiksha-niemi",
    name: "Restaurant Shiksha Niemi",
    type: "asian",
    description: "Asian flavors at Niemi campus",
    city: "Lahti",
    address: "Niemenkatu 73, Lahti",
    website: "https://shiksha.fi/niemi",
    phone: "+358 44 345 6789",
    rating: 4.6,
    reviewCount: 156,
    reviews: sampleReviews,
  },
  {
    id: "kanttis",
    name: "Restaurant Kanttis",
    type: "student",
    description: "Classic student canteen with affordable daily options",
    city: "Lahti",
    address: "Kirkkokatu 20, Lahti",
    website: "https://kanttis.fi",
    phone: "+358 44 456 7890",
    rating: 4.3,
    reviewCount: 342,
    reviews: sampleReviews,
  },
];

export const meals: Meal[] = [
  // Food&Co Isku Center - Business menu (Tuesday)
  {
    id: "isku-1",
    canteenId: "isku",
    title: "Pureed Broccoli Soup with Mifu Stew Gochujang",
    studentPrice: 3.20,
    regularPrice: 13.50,
    portionsLeft: 4,
    ingredients: ["Broccoli", "Mifu", "Gochujang", "Vegetables", "Spices"],
    tags: ["Vegan", "Spicy", "Lunch"],
    dietaryTags: ["Vegan", "Gluten-free", "Lactose-free"],
    pickupTime: "21:00",
    image: "🥣",
    co2Saved: 2.1,
    urgencyLevel: "high",
    createdAt: "2026-04-07T11:00:00Z",
    isVegan: true,
  },
  {
    id: "isku-2",
    canteenId: "isku",
    title: "Liver Schnitzel in Rich Sauce",
    studentPrice: 3.50,
    regularPrice: 14.20,
    portionsLeft: 3,
    ingredients: ["Liver", "Cream Sauce", "Potatoes", "Vegetables"],
    tags: ["Finnish", "Traditional"],
    dietaryTags: ["Lactose-free"],
    pickupTime: "21:00",
    image: "🥩",
    co2Saved: 1.8,
    urgencyLevel: "high",
    createdAt: "2026-04-07T11:00:00Z",
    isVegan: false,
  },
  {
    id: "isku-3",
    canteenId: "isku",
    title: "Chicken Stew Burgundy with Pear Panna Cotta",
    studentPrice: 3.80,
    regularPrice: 14.90,
    portionsLeft: 5,
    ingredients: ["Chicken", "Burgundy Sauce", "Pear", "Yoghurt", "Cream"],
    tags: ["Premium", "Dessert Included"],
    dietaryTags: ["Lactose-free"],
    pickupTime: "21:00",
    image: "🍗",
    co2Saved: 2.3,
    urgencyLevel: "medium",
    createdAt: "2026-04-07T11:00:00Z",
    isVegan: false,
  },

  // Food&Co Isku Center - Wednesday
  {
    id: "isku-4",
    canteenId: "isku",
    title: "Root Vegetable Soup with Crispy Chicken Gochujang",
    studentPrice: 3.20,
    regularPrice: 13.50,
    portionsLeft: 6,
    ingredients: ["Root Vegetables", "Chicken", "Gochujang", "Cheese"],
    tags: ["Spicy", "Comfort Food"],
    dietaryTags: [],
    pickupTime: "21:00",
    image: "🍲",
    co2Saved: 1.9,
    urgencyLevel: "medium",
    createdAt: "2026-04-08T11:00:00Z",
    isVegan: false,
  },
  {
    id: "isku-5",
    canteenId: "isku",
    title: "Creamy Potato Salmon Casserole with Chocolate Mousse",
    studentPrice: 3.90,
    regularPrice: 15.20,
    portionsLeft: 4,
    ingredients: ["Salmon", "Potatoes", "Cream", "Chocolate", "Caramel", "Peanuts"],
    tags: ["Fish", "Dessert Included", "Premium"],
    dietaryTags: ["Lactose-free"],
    pickupTime: "21:00",
    image: "🐟",
    co2Saved: 2.5,
    urgencyLevel: "high",
    createdAt: "2026-04-08T11:00:00Z",
    isVegan: false,
  },

  // Food&Co Isku Center - Thursday
  {
    id: "isku-6",
    canteenId: "isku",
    title: "Pea Soup with Feta Maccheroni Pasta",
    studentPrice: 3.10,
    regularPrice: 13.20,
    portionsLeft: 8,
    ingredients: ["Peas", "Feta", "Pasta", "Herbs"],
    tags: ["Vegetarian", "Pasta"],
    dietaryTags: ["Vegetarian", "Lactose-free"],
    pickupTime: "21:00",
    image: "🍝",
    co2Saved: 1.7,
    urgencyLevel: "low",
    createdAt: "2026-04-09T11:00:00Z",
    isVegan: false,
  },
  {
    id: "isku-7",
    canteenId: "isku",
    title: "Roasted Chicken with Tuna Lasagnette",
    studentPrice: 3.60,
    regularPrice: 14.50,
    portionsLeft: 5,
    ingredients: ["Chicken", "Tuna", "Spinach", "Pasta Sheets", "Cheese"],
    tags: ["Premium", "Italian"],
    dietaryTags: [],
    pickupTime: "21:00",
    image: "🍗",
    co2Saved: 2.2,
    urgencyLevel: "medium",
    createdAt: "2026-04-09T11:00:00Z",
    isVegan: false,
  },

  // Shiksha Mukkula - Asian (based on student menu)
  {
    id: "shiksha-muk-1",
    canteenId: "shiksha-mukkula",
    title: "Mifu Stew Gochujang with Rice",
    studentPrice: 2.90,
    regularPrice: 11.50,
    portionsLeft: 7,
    ingredients: ["Mifu", "Gochujang", "Rice", "Vegetables"],
    tags: ["Spicy", "Korean", "Vegetarian"],
    dietaryTags: ["Vegetarian", "Lactose-free", "Dairy-free"],
    pickupTime: "21:00",
    image: "🥘",
    co2Saved: 1.5,
    urgencyLevel: "medium",
    createdAt: "2026-04-07T11:30:00Z",
    isVegan: false,
  },
  {
    id: "shiksha-muk-2",
    canteenId: "shiksha-mukkula",
    title: "Baked Sausage with Bacon and Onions",
    studentPrice: 3.10,
    regularPrice: 12.80,
    portionsLeft: 6,
    ingredients: ["Sausage", "Bacon", "Onions", "Potatoes"],
    tags: ["Finnish", "Hearty"],
    dietaryTags: ["Lactose-free", "Gluten-free"],
    pickupTime: "21:00",
    image: "🌭",
    co2Saved: 1.9,
    urgencyLevel: "medium",
    createdAt: "2026-04-07T11:30:00Z",
    isVegan: false,
  },
  {
    id: "shiksha-muk-3",
    canteenId: "shiksha-mukkula",
    title: "Spicy Vegetables with Soy Coconut Sauce",
    studentPrice: 2.80,
    regularPrice: 11.20,
    portionsLeft: 9,
    ingredients: ["Mixed Vegetables", "Soy Sauce", "Coconut Milk", "Spices"],
    tags: ["Vegan", "Asian", "Spicy"],
    dietaryTags: ["Vegan", "Gluten-free", "Lactose-free", "Dairy-free"],
    pickupTime: "21:00",
    image: "🥗",
    co2Saved: 1.3,
    urgencyLevel: "low",
    createdAt: "2026-04-08T11:30:00Z",
    isVegan: true,
  },
  {
    id: "shiksha-muk-4",
    canteenId: "shiksha-mukkula",
    title: "Minced Meat on a Stick (Kebab Style)",
    studentPrice: 3.20,
    regularPrice: 12.50,
    portionsLeft: 8,
    ingredients: ["Minced Meat", "Spices", "Rice", "Vegetables"],
    tags: ["Middle Eastern", "Protein-rich"],
    dietaryTags: ["Lactose-free", "Dairy-free"],
    pickupTime: "21:00",
    image: "🍢",
    co2Saved: 1.7,
    urgencyLevel: "low",
    createdAt: "2026-04-08T11:30:00Z",
    isVegan: false,
  },

  // Shiksha Niemi - Asian variations
  {
    id: "shiksha-niem-1",
    canteenId: "shiksha-niemi",
    title: "Tuna and Leaf Spinach Lasagnette",
    studentPrice: 3.30,
    regularPrice: 12.90,
    portionsLeft: 5,
    ingredients: ["Tuna", "Spinach", "Pasta", "Cream Sauce"],
    tags: ["Italian", "Fish", "Creamy"],
    dietaryTags: [],
    pickupTime: "21:00",
    image: "🍝",
    co2Saved: 1.6,
    urgencyLevel: "high",
    createdAt: "2026-04-09T11:30:00Z",
    isVegan: false,
  },
  {
    id: "shiksha-niem-2",
    canteenId: "shiksha-niemi",
    title: "Pork in Soy Ginger Sauce",
    studentPrice: 3.10,
    regularPrice: 12.40,
    portionsLeft: 6,
    ingredients: ["Pork", "Soy Sauce", "Ginger", "Rice", "Vegetables"],
    tags: ["Asian", "Savory"],
    dietaryTags: ["Lactose-free", "Dairy-free", "Gluten-free"],
    pickupTime: "21:00",
    image: "🥡",
    co2Saved: 1.8,
    urgencyLevel: "medium",
    createdAt: "2026-04-09T11:30:00Z",
    isVegan: false,
  },

  // Kanttis - Student canteen (Campus menu)
  {
    id: "kanttis-1",
    canteenId: "kanttis",
    title: "Pea Soup with Pancake",
    studentPrice: 2.50,
    regularPrice: 10.50,
    portionsLeft: 15,
    ingredients: ["Peas", "Ham", "Pancake", "Jam"],
    tags: ["Finnish Classic", "Sweet & Savory"],
    dietaryTags: ["Lactose-free"],
    pickupTime: "21:00",
    image: "🥞",
    co2Saved: 1.2,
    urgencyLevel: "low",
    createdAt: "2026-04-09T12:00:00Z",
    isVegan: false,
  },
  {
    id: "kanttis-2",
    canteenId: "kanttis",
    title: "Feta Maccheroni Pasta (Campus Portion)",
    studentPrice: 2.70,
    regularPrice: 10.80,
    portionsLeft: 12,
    ingredients: ["Pasta", "Feta", "Tomatoes", "Herbs"],
    tags: ["Vegetarian", "Pasta"],
    dietaryTags: ["Vegetarian", "Lactose-free"],
    pickupTime: "21:00",
    image: "�",
    co2Saved: 1.1,
    urgencyLevel: "low",
    createdAt: "2026-04-09T12:00:00Z",
    isVegan: false,
  },

];

export const initialProfile: UserProfile = {
  name: "Alex Korhonen",
  email: "alex.korhonen@student.lut.fi",
  isVerified: false,
  totalSaved: 45.5,
  co2Prevented: 12,
  ordersCount: 18,
  favoriteCanteens: [],
  guildId: null,
};

export function getGuildById(id: string): Guild | undefined {
  return guilds.find((g) => g.id === id);
}

export function getTodaySavedByGuild(guildId: string): number {
  // Mock function - in real app would query daily stats
  const guild = getGuildById(guildId);
  if (!guild) return 0;
  return Math.round(guild.co2Saved * 0.1);
}

export function getMealsByCanteen(canteenId: string): Meal[] {
  return meals.filter((m) => m.canteenId === canteenId);
}

export function getMealById(id: string): Meal | undefined {
  return meals.find((m) => m.id === id);
}

export function getCanteenById(id: string): Canteen | undefined {
  return canteens.find((c) => c.id === id);
}

export function getAllUniqueTags(): string[] {
  const tags = new Set<string>();
  meals.forEach((m) => m.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}
