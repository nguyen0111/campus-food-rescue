"use client";

import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { getGuildById, guilds } from "@/lib/data";
import {
    Bell,
    CheckCircle2,
    ChevronRight,
    Globe,
    Heart,
    Loader2,
    LogOut,
    ShieldCheck,
    Sparkles,
    User,
    Users
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { profile, verifyStudent, setUserGuild } = useApp();
  const [verifying, setVerifying] = useState(false);
  const [showGuildDropdown, setShowGuildDropdown] = useState(false);
  const userGuild = profile.guildId ? getGuildById(profile.guildId) : null;

  const handleVerify = () => {
    if (profile.isVerified) return;
    setVerifying(true);
    setTimeout(() => {
      verifyStudent();
      setVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-8">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-forest-200 text-sm">Manage your account & preferences</p>
      </div>

      <div className="px-5 pt-5 pb-4 max-w-lg mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-forest-50 rounded-full flex items-center justify-center">
              <User size={28} className="text-forest" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">{profile.name}</h2>
              <p className="text-xs text-gray-mid">{profile.email}</p>
            </div>
            {profile.isVerified && (
              <span className="bg-forest-50 text-forest text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Tuudo Verification - THE KEY FEATURE */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-forest" />
            <h3 className="font-bold text-sm text-gray-900">
              Student Identity
            </h3>
          </div>
          <p className="text-xs text-gray-mid mb-4 leading-relaxed">
            Verify your student status with Tuudo to unlock the cheapest prices
            on campus. Verified students get an extra 15% discount on all meals.
          </p>

          {profile.isVerified ? (
            <div className="bg-forest-50 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-forest" />
              <div>
                <p className="text-sm font-semibold text-forest">
                  Verified with Tuudo
                </p>
                <p className="text-xs text-forest-light">
                  Student discounts unlocked on all meals
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="w-full bg-forest text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-forest-light active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {verifying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying with Tuudo...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Verify with Tuudo
                </>
              )}
            </button>
          )}
        </div>

        {/* Guild Selection */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} className="text-forest" />
            <h3 className="font-bold text-sm text-gray-900">
              Student Guild
            </h3>
          </div>
          <p className="text-xs text-gray-mid mb-4 leading-relaxed">
            Join your student guild to compete on the leaderboard and contribute to your guild&apos;s impact!
          </p>

          <div className="relative">
            <button
              onClick={() => setShowGuildDropdown(!showGuildDropdown)}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium py-3 px-4 rounded-xl text-sm hover:bg-gray-100 transition-all flex items-center justify-between"
            >
              <span>{userGuild?.name || "Select Your Guild"}</span>
              <ChevronRight size={16} className={`text-gray-400 transition-transform ${showGuildDropdown ? "rotate-90" : ""}`} />
            </button>

            {showGuildDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    setUserGuild(null);
                    setShowGuildDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 ${!profile.guildId ? "bg-forest-50 text-forest" : ""}`}
                >
                  No Guild
                </button>
                {guilds.map((guild) => (
                  <button
                    key={guild.id}
                    onClick={() => {
                      setUserGuild(guild.id);
                      setShowGuildDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${profile.guildId === guild.id ? "bg-forest-50 text-forest" : ""}`}
                  >
                    {guild.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {userGuild && (
            <div className="mt-3 bg-forest-50 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-white font-bold">
                {userGuild.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-forest">{userGuild.name}</p>
                <p className="text-xs text-forest-light">
                  {userGuild.mealsRescued} meals rescued • {userGuild.co2Saved.toFixed(0)}kg CO₂ saved
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <SettingsItem
            icon={Bell}
            label="Notifications"
            subtitle="Manage push notifications"
          />
          <SettingsItem
            icon={Globe}
            label="Language"
            subtitle="English"
          />
          <SettingsItem
            icon={Heart}
            label="Dietary Preferences"
            subtitle="Set allergies & preferences"
          />
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <SettingsItem
            icon={Sparkles}
            label="About Savedteen"
            subtitle="v1.0.0 — Made with 💚 at LUT Lahti"
            noChevron
          />
        </div>

        {/* Logout */}
        <button className="w-full bg-white border border-red-100 text-red-500 font-semibold py-3.5 rounded-xl text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2 mb-4">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function SettingsItem({
  icon: Icon,
  label,
  subtitle,
  noChevron = false,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  subtitle: string;
  noChevron?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer">
      <div className="w-9 h-9 bg-gray-light rounded-lg flex items-center justify-center">
        <Icon size={18} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-mid truncate">{subtitle}</p>
      </div>
      {!noChevron && <ChevronRight size={16} className="text-gray-300" />}
    </div>
  );
}
