import React, { useContext } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";
import toast from "react-hot-toast";

const ProductCard = ({ product, isInCart }) => {
  let { cartItems, setCartItems } = useContext(MyStore);

  let addToCart = (e) => {
    e.stopPropagation();
    setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    toast.success("Added to cart successfully! 🛍️");
  };

  let navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/welcome/shop/${product.id}`)}
      className="group overflow-hidden rounded-3xl border border-slate-800 bg-[#10182D] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer"
    >
      {/* Top */}

      <div className="relative border-b border-slate-800 p-5">
        {/* Category */}

        <span className="absolute left-5 top-5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium capitalize text-cyan-400">
          {product.category}
        </span>

        {/* Rating */}

        <div className="absolute right-5 top-5 flex items-center gap-1 text-yellow-400">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-medium text-white">
            {product.rating.rate}
          </span>
        </div>

        {/* Image */}

        <div className="flex h-60 items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 object-contain transition duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Bottom */}

      <div className="space-y-4 p-5">
        {/* Title */}

        <h2 className="line-clamp-2 text-lg font-semibold text-white">
          {product.title}
        </h2>

        {/* Description */}

        <p className="line-clamp-3 text-sm leading-6 text-slate-400">
          {product.description}
        </p>

        {/* Price + Button */}

        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-cyan-400">${product.price}</h3>

          {isInCart ? (
            <button
              disabled
              className="flex cursor-not-allowed items-center gap-2 rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white"
            >
              ✓ Added
            </button>
          ) : (
            <button
              onClick={addToCart}
              className="flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
