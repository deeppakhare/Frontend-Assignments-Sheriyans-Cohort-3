import React, { useContext } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const WelcomeSection = () => {
  let naviget = useNavigate()

    let { currentUser } = useContext(MyStore);
  

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-800 bg-[#10182D] p-6 shadow-lg lg:grid-cols-3 lg:p-8">
        {/* Left */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <span className="mb-5 w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300">
            👋 Fresh Deals are waiting
          </span>

          <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
            Welcome Back,
            <span className="text-cyan-400">
              {" "}
              {currentUser.username.toUpperCase()}!
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-slate-400 leading-7">
            Discover today's hand-picked collection across electronics, fashion,
            accessories and premium essentials.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => naviget("/welcome/shop")}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400 cursor-pointer"
            >
              Shop Now
            </button>

            <button
              onClick={() => naviget("/welcome/shop")}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#1A2238] px-6 py-3 font-medium text-white transition hover:border-cyan-500 cursor-pointer"
            >
              View Products
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-700 bg-[#1A2238] p-5 transition hover:border-cyan-500 flex flex-col items-center justify-center">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <ShoppingBag size={24} className="text-cyan-400" />
            </div>

            <h2 className="text-3xl font-bold text-white">20+</h2>

            <p className="mt-2 text-sm text-slate-400">Products Available</p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-[#1A2238] p-5 transition hover:border-cyan-500 flex flex-col items-center justify-center">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              🚚
            </div>

            <h2 className="text-3xl font-bold text-white">Free</h2>

            <p className="mt-2 text-sm text-slate-400">Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;