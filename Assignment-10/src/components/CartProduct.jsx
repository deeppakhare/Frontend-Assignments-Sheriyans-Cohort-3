import React, { useContext } from "react";
import { Minus, Plus, Trash2, Star } from "lucide-react";
import { MyStore } from "../context/MyContext";

const CartProduct = ({ product }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    deleteProductInCart,
  } = useContext(MyStore);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left section: image + info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-white p-2">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <span className="text-[11px] font-medium capitalize text-blue-400">
            {product.category}
          </span>
          <h3 className="truncate text-sm font-semibold text-white">
            {product.title}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Unit Price:</span>
            <span className="font-semibold text-slate-200">${product.price}</span>
          </div>
        </div>
      </div>

      {/* Right section: quantity stepper + total + delete */}
      <div className="flex items-center justify-between gap-4 border-t border-slate-800/80 pt-3 sm:border-t-0 sm:pt-0 sm:justify-end">
        {/* Quantity Controls */}
        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950">
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="flex h-8 w-8 items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-xs font-bold text-white">
            {product.quantity}
          </span>
          <button
            onClick={() => increaseQuantity(product.id)}
            className="flex h-8 w-8 items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[70px]">
          <span className="text-[10px] text-slate-400 block">Total</span>
          <span className="text-sm font-bold text-white">
            ${(product.price * product.quantity).toFixed(2)}
          </span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => deleteProductInCart(product.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-600/20 hover:text-red-400 transition-colors cursor-pointer"
          title="Remove from cart"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
