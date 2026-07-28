import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";
import { Star, ShoppingCart, ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleProductData, setSingleProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const { cartItems, setCartItems } = useContext(MyStore);

  const getSingleProductData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === singleProductData.id);
      if (existing) {
        return prev.map((item) =>
          item.id === singleProductData.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...singleProductData, quantity: 1 }];
    });
    toast.success("Added to cart successfully! 🛍️");
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  const isInCart = cartItems.some((val) => val.id === singleProductData?.id);

  if (loading || !singleProductData.id) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-slate-400">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        <p className="text-xs">Loading product details...</p>
      </div>
    );
  }

  return (
    <section className="py-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/welcome/shop")}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </button>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="grid lg:grid-cols-2">
          {/* Image Column */}
          <div className="flex items-center justify-center bg-white p-8 lg:p-12">
            <img
              src={singleProductData.image}
              alt={singleProductData.title}
              className="max-h-[360px] w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-600/10 px-2.5 py-1 text-xs font-semibold capitalize text-blue-400">
                  {singleProductData.category}
                </span>

                {singleProductData.rating && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <span>{singleProductData.rating.rate}</span>
                    <span className="text-slate-500 font-normal">
                      ({singleProductData.rating.count} ratings)
                    </span>
                  </div>
                )}
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {singleProductData.title}
              </h1>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  ${singleProductData.price}
                </span>
                <span className="text-xs text-slate-400">Inclusive of all taxes</span>
              </div>

              <div className="mt-6 border-t border-slate-800 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Description
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {singleProductData.description}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <Truck size={18} className="text-blue-400" />
                  <div>
                    <p className="font-semibold text-white">Fast Shipping</p>
                    <p className="text-[11px] text-slate-400">Dispatched in 24 hrs</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <div>
                    <p className="font-semibold text-white">Guaranteed</p>
                    <p className="text-[11px] text-slate-400">7-day return policy</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              {isInCart ? (
                <button
                  onClick={() => navigate("/welcome/cart")}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600/20 text-sm font-semibold text-emerald-400 hover:bg-emerald-600/30 transition-colors cursor-pointer"
                >
                  <Check size={18} />
                  View Item in Cart
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  Add to Shopping Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
