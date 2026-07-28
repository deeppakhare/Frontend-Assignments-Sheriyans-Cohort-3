import React, { useContext } from "react";
import { Minus, Plus, Trash2, Star } from "lucide-react";
import { MyStore } from "../context/MyContext";

const CartProduct = ({ product }) => {
  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    deleteProductInCart,
  } = useContext(MyStore);

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#151D31] p-5 transition hover:border-cyan-500">
      <div className="flex flex-col gap-5 md:flex-row">
        {/* Product Image */}

        <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-[#10182D] md:h-36 md:w-36">
          <img
            src={product.image}
            alt={product.title}
            className="h-28 object-contain"
          />
        </div>

        {/* Product Details */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium capitalize text-cyan-400">
              {product.category}
            </span>

            <h2 className="mt-3 text-xl font-semibold text-white line-clamp-2">
              {product.title}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-yellow-400">
              <Star size={16} fill="currentColor" />

              <span className="text-sm">{product.rating.rate}</span>

              <span className="text-slate-500">({product.rating.count})</span>
            </div>

            <h3 className="mt-4 text-3xl font-bold text-cyan-400">
              ${product.price}
            </h3>
          </div>

          {/* Bottom */}

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Quantity */}

            <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-700">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="flex h-11 w-11 items-center justify-center bg-[#10182D] text-white transition hover:bg-slate-700 cursor-pointer"
              >
                <Minus size={18} />
              </button>

              <div className="flex h-11 w-14 items-center justify-center bg-[#151D31] text-lg font-semibold text-white">
                {product.quantity}
              </div>

              <button
                onClick={() => increaseQuantity(product.id)}
                className="flex h-11 w-11 items-center justify-center bg-[#10182D] text-white transition hover:bg-slate-700 cursor-pointer"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Total + Remove */}

            <div className="flex items-center gap-5">
              <div className="text-right">
                <p className="text-sm text-slate-400">Total</p>

                <h3 className="text-2xl font-bold text-cyan-400">
                  ${(product.price * product.quantity).toFixed(2)}
                </h3>
              </div>

              <button
                onClick={() => deleteProductInCart(product.id)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition hover:bg-red-500 hover:text-white cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
