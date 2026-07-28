import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070B18]">
      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* Top */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400">
                <ShoppingBag className="text-white" size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">SkyMart</h2>

                <p className="text-sm text-slate-400">
                  Crafted for fast, enjoyable shopping.
                </p>
              </div>
            </div>
          </div>

          {/* Center */}

          

          {/* Right */}

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#151D31] text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer">
              <FaGithub size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#151D31] text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer">
              <FaLinkedin size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-[#151D31] text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 cursor-pointer">
              <FaInstagram size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-slate-800"></div>

        {/* Bottom */}

        <div className="flex flex-col gap-3 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SkyMart. All rights reserved.</p>

          <p>Built with using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
