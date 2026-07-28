import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-3">
            <div
              onClick={() => navigate("/welcome/home")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                <ShoppingBag size={18} />
              </div>
              <span className="text-lg font-bold text-white">SkyMart</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Simple, reliable, and convenient online shopping for your everyday needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Navigation</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button onClick={() => navigate("/welcome/home")} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/welcome/shop")} className="hover:text-white transition-colors">
                  Shop Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/welcome/about")} className="hover:text-white transition-colors">
                  About SkyMart
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/welcome/cart")} className="hover:text-white transition-colors">
                  View Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Categories</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Electronics</li>
              <li>Jewelry</li>
              <li>Men's Clothing</li>
              <li>Women's Clothing</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Connect</h3>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <p>© 2026 SkyMart. All rights reserved.</p>
          <p>Built cleanly with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
