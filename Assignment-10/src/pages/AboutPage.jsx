import React, { useContext } from "react";
import {
  ShoppingBag,
  Rocket,
  ShieldCheck,
  Sparkles,
  Code2,
  ArrowRight,
  Database,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const About = () => {
  const navigate = useNavigate();
  const { apiData } = useContext(MyStore);

  const features = [
    {
      icon: <Rocket size={20} />,
      title: "Fast Performance",
      desc: "Optimized React component structure for smooth, fast page transitions.",
    },
    {
      icon: <ShieldCheck size={20} />,
      desc: "Client-side auth logic, protected route guards, and reliable state.",
      title: "Reliable & Secure",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Clean Design",
      desc: "Minimalist, responsive layout designed for an effortless shopping workflow.",
    },
  ];

  const stats = [
    {
      title: "Products",
      value: apiData?.length || 20,
      icon: <ShoppingBag size={18} />,
    },
    {
      title: "Categories",
      value: new Set(apiData?.map((item) => item.category)).size || 4,
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Technologies",
      value: "8+",
      icon: <Code2 size={18} />,
    },
    {
      title: "Data Source",
      value: "FakeStore",
      icon: <Database size={18} />,
    },
  ];

  const tech = [
    "React 19",
    "Tailwind CSS v4",
    "React Router v8",
    "Context API",
    "Local Storage",
    "React Hook Form",
    "FakeStore API",
    "Lucide Icons",
  ];

  return (
    <section className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <ShoppingBag size={28} />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          About SkyMart
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
          SkyMart is a clean, modern e-commerce web application built with React, React Router, and Tailwind CSS.
          It delivers a straightforward shopping experience with catalog filtering, real-time cart state management, and user authentication.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition-colors hover:border-slate-700"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
              {item.icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-blue-400">
          SkyMart Metrics
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                {item.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-white">{item.value}</p>
                <p className="text-[11px] text-slate-400">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Built With Modern Web Tech
        </h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tech.map((item, index) => (
            <span
              key={index}
              className="rounded-full border border-slate-800 bg-slate-950 px-3.5 py-1 text-xs font-medium text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center sm:p-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Ready to Explore Our Catalog?
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Check out our latest products and start shopping today.
        </p>
        <button
          onClick={() => navigate("/welcome/shop")}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
        >
          <span>Go to Shop</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};

export default About;
