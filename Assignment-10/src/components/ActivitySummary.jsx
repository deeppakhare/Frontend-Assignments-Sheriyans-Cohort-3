import React, { useContext } from "react";
import { ShoppingCart, Wallet, Star, Tags } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { set } from "react-hook-form";

const ActivitySummary = () => {
  let { total, cartItems, apiData } = useContext(MyStore);

  const summary = [
    {
      id: 1,
      icon: <ShoppingCart size={20} />,
      value: `${cartItems.length ? cartItems.length : 0}`,
      title: "Cart Items",
      subtitle: "In your bag",
      color: "bg-cyan-500/10 text-cyan-400",
    },
    {
      id: 2,
      icon: <Wallet size={20} />,
      value: `$${total.toFixed(2)}`,
      title: "Cart Value",
      subtitle: "Ready to checkout",
      color: "bg-green-500/10 text-green-400",
    },
    {
      id: 3,
      icon: <Star size={20} />,
      value: `${apiData.filter((item) => item.rating.rate > 3).length}`,
      title: "Top Products",
      subtitle: "Highly rated",
      color: "bg-yellow-500/10 text-yellow-400",
    },
    {
      id: 4,
      icon: <Tags size={20} />,
      value: `${new Set(apiData.map((item) => item.category)).size}`,
      title: "Categories",
      subtitle: "To explore",
      color: "bg-orange-500/10 text-orange-400",
    },
  ];

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-800 bg-[#151D31] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div>
                <h2 className="text-2xl font-bold text-white">{item.value}</h2>

                <h3 className="mt-1 font-semibold text-white">{item.title}</h3>

                <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySummary;
