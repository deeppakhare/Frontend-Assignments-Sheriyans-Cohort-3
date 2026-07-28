import React, { useContext, useState } from "react";
import { ShoppingBag, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { MyStore } from "../context/MyContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, setCurrentUser, cartItems } = useContext(MyStore);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          onClick={() => navigate("/welcome/home")}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">SkyMart</h1>
            <p className="text-[11px] font-medium text-slate-400">Online Store</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/80 p-1.5 text-sm font-medium">
          <button
            onClick={() => navigate("/welcome/home")}
            className={`rounded-full px-5 py-1.5 transition-colors cursor-pointer ${
              isActive("/welcome/home")
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/welcome/shop")}
            className={`rounded-full px-5 py-1.5 transition-colors cursor-pointer ${
              isActive("/welcome/shop") || location.pathname.startsWith("/welcome/shop/")
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            Shop
          </button>

          <button
            onClick={() => navigate("/welcome/about")}
            className={`rounded-full px-5 py-1.5 transition-colors cursor-pointer ${
              isActive("/welcome/about")
                ? "bg-blue-600 text-white font-semibold"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {/* User Profile Tag */}
          {currentUser && (
            <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 font-bold">
                <User size={14} />
              </div>
              <span className="font-medium text-slate-200">
                {currentUser.username || "User"}
              </span>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={() => navigate("/welcome/cart")}
            className={`relative flex items-center gap-2 rounded-full border border-slate-800 px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
              isActive("/welcome/cart")
                ? "border-blue-500 bg-blue-600/10 text-blue-400"
                : "bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ShoppingCart size={17} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              setCurrentUser(null);
              navigate("/");
            }}
            className="flex items-center gap-1.5 rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-red-600/20 hover:text-red-400 cursor-pointer"
            title="Logout"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => navigate("/welcome/cart")}
            className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-200"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-200 hover:bg-slate-800"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate("/welcome/home");
                setIsMenuOpen(false);
              }}
              className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                isActive("/welcome/home")
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate("/welcome/shop");
                setIsMenuOpen(false);
              }}
              className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                isActive("/welcome/shop")
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              Shop Catalog
            </button>

            <button
              onClick={() => {
                navigate("/welcome/about");
                setIsMenuOpen(false);
              }}
              className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium ${
                isActive("/welcome/about")
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              About Us
            </button>

            {currentUser && (
              <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm">
                <span className="text-slate-400">Signed in as:</span>
                <span className="font-semibold text-white">{currentUser.username}</span>
              </div>
            )}

            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                setCurrentUser(null);
                navigate("/");
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-red-600/20 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600/30"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
