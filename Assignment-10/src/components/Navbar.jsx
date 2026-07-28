import React, { useContext, useState } from "react";
import { ShoppingBag, ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const Navbar = () => {
  let naviget = useNavigate();

  let { currentUser, setCurrentUser } = useContext(MyStore);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B1020]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            onClick={() => naviget("/welcome/home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400">
              <ShoppingBag className="text-white" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">SkyMart</h2>

              <p className="text-xs text-slate-400">Modern Shopping</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-slate-700 bg-[#151D31] p-2">
            <button
              onClick={() => naviget("/welcome/home")}
              className={`rounded-full px-5 py-2 ${
                location.pathname === "/welcome/home"
                  ? "bg-cyan-500 text-black cursor-pointer"
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => naviget("/welcome/shop")}
              className={`rounded-full px-5 py-2 ${
                location.pathname === "/welcome/shop"
                  ? "bg-cyan-500 text-black cursor-pointer"
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
              }`}
            >
              Shop
            </button>

            <button
              onClick={() => naviget("/welcome/about")}
              className={`rounded-full px-5 py-2 ${
                location.pathname === "/welcome/about"
                  ? "bg-cyan-500 text-black cursor-pointer"
                  : "text-slate-300 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
              }`}
            >
              About
            </button>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            {/* User */}
            <div className="group flex cursor-pointer items-center gap-4 rounded-full border border-slate-700 bg-[#151D31] px-3 py-2 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-indigo-500/10 hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <User size={18} className="text-black" />
              </div>

              <span className="text-lg text-white">
                {currentUser.username.toUpperCase()}
              </span>
            </div>

            {/* Cart */}
            <button
              onClick={() => naviget("/welcome/cart")}
              className="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-700 bg-[#151D31] px-5 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-indigo-500/10 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <ShoppingCart
                size={18}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12"
              />
              Cart
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                naviget("/");
                localStorage.removeItem("currentUser");
                setCurrentUser(null);
              }}
              className="group cursor-pointer rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 active:scale-95"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Cart */}
            <button
              onClick={() => naviget("/welcome/cart")}
              className="rounded-xl border border-slate-700 bg-[#151D31] p-2 text-white transition hover:border-cyan-500 hover:text-cyan-400"
            >
              <ShoppingCart size={22} />
            </button>

            {/* Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl border border-slate-700 bg-[#151D31] p-2 text-white transition hover:border-cyan-500 hover:text-cyan-400"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-[#10182D] lg:hidden">
          <div className="flex flex-col gap-2 p-4">
            <button
              onClick={() => {
                naviget("/welcome/home");
                setIsMenuOpen(false);
              }}
              className="rounded-xl px-4 py-3 text-left text-white transition hover:bg-cyan-500/10"
            >
              Home
            </button>

            <button
              onClick={() => {
                naviget("/welcome/shop");
                setIsMenuOpen(false);
              }}
              className="rounded-xl px-4 py-3 text-left text-white transition hover:bg-cyan-500/10"
            >
              Shop
            </button>

            <button
              onClick={() => {
                naviget("/welcome/about");
                setIsMenuOpen(false);
              }}
              className="rounded-xl px-4 py-3 text-left text-white transition hover:bg-cyan-500/10"
            >
              About
            </button>

            <div className="mt-2 rounded-xl border border-slate-700 bg-[#151D31] p-4">
              <p className="text-sm text-slate-400">Logged in as</p>
              <p className="font-semibold text-white">
                {currentUser.username.toUpperCase()}
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                setCurrentUser(null);
                naviget("/");
              }}
              className="mt-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
