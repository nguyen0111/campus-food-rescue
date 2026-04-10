"use client";

import BottomNav from "@/components/BottomNav";
import MealCard from "@/components/MealCard";
import { useApp } from "@/context/AppContext";
import { canteens, getGuildById, getTodaySavedByGuild, meals } from "@/lib/data";
import { Globe, Heart, Leaf, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const filterOptions = [
  { value: "latest", label: "Latest", icon: "🕐" },
  { value: "co2", label: "Highest CO₂ Saved", icon: "🌱" },
  { value: "urgent", label: "Most Urgent Rescue", icon: "⏰" },
  { value: "vegan", label: "Vegan", icon: "🥗" },
];

export default function Home() {
  const { searchQuery, setSearchQuery, filterType, setFilterType, profile, toggleFavoriteCanteen } = useApp();

  const filteredMeals = useMemo(() => {
    let result = [...meals];
    
    // Apply filter type
    switch (filterType) {
      case "co2":
        result.sort((a, b) => b.co2Saved - a.co2Saved);
        break;
      case "urgent":
        result.sort((a, b) => {
          const urgencyOrder = { high: 0, medium: 1, low: 2 };
          return urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
        });
        break;
      case "vegan":
        result = result.filter((m) => m.isVegan);
        break;
      case "latest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }
    return result;
  }, [filterType, searchQuery]);

  const canteenTypeIcon: Record<string, string> = {
    student: "🎓",
    business: "💼",
    asian: "🥢",
  };

function ImpactTicker({ profile }: { profile: { guildId: string | null } }) {
  const userGuild = profile.guildId ? getGuildById(profile.guildId) : null;
  const todaySaved = userGuild ? getTodaySavedByGuild(userGuild.id) : 0;
  
  // Calculate total across all guilds for today
  const totalSaved = 42; // Mock total for demo
  
  return (
    <div className="mt-3 bg-forest-light/30 rounded-xl p-3 border border-forest-200/50">
      <div className="flex items-center gap-2 overflow-hidden">
        <Globe size={16} className="text-forest-200 flex-shrink-0" />
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-4 animate-ticker whitespace-nowrap">
            <span className="text-xs text-forest-100">
              Today: <strong className="text-white">{totalSaved}kg</strong> of food saved by all guilds! 🌍
            </span>
            {userGuild && (
              <span className="text-xs text-forest-100">
                Your guild <strong className="text-white">{userGuild.name}</strong> saved <strong className="text-white">{todaySaved}kg</strong> today! 🌱
              </span>
            )}
            <span className="text-xs text-forest-100">
              Join the movement — every meal counts! 💚
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

  const isFavorite = (canteenId: string) => {
    return profile.favoriteCanteens?.includes(canteenId) || false;
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={24} strokeWidth={2.5} />
          <h1 className="text-xl font-bold tracking-tight">Savedteen</h1>
        </div>
        <p className="text-forest-200 text-sm">Rescue food. Save money. Save the planet.</p>

        {/* Search */}
        <div className="mt-4 relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search meals, tags, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-200"
          />
        </div>

        {/* Filter Bar - always visible below search */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterType(filter.value as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                filterType === filter.value
                  ? "bg-white text-forest"
                  : "bg-forest-light/40 text-white border border-forest-200"
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Impact Ticker */}
        <ImpactTicker profile={profile} />
      </div>

      {/* Meal List */}
      <div className="px-4 pt-4 pb-4 max-w-lg mx-auto">
        {/* Grouped by canteen for all filters */}
        {canteens.map((canteen) => {
          // Get meals for this canteen, preserving the sort order from filteredMeals
          const canteenMeals = filteredMeals.filter((m) => m.canteenId === canteen.id);
          if (canteenMeals.length === 0) return null;

          return (
            <div key={canteen.id} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{canteenTypeIcon[canteen.type]}</span>
                <div className="flex-1">
                  <Link href={`/canteen/${canteen.id}`}>
                    <h2 className="font-bold text-sm text-gray-900 hover:text-forest transition-colors">
                      {canteen.name}
                    </h2>
                  </Link>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <MapPin size={10} />
                    {canteen.address}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavoriteCanteen(canteen.id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isFavorite(canteen.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                {canteenMeals.map((meal) => (
                  <MealCard 
                    key={meal.id} 
                    meal={meal} 
                    canteen={canteen}
                    isVerified={profile.isVerified}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {filteredMeals.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-gray-500 text-sm">No meals match your search.</p>
            <p className="text-gray-400 text-xs mt-1">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>

      <BottomNav />

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
