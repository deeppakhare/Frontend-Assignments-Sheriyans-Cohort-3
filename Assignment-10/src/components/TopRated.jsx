import React, { useContext } from "react";
import { ArrowRight, Star } from "lucide-react";
import { MyStore } from "../context/MyContext";
import { useNavigate } from "react-router";

const TopRated = () => {
  let { apiData, sortBy, setSortBy } = useContext(MyStore);
  let navigate = useNavigate();

  const topRatedProducts = [...apiData]
    .filter((item) => item.rating.rate > 3)
    .slice(0, 5);

  return (
    <section className="rounded-3xl border border-slate-800 bg-[#10182D] p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Featured
          </p>

          <h2 className="text-3xl font-bold text-white">Top Rated</h2>
        </div>

        <button
          onClick={() => {
            setSortBy("top-rated");
            navigate("/welcome/shop");
          }}
          className="rounded-xl border border-slate-700 bg-[#1A2238] px-5 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer"
        >
          See All
        </button>
      </div>

      {/* Products */}

      <div className="space-y-4">
        {topRatedProducts.map((item) => (
          <div
            onClick={() => navigate(`/welcome/shop/${item.id}`)}
            key={item.id}
            className="group flex items-center justify-between rounded-2xl border border-slate-700 bg-[#151D31] p-4 transition-all duration-300 hover:border-cyan-500 hover:bg-[#1A2238] cursor-pointer"
          >
            {/* Left */}

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-800">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div>
                <h3 className="font-semibold text-white">{item.price}</h3>

                <div className="mt-1 flex items-center gap-1 text-sm text-yellow-400">
                  <Star size={14} fill="currentColor" />

                  {item.rating.rate}
                </div>
              </div>
            </div>

            {/* Arrow */}

            <button className="rounded-full p-2 text-cyan-400 transition group-hover:translate-x-1">
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
