"use client";

import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { getCanteenById, getMealById } from "@/lib/data";
import { ArrowLeft, Clock, Leaf, Lock, MapPin, ShieldCheck, Tag, UtensilsCrossed } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function MealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, placeOrder, profile } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedPriceType, setSelectedPriceType] = useState<"student" | "regular">("regular");

  const meal = getMealById(params.id as string);
  const canteen = meal ? getCanteenById(meal.canteenId) : undefined;

  if (!meal || !canteen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light">
        <p className="text-gray-500">Meal not found.</p>
      </div>
    );
  }

  const studentTotal = meal.studentPrice * quantity;
  const regularTotal = meal.regularPrice * quantity;
  
  // Calculate savings
  const savings = regularTotal - (selectedPriceType === "student" ? studentTotal : regularTotal);

  const handleAddToOrder = () => {
    const orderItems = [{ mealId: meal.id, quantity }];
    placeOrder(selectedPriceType, orderItems);
    // SuccessModal will handle navigation to /order
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-forest-200 mb-3 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="flex items-center gap-4">
          <div className="text-5xl w-20 h-20 flex items-center justify-center bg-white/10 rounded-2xl">
            {meal.image}
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-lg leading-tight">{meal.title}</h1>
            <p className="text-forest-200 text-sm mt-0.5">{canteen.name}</p>
            <p className="text-forest-200/70 text-xs flex items-center gap-1 mt-1">
              <MapPin size={10} />
              {canteen.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className="flex items-center gap-1 text-sm text-forest-200">
            <UtensilsCrossed size={14} />
            {meal.portionsLeft} portions left
          </span>
          <span className="flex items-center gap-1 text-sm text-forest-200">
            <Leaf size={14} />
            Save {meal.co2Saved}kg CO₂
          </span>
          {meal.urgencyLevel === "high" && (
            <span className="bg-red-500/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Urgent Rescue
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-52 max-w-lg mx-auto">
        {/* Pickup Time Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 mb-5">
          <Clock size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-amber-800">
              Pick up before {meal.pickupTime}
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Arrive on time — uncollected meals go to waste
            </p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-5">
          <h3 className="flex items-center gap-2 font-semibold text-sm text-gray-900 mb-2">
            <Tag size={16} />
            Ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {meal.ingredients.map((ing) => (
              <span
                key={ing}
                className="bg-white border border-gray-200 text-xs text-gray-700 px-3 py-1.5 rounded-full"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-5">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <span
                key={tag}
                className="bg-forest-50 text-forest text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar with Price Selection */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-5 py-4 z-40">
        <div className="max-w-lg mx-auto">
          {/* Price Selection */}
          <div className="mb-4">
            {profile.isVerified ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPriceType("student")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPriceType === "student"
                      ? "border-forest bg-forest-50"
                      : "border-gray-200 hover:border-forest/50"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <ShieldCheck size={14} className="text-forest" />
                    <span className="text-xs font-semibold text-forest">Student</span>
                  </div>
                  <p className="text-lg font-bold text-forest">€{studentTotal.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">€{meal.studentPrice.toFixed(2)} each</p>
                </button>
                <button
                  onClick={() => setSelectedPriceType("regular")}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedPriceType === "regular"
                      ? "border-forest bg-forest-50"
                      : "border-gray-200 hover:border-forest/50"
                  }`}
                >
                  <span className="text-xs font-semibold text-gray-600">Regular</span>
                  <p className="text-lg font-bold text-gray-900">€{regularTotal.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">€{meal.regularPrice.toFixed(2)} each</p>
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Regular Price</p>
                    <p className="text-xs text-gray-500">€{meal.regularPrice.toFixed(2)} per portion</p>
                  </div>
                  <p className="text-2xl font-bold text-forest">€{regularTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 bg-forest-50 rounded-lg p-2.5">
                  <Lock size={14} className="text-forest" />
                  <p className="text-xs text-forest">
                    <span className="font-semibold">Student price €{meal.studentPrice.toFixed(2)}</span> — Verify with Tuudo to unlock
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Pay Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-gray-light rounded-xl px-3 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-50 active:scale-95 transition-transform"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(meal.portionsLeft, quantity + 1))}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-50 active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToOrder}
              className="flex-1 bg-forest text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-forest-light active:scale-[0.98] transition-all shadow-lg shadow-forest/20"
            >
              Pay €{(selectedPriceType === "student" ? studentTotal : regularTotal).toFixed(2)}
            </button>
          </div>
          
          {savings > 0 && (
            <p className="text-center text-xs text-forest mt-2">
              You save €{savings.toFixed(2)} with student price!
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
