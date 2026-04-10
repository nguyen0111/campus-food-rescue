"use client";

import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { Award, Droplets, Flame, Leaf, PiggyBank, TrendingUp } from "lucide-react";

export default function ImpactPage() {
  const { profile } = useApp();

  const stats = [
    {
      icon: PiggyBank,
      label: "Total Money Saved",
      value: `€${profile.totalSaved.toFixed(2)}`,
      color: "text-forest",
      bg: "bg-forest-50",
    },
    {
      icon: Leaf,
      label: "CO₂ Emissions Prevented",
      value: `${profile.co2Prevented}kg`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Droplets,
      label: "Water Saved (est.)",
      value: `${Math.round(profile.co2Prevented * 45)}L`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Flame,
      label: "Meals Rescued",
      value: `${profile.ordersCount}`,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const achievements = [
    { emoji: "🌱", title: "First Rescue", desc: "Rescued your first meal", unlocked: profile.ordersCount >= 1 },
    { emoji: "🌳", title: "Eco Warrior", desc: "Saved over 5kg CO₂", unlocked: profile.co2Prevented >= 5 },
    { emoji: "💰", title: "Budget Master", desc: "Saved over €20", unlocked: profile.totalSaved >= 20 },
    { emoji: "🏆", title: "Rescue Champion", desc: "Rescued 10+ meals", unlocked: profile.ordersCount >= 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={22} />
          <h1 className="text-xl font-bold">Impact Dashboard</h1>
        </div>
        <p className="text-forest-200 text-sm">Your contribution to a sustainable campus</p>
      </div>

      <div className="px-5 pt-5 pb-4 max-w-lg mx-auto">
        {/* Hero Stat */}
        <div className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-5 text-white mb-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf size={28} />
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium">Total Impact Score</p>
              <p className="text-3xl font-bold">
                {Math.round(profile.totalSaved + profile.co2Prevented * 2)}
              </p>
              <p className="text-white/60 text-[10px]">points earned</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}
                >
                  <Icon size={18} className={stat.color} />
                </div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-[11px] text-gray-mid leading-tight">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-bold text-sm text-gray-900 mb-3">
            <Award size={16} />
            Achievements
          </h2>
          <div className="flex flex-col gap-2.5">
            {achievements.map((a) => (
              <div
                key={a.title}
                className={`bg-white rounded-xl p-3.5 border flex items-center gap-3 ${
                  a.unlocked
                    ? "border-forest-200 shadow-sm"
                    : "border-gray-100 opacity-50"
                }`}
              >
                <span className="text-2xl">{a.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {a.title}
                    {!a.unlocked && (
                      <span className="text-[10px] text-gray-mid ml-2 font-normal">
                        Locked
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-mid">{a.desc}</p>
                </div>
                {a.unlocked && (
                  <span className="text-[10px] font-bold text-forest bg-forest-50 px-2 py-1 rounded-full">
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-forest-50 rounded-xl p-4 border border-forest-100">
          <p className="text-xs text-forest font-semibold mb-1">Did you know?</p>
          <p className="text-xs text-forest-light leading-relaxed">
            Food waste accounts for 8-10% of global greenhouse gas emissions. Every meal
            you rescue makes a real difference! 🌍
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
