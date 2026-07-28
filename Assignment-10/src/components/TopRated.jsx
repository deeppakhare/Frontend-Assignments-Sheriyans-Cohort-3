import React, { useContext } from "react";
import { ArrowRight, Star } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { useNavigate } from "react-router";

const TopRated = () => {
  const { apiData, setSortBy } = useContext(MyStore);
  const navigate = useNavigate();

  const topRatedProducts = [...apiData]
    .filter((item) => item.rating?.rate > 3)
    .slice(0, 5);

  return (
    <section className="my-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Highly Recommended
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">Top Rated Products</h2>
        </div>

        <button
          onClick={() => {
            setSortBy("top-rated");
            navigate("/welcome/shop");
          }}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
        >
          View Top Rated
        </button>
      </div>

      {/* Product Rows */}
      <div className="space-y-3">
        {topRatedProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/welcome/shop/${item.id}`)}
            className="group flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 transition-colors hover:border-slate-700 hover:bg-slate-950 cursor-pointer"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 font-semibold text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <span>{item.rating?.rate}</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="font-bold text-slate-200">${item.price}</span>
                </div>
              </div>
            </div>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
