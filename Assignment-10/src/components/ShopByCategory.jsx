import React, { useContext } from "react";
import { Laptop, Gem, Shirt, ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const ShopByCategory = () => {
  const navigate = useNavigate();
  const { setSelectCategory } = useContext(MyStore);

  const categories = [
    {
      id: 1,
      title: "Electronics",
      description: "Gadgets, audio, and tech accessories.",
      icon: <Laptop size={20} />,
      value: "electronics",
    },
    {
      id: 2,
      title: "Jewelry",
      description: "Rings, necklaces, and fine accessories.",
      icon: <Gem size={20} />,
      value: "jewelery",
    },
    {
      id: 3,
      title: "Men's Clothing",
      description: "Jackets, shirts, and casual wear.",
      icon: <Shirt size={20} />,
      value: "men's clothing",
    },
    {
      id: 4,
      title: "Women's Clothing",
      description: "Coats, tops, and stylish apparel.",
      icon: <ShoppingBag size={20} />,
      value: "women's clothing",
    },
  ];

  return (
    <section className="my-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Browse Collection
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">Shop by Category</h2>
        </div>

        <button
          onClick={() => {
            setSelectCategory("all");
            navigate("/welcome/shop");
          }}
          className="w-fit rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
        >
          View All Products
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectCategory(item.value);
              navigate("/welcome/shop");
            }}
            className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition-all hover:border-blue-500/50 hover:bg-slate-950 cursor-pointer"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {item.description}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <span>Explore</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
