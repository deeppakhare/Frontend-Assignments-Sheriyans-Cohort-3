import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, CreditCard, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { cartItems, setCartItems } = useContext(MyStore);

 let {
   subtotal,
   setSubtotal,
   shipping,
   setShipping,
   total,
   setTotal,
 } = useContext(MyStore);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        setCartItems([]);
        navigate("/welcome/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Your Order
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
              Shopping <span className="text-cyan-400">Cart</span>
            </h1>

            <p className="mt-3 text-slate-400">
              Review your selected products before checkout.
            </p>
          </div>

          <button
            onClick={() => navigate("/welcome/shop")}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-[#151D31] px-6 text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>

        {/* Layout */}

        <div className="grid gap-8 lg:grid-cols-[2fr_380px]">
          {/* Left */}

          <div className="rounded-3xl border border-slate-800 bg-[#10182D] p-6">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <ShoppingCart size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Cart Items
                </h2>

                <p className="text-sm text-slate-400">
                  {cartItems.length} Product
                  {cartItems.length !== 1 && "s"}
                </p>
              </div>
            </div>

            {/* Products */}

            {cartItems.length === 0 ? (
              <div className="flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-700 bg-[#151D31]">
                <ShoppingCart size={55} className="mb-5 text-slate-500" />

                <h2 className="text-2xl font-semibold text-white">
                  Your Cart is Empty
                </h2>

                <p className="mt-2 text-slate-400">
                  Add some products to your cart.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <CartProduct key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>

          {/* Right */}

          <div className="h-fit rounded-3xl border border-slate-800 bg-[#10182D] p-6">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <CreditCard size={24} />
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Order Summary
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between text-slate-400">
                <span>Products</span>

                <span>{cartItems.length}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Shipping</span>

                <span className="text-green-400">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>

              <div className="border-t border-slate-700 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-cyan-400">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                disabled={cartItems.length === 0}
                className={`mt-3 h-14 w-full rounded-2xl text-lg font-semibold transition ${
                  cartItems.length === 0
                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                    : "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:scale-[1.02] cursor-pointer"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="w-[90%] max-w-md rounded-3xl bg-[#10182D] p-8 text-center shadow-2xl border border-cyan-500/20 animate-pulse">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-white shadow-lg">
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Order Placed!
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              Thank you for shopping with us.
              <br />
              Your order has been placed successfully.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
