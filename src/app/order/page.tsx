"use client";

import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";
import { getMealById, Order } from "@/lib/data";
import { ArrowRight, CheckCircle, Clock, Leaf, MapPin, QrCode, ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderPage() {
  const router = useRouter();
  const { currentOrder, orders, clearCurrentOrder } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const displayedOrder = selectedOrder || currentOrder;

  return (
    <div className="min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-forest text-white px-5 pt-12 pb-6">
        <h1 className="text-xl font-bold">My Orders</h1>
        <p className="text-forest-200 text-sm">Track your food rescues</p>
      </div>

      <div className="px-5 pt-5 pb-4 max-w-lg mx-auto">
        {/* Order Detail View (QR Code) */}
        {displayedOrder && (
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-forest-100">
              {/* Header with close button for selected orders */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={24} className="text-forest" />
                  <span className="font-bold text-forest text-sm">
                    {selectedOrder ? "Order Details" : "Order Confirmed!"}
                  </span>
                </div>
                {selectedOrder && (
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                )}
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center mb-4">
                <div className="w-44 h-44 bg-forest-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-forest-200">
                  <QrCode size={64} className="text-forest mb-2" />
                  <span className="text-[10px] text-forest font-semibold">
                    {displayedOrder.qrCode}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-forest-50 rounded-xl p-3.5 mb-4">
                <p className="text-sm font-semibold text-forest text-center">
                  Show this code to the canteen staff
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <MapPin size={14} className="text-forest-light" />
                  <span className="text-xs text-forest-light">
                    {displayedOrder.canteenName}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Clock size={14} className="text-forest-light" />
                  <span className="text-xs text-forest-light">
                    Before {displayedOrder.pickupTime}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Leaf size={14} className="text-forest-light" />
                  <span className="text-xs text-forest-light">
                    You saved {displayedOrder.co2Saved}kg CO₂
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-100 pt-3">
                {displayedOrder.items.map((item) => {
                  const meal = getMealById(item.mealId);
                  return (
                    <div
                      key={item.mealId}
                      className="flex items-center justify-between py-1.5"
                    >
                      <span className="text-sm text-gray-700">
                        {meal?.image} {meal?.title}
                      </span>
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    </div>
                  );
                })}
                <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-semibold text-gray-900">Total</span>
                  <span className="text-sm font-bold text-forest">
                    €{displayedOrder.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {!selectedOrder && (
              <button
                onClick={() => {
                  clearCurrentOrder();
                  router.push("/");
                }}
                className="mt-4 w-full bg-forest text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-forest-light active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Back to Feed
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* All Orders List */}
        {orders.length > 0 && (
          <div>
            <h2 className="font-bold text-sm text-gray-900 mb-3">
              {selectedOrder ? "All Orders" : "Past Orders"}
            </h2>
            <div className="flex flex-col gap-2.5">
              {orders
                .filter((o) => displayedOrder?.id !== o.id)
                .map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white rounded-xl p-3.5 border border-gray-100 flex items-center gap-3 text-left hover:shadow-md transition-shadow active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center">
                      <ShoppingBag size={18} className="text-forest" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {order.canteenName}
                      </p>
                      <p className="text-xs text-gray-mid">
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} ·
                        Pickup {order.pickupTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-forest block">
                        €{order.totalPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {order.co2Saved}kg CO₂ saved
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && !currentOrder && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-gray-500 text-sm">No orders yet.</p>
            <p className="text-gray-400 text-xs mt-1">
              Rescue some food from the feed!
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-forest text-white font-semibold py-3 px-8 rounded-xl text-sm hover:bg-forest-light transition-colors"
            >
              Browse Meals
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
