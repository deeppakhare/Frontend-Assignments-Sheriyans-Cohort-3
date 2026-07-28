import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, CreditCard, ShoppingCart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { cartItems, setCartItems, subtotal, shipping, total } = useContext(MyStore);

  const itemCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setCartItems([]);
        navigate("/welcome/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigate, setCartItems]);

  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Shopping Cart
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your Order Summary
            </h1>
          </div>

          <button
            onClick={() => navigate("/welcome/shop")}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white cursor-pointer w-fit"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
        </div>

        {/* Cart Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left Column: Cart Items List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                  <ShoppingCart size={18} />
                </div>
                <h2 className="text-lg font-bold text-white">Selected Products</h2>
              </div>
              <span className="text-xs font-medium text-slate-400">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 py-16 text-center">
                <ShoppingCart size={40} className="mb-3 text-slate-600" />
                <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Browse our catalog and add your favorite items.
                </p>
                <button
                  onClick={() => navigate("/welcome/shop")}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartProduct key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-400">
                <CreditCard size={18} />
              </div>
              <h2 className="text-lg font-bold text-white">Order Total</h2>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Items Count</span>
                <span className="font-semibold text-white">{itemCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">${(subtotal || 0).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-400">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">Total Amount</span>
                  <span className="text-xl font-bold text-blue-400">
                    ${(total || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                disabled={cartItems.length === 0}
                className={`mt-4 h-11 w-full rounded-lg text-sm font-semibold transition-colors ${
                  cartItems.length === 0
                    ? "cursor-not-allowed bg-slate-800 text-slate-500"
                    : "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                }`}
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400">
              <CheckCircle size={32} />
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">Order Confirmed!</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Thank you for your purchase with SkyMart. Your order has been received.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">Redirecting to homepage...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
