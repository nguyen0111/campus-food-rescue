"use client";

import { Canteen, Meal } from "@/lib/data";
import { Clock, Leaf, MapPin, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

interface MealCardProps {
  meal: Meal;
  canteen: Canteen;
  isVerified: boolean;
  showCanteenName?: boolean;
}

const dietaryTagStyles: Record<string, { bg: string; text: string; label: string }> = {
  "Vegan": { bg: "bg-emerald-50", text: "text-emerald-600", label: "Vegan" },
  "Vegetarian": { bg: "bg-green-50", text: "text-green-600", label: "Veg" },
  "Gluten-free": { bg: "bg-amber-50", text: "text-amber-600", label: "GF" },
  "Lactose-free": { bg: "bg-blue-50", text: "text-blue-600", label: "LF" },
  "Dairy-free": { bg: "bg-purple-50", text: "text-purple-600", label: "DF" },
};

export default function MealCard({ meal, canteen, isVerified, showCanteenName }: MealCardProps) {
  return (
    <Link href={`/meal/${meal.id}`} className="block">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98]">
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center bg-forest-50 rounded-xl">
            {meal.image}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight text-gray-900 truncate">
              {meal.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <UtensilsCrossed size={12} />
                {meal.portionsLeft} left
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                {showCanteenName ? canteen.name : canteen.city}
              </span>
              {meal.urgencyLevel === "high" && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                  <Clock size={10} />
                  Urgent
                </span>
              )}
            </div>
            {/* Dietary Tags */}
            {meal.dietaryTags.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {meal.dietaryTags.map((tag) => {
                  const style = dietaryTagStyles[tag] || { bg: "bg-gray-100", text: "text-gray-600", label: tag };
                  return (
                    <span
                      key={tag}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            {isVerified ? (
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-forest bg-forest-50 px-1.5 py-0.5 rounded-full mb-0.5">
                  Student
                </span>
                <p className="text-lg font-bold text-forest">
                  €{meal.studentPrice.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  Reg €{meal.regularPrice.toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-forest">
                  €{meal.regularPrice.toFixed(2)}
                </p>
                <p className="text-[10px] text-gray-400">
                  Verify for €{meal.studentPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* CO2 saved indicator */}
        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-50">
          <Leaf size={12} className="text-forest" />
          <span className="text-[10px] text-gray-500">
            Save {meal.co2Saved}kg CO₂
          </span>
        </div>
      </div>
    </Link>
  );
}
