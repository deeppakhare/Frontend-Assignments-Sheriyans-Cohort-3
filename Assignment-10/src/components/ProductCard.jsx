import React, { useContext } from "react";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";
import toast from "react-hot-toast";

const ProductCard = ({ product, isInCart }) => {
  const { setCartItems } = useContext(MyStore);
  const navigate = useNavigate();

  const addToCart = (e) => {
    e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart successfully! 🛍️");
  };

  return (
    <div
      onClick={() => navigate(`/welcome/shop/${product.id}`)}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700 hover:shadow-md cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative flex h-52 w-full items-center justify-center bg-white p-4">
        {/* Category tag */}
        <span className="absolute left-3 top-3 rounded bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium capitalize text-slate-200 backdrop-blur-xs">
          {product.category}
        </span>

        {/* Rating */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-slate-900/80 px-2 py-0.5 text-[11px] font-semibold text-amber-400 backdrop-blur-xs">
          <Star size={12} fill="currentColor" />
          <span>{product.rating?.rate}</span>
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
            {product.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-xs text-slate-400 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="text-lg font-bold text-white">${product.price}</span>
          </div>

          {isInCart ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/welcome/cart");
              }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-600/30 transition-colors"
            >
              <Check size={14} />
              In Cart
            </button>
          ) : (
            <button
              onClick={addToCart}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
            >
              <ShoppingCart size={14} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
