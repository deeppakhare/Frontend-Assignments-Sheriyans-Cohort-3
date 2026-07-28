import React, { useContext } from "react";
import { ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const WelcomeSection = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(MyStore);

  const username = currentUser?.username ? currentUser.username : "Guest";

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8 lg:grid-cols-3">
        {/* Main Banner Text */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="mb-3 inline-flex w-fit items-center rounded-md bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            Welcome to SkyMart
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back,{" "}
            <span className="text-blue-400 capitalize">{username}</span>!
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            Explore our latest collection of quality products with fast delivery and seamless checkout.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/welcome/shop")}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
            >
              Shop Catalog
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => navigate("/welcome/about")}
              className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 p-5 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
              <ShoppingBag size={20} />
            </div>
            <span className="text-2xl font-bold text-white">20+</span>
            <span className="mt-1 text-xs text-slate-400">Products</span>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 p-5 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-400">
              <Truck size={20} />
            </div>
            <span className="text-2xl font-bold text-white">Free</span>
            <span className="mt-1 text-xs text-slate-400">Shipping</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;