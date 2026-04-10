"use client";

import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { getGuildById } from "@/lib/data";
import { Trophy, Users, Leaf, Medal, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const { profile, guilds } = useApp();
  const userGuild = profile.guildId ? getGuildById(profile.guildId) : null;

  // Sort guilds by meals rescued (primary) and CO2 saved (secondary)
  const sortedGuilds = [...guilds].sort((a, b) => {
    if (b.mealsRescued !== a.mealsRescued) {
      return b.mealsRescued - a.mealsRescued;
    }
    return b.co2Saved - a.co2Saved;
  });

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown size={24} className="text-yellow-500" />;
    if (index === 1) return <Medal size={20} className="text-gray-400" />;
    if (index === 2) return <Medal size={20} className="text-amber-600" />;
    return <span className="w-6 text-center font-bold text-gray-400">{index + 1}</span>;
  };

  const getRankStyle = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
    if (index === 1) return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200";
    if (index === 2) return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
    return "bg-white border-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-8">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={24} className="text-yellow-300" />
          <h1 className="text-xl font-bold">Guild Leaderboard</h1>
        </div>
        <p className="text-forest-200 text-sm">
          Compete with other student guilds to rescue the most food!
        </p>
      </div>

      <div className="px-5 pt-5 pb-4 max-w-lg mx-auto">
        {/* Your Guild Card */}
        {userGuild && (
          <div className="bg-white rounded-2xl p-5 border border-forest-200 shadow-sm mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center text-white font-bold text-lg">
                {userGuild.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Your Guild</p>
                <h2 className="font-bold text-gray-900">{userGuild.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-forest">#{sortedGuilds.findIndex(g => g.id === userGuild.id) + 1}</p>
                <p className="text-xs text-gray-500">Rank</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-forest-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-forest">{userGuild.mealsRescued}</p>
                <p className="text-[10px] text-forest-light">Meals</p>
              </div>
              <div className="bg-forest-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-forest">{userGuild.co2Saved.toFixed(0)}kg</p>
                <p className="text-[10px] text-forest-light">CO₂ Saved</p>
              </div>
              <div className="bg-forest-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-forest">{userGuild.members}</p>
                <p className="text-[10px] text-forest-light">Members</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rankings</span>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  Meals
                </span>
                <span className="flex items-center gap-1">
                  <Leaf size={12} />
                  CO₂
                </span>
              </div>
            </div>
          </div>

          {sortedGuilds.map((guild, index) => (
            <div
              key={guild.id}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 last:border-b-0 ${
                userGuild?.id === guild.id ? "bg-forest-50/50" : ""
              }`}
            >
              {/* Rank */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                index < 3 ? getRankStyle(index) : ""
              }`}>
                {getRankIcon(index)}
              </div>

              {/* Guild Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">{guild.name}</p>
                <p className="text-[10px] text-gray-500">{guild.members} members</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="font-bold text-sm text-gray-900">{guild.mealsRescued}</p>
                  <p className="text-[10px] text-gray-500">meals</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-forest">{guild.co2Saved.toFixed(0)}kg</p>
                  <p className="text-[10px] text-gray-500">CO₂</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Guild CTA */}
        {!userGuild && (
          <div className="mt-5 bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <Trophy size={20} className="text-amber-600" />
              <h3 className="font-bold text-sm text-amber-900">Join a Guild!</h3>
            </div>
            <p className="text-xs text-amber-700 mb-3">
              Select your student guild in Settings to appear on the leaderboard and contribute to your guild&apos;s score.
            </p>
            <a
              href="/settings"
              className="block w-full bg-amber-600 text-white font-semibold py-3 rounded-xl text-sm text-center hover:bg-amber-700 transition-colors"
            >
              Go to Settings
            </a>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
