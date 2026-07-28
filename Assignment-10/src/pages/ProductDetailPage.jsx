import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MyStore } from "../context/MyContext";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  let { id } = useParams();
  const [singleProductData, setSingleProductData] = useState({});
  let { cartItems, setCartItems } = useContext(MyStore);

  let getSingleProductData = async () => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSingleProductData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  let addToCart = (e) => {
    e.stopPropagation();
    setCartItems((prev) => [...prev, { ...singleProductData, quantity: 1 }]);
    toast.success("Added to cart successfully! 🛍️");
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  let isInCart = cartItems.find((val) => val.id === singleProductData.id);

  if (!singleProductData.id) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#10182D]">
        <div className="grid lg:grid-cols-2">
          {/* Left */}

          <div className="flex items-center justify-center border-b border-slate-800 p-8 lg:border-b-0 lg:border-r">
            <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-[#151D31] p-8">
              <img
                src={singleProductData.image}
                alt={singleProductData.title}
                className="max-h-full object-contain transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col p-8 lg:p-10">
            {/* Category */}

            <div>
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium capitalize text-cyan-400">
                {singleProductData.category}
              </span>
            </div>

            {/* Title */}

            <h1 className="mt-6 text-3xl font-bold leading-tight text-white lg:text-4xl">
              {singleProductData.title}
            </h1>

            {/* Rating */}

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="text-xl text-yellow-400">⭐</span>

                <span className="font-semibold text-white">
                  {singleProductData.rating?.rate}
                </span>
              </div>

              <span className="text-slate-500">|</span>

              <p className="text-slate-400">
                {singleProductData.rating?.count} Reviews
              </p>
            </div>

            {/* Price */}

            <h2 className="mt-8 text-5xl font-bold text-cyan-400">
              ${singleProductData.price}
            </h2>

            {/* Description */}

            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold text-white">
                Description
              </h3>

              <p className="leading-8 text-slate-400">
                {singleProductData.description}
              </p>
            </div>

            {/* Features */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-[#151D31] p-4">
                <h4 className="font-semibold text-white">🚚 Fast Delivery</h4>

                <p className="mt-2 text-sm text-slate-400">
                  Estimated delivery in 3-5 business days.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-[#151D31] p-4">
                <h4 className="font-semibold text-white">🔒 Secure Payment</h4>

                <p className="mt-2 text-sm text-slate-400">
                  Safe and encrypted checkout process.
                </p>
              </div>
            </div>

            {/* Button */}

            {isInCart ? (
              <button
                disabled
                className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-green-500 text-lg font-semibold text-white cursor-not-allowed"
              >
                ✓ Added
              </button>
            ) : (
              <button
                onClick={addToCart}
                className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20"
              >
                🛒 Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
