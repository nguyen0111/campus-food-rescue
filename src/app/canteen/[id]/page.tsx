"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star, Globe, Phone, Share2, Heart, Clock } from "lucide-react";
import { getCanteenById, getMealsByCanteen } from "@/lib/data";
import { useApp } from "@/context/AppContext";
import MealCard from "@/components/MealCard";
import BottomNav from "@/components/BottomNav";

export default function CanteenDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile, toggleFavoriteCanteen } = useApp();

  const canteen = getCanteenById(params.id as string);

  if (!canteen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light">
        <p className="text-gray-500">Canteen not found.</p>
      </div>
    );
  }

  const meals = getMealsByCanteen(canteen.id);
  const isFavorite = profile.favoriteCanteens?.includes(canteen.id) || false;

  // Calculate rating distribution
  const ratingDistribution = { good: 62, ok: 37, bad: 0 }; // Mock distribution

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: canteen.name,
        text: `Check out ${canteen.name} on Savedteen!`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-forest-200 mb-4 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight">{canteen.name}</h1>
            <p className="text-forest-200 text-sm mt-1 flex items-center gap-1">
              <MapPin size={14} />
              {canteen.address}
            </p>
          </div>
          <button
            onClick={() => toggleFavoriteCanteen(canteen.id)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Heart
              size={24}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-white"}
            />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm">{canteen.rating}</span>
          </div>
          <span className="text-sm text-forest-200">
            {canteen.reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-100 px-5 py-4">
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          <a
            href={canteen.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-forest-50 transition-colors">
              <Globe size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-600">Website</span>
          </a>
          
          <a
            href={`tel:${canteen.phone}`}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-forest-50 transition-colors">
              <Phone size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-600">Call</span>
          </a>
          
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-forest-50 transition-colors">
              <Share2 size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-600">Share</span>
          </button>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-gray-700" />
            </div>
            <span className="text-xs text-gray-600">11:00-13:30</span>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-200 h-32 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-100 to-forest-200" />
        <div className="relative z-10 text-center">
          <MapPin size={32} className="text-forest mx-auto mb-1" />
          <p className="text-sm text-forest font-medium">{canteen.city}</p>
        </div>
      </div>

      <div className="px-5 pt-5 pb-4 max-w-lg mx-auto">
        {/* Reviews Summary */}
        <div className="mb-6">
          <h2 className="font-bold text-sm text-gray-900 mb-3">
            {canteen.reviewCount} reviews
          </h2>
          
          {/* Rating Bars */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-12">😊 Good</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${ratingDistribution.good}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 w-10">{ratingDistribution.good}%</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-12">😐 OK</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${ratingDistribution.ok}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 w-10">{ratingDistribution.ok}%</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-12">😞 Bad</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-400 rounded-full"
                  style={{ width: `${ratingDistribution.bad}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 w-10">{ratingDistribution.bad}%</span>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="mb-6">
          <h2 className="font-bold text-sm text-gray-900 mb-3">Recent Reviews</h2>
          <div className="space-y-3">
            {canteen.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-forest-50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-forest">
                        {review.userName.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.userName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Meals */}
        {meals.length > 0 && (
          <div>
            <h2 className="font-bold text-sm text-gray-900 mb-3">Available Rescue Meals</h2>
            <div className="flex flex-col gap-2.5">
              {meals.map((meal) => (
                <MealCard 
                  key={meal.id} 
                  meal={meal} 
                  canteen={canteen}
                  isVerified={profile.isVerified}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
