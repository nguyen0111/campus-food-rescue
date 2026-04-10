"use client";

import { useApp } from "@/context/AppContext";
import { Leaf, PartyPopper, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
}

export default function SuccessModal() {
  const { showSuccessModal, closeSuccessModal, lastOrderCO2 } = useApp();
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const router = useRouter();

  const handleClose = useCallback(() => {
    closeSuccessModal();
    router.push("/order");
  }, [closeSuccessModal, router]);

  useEffect(() => {
    if (showSuccessModal) {
      // Generate confetti pieces
      const pieces: ConfettiPiece[] = [];
      const colors = ["#1B5E20", "#2E7D32", "#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9", "#FFC107", "#FF9800"];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
        });
      }
      setConfetti(pieces);

      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, handleClose]);

  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm animate-confetti"
            style={{
              left: `${piece.x}%`,
              top: "-10px",
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-modal-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-forest-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PartyPopper size={40} className="text-forest" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Thank you for rescuing!
          </h2>

          {/* CO2 Message */}
          <div className="bg-forest-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Leaf size={20} className="text-forest" />
              <span className="text-2xl font-bold text-forest">{lastOrderCO2}kg</span>
            </div>
            <p className="text-sm text-forest-light">
              of CO₂ emissions prevented!
            </p>
          </div>

          {/* Impact Message */}
          <p className="text-xs text-gray-500 leading-relaxed">
            You&apos;re making a real difference. Every rescued meal helps reduce food waste and fight climate change.
          </p>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="mt-4 w-full bg-forest text-white font-semibold py-3 rounded-xl text-sm hover:bg-forest-light active:scale-[0.98] transition-all"
          >
            View My Order
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
        @keyframes modal-in {
          0% {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
