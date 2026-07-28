import React, { useContext } from "react";
import { Laptop, Gem, Shirt, Handbag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const ShopByCategory = () => {
  let naviget = useNavigate();
  let { selectCategory, setSelectCategory } = useContext(MyStore);

  const categories = [
    {
      id: 1,
      title: "Electronics",
      description: "Discover premium gadgets and accessories.",
      icon: <Laptop size={22} />,
      color: "bg-cyan-500/10 text-cyan-400",
      value: "electronics",
    },
    {
      id: 2,
      title: "Jewelery",
      description: "Elegant collections for every occasion.",
      icon: <Gem size={22} />,
      color: "bg-yellow-500/10 text-yellow-400",
      value: "jewelery",
    },
    {
      id: 3,
      title: "Men's Clothing",
      description: "Premium fashion for everyday style.",
      icon: <Shirt size={22} />,
      color: "bg-indigo-500/10 text-indigo-400",
      value: "men's clothing",
    },
    {
      id: 4,
      title: "Women's Clothing",
      description: "Trending outfits and latest collections.",
      icon: <Handbag size={22} />,
      color: "bg-pink-500/10 text-pink-400",
      value: "women's clothing",
    },
  ];

  return (
    <section className="my-8 rounded-3xl border border-slate-800 bg-[#10182D] p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Categories
          </p>

          <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
        </div>

        <button
          onClick={() => naviget("/welcome/shop")}
          className="rounded-xl border border-slate-700 bg-[#1A2238] px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer"
        >
          Browse All
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((item) => (
          <div
            onClick={() => {
              setSelectCategory(item.value);
              naviget("/welcome/shop");
            }}
            key={item.id}
            className="group rounded-2xl border border-slate-700 bg-[#151D31] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 cursor-pointer"
          >
            {/* Icon */}

            <div
              className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
            >
              {item.icon}
            </div>

            {/* Title */}

            <h3 className="text-xl font-semibold text-white">{item.title}</h3>

            {/* Description */}

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {item.description}
            </p>

            {/* Button */}

            <button className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-400 transition group-hover:gap-3">
              Explore
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
