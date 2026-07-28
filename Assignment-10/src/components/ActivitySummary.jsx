import React, { useContext } from "react";
import { ShoppingCart, Wallet, Star, Tags } from "lucide-react";
import { MyStore } from "../context/MyContext";

const ActivitySummary = () => {
  const { total, cartItems, apiData } = useContext(MyStore);

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const topCount = apiData?.filter((item) => item.rating?.rate > 3).length || 0;
  const categoryCount = new Set(apiData?.map((item) => item.category)).size || 0;

  const summary = [
    {
      id: 1,
      icon: <ShoppingCart size={18} />,
      value: `${cartCount}`,
      title: "Cart Items",
      subtitle: "Items in cart",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      id: 2,
      icon: <Wallet size={18} />,
      value: `$${(total || 0).toFixed(2)}`,
      title: "Subtotal",
      subtitle: "Current total",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      id: 3,
      icon: <Star size={18} />,
      value: `${topCount}`,
      title: "Top Rated",
      subtitle: "4+ Star products",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      id: 4,
      icon: <Tags size={18} />,
      value: `${categoryCount}`,
      title: "Categories",
      subtitle: "Available sections",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    },
  ];

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-slate-700"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${item.badgeColor}`}
            >
              {item.icon}
            </div>

            <div>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <h3 className="text-xs font-semibold text-slate-300">{item.title}</h3>
              <p className="text-[11px] text-slate-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySummary;
