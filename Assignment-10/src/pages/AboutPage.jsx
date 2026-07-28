import React, { useContext } from "react";
import {
  ShoppingBag,
  Rocket,
  ShieldCheck,
  Sparkles,
  Code2,
  ArrowRight,
  Database,
  Globe,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/MyContext";

const About = () => {
  const navigate = useNavigate();

  let { apiData } = useContext(MyStore);

  const features = [
    {
      icon: <Rocket size={28} />,
      title: "Fast",
      desc: "Optimized React architecture with reusable components for better performance.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure",
      desc: "Protected routes, authentication and modern frontend development practices.",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Modern",
      desc: "Built using React, Tailwind CSS and responsive UI with premium experience.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  const stats = [
    {
      title: "Products",
      value: apiData.length,
      icon: <ShoppingBag />,
    },
    {
      title: "Categories",
      value: new Set(apiData.map((item) => item.category)).size,
      icon: <LayoutDashboard />,
    },
    {
      title: "Technologies",
      value: "10+",
      icon: <Code2 />,
    },
    {
      title: "API",
      value: "FakeStore",
      icon: <Database />,
    },
  ];

  const tech = [
    "React",
    "Tailwind CSS",
    "React Router",
    "Context API",
    "Local Storage",
    "React Hook Form",
    "FakeStore API",
    "Lucide React",
    "Responsive UI",
    "Vite",
  ];

  return (
    <section className="space-y-12">
      {/* HERO */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#10182D] px-6 py-14 lg:px-16">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-2xl shadow-cyan-500/20">
            <ShoppingBag size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white md:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              SkyMart
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            SkyMart is a modern React E-Commerce project built to practice
            real-world frontend development. The project focuses on beautiful
            UI, reusable components, authentication, API integration and a
            smooth shopping experience across all devices.
          </p>
        </div>
      </div>

      {/* WHY SKYMART */}

      <div>
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            WHY CHOOSE US
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">Why SkyMart?</h2>

          <p className="mt-3 text-slate-400">
            Built with modern technologies and clean UI principles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-800 bg-[#10182D] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-3xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* OUR STORY */}

      <div className="rounded-3xl border border-slate-800 bg-[#10182D] p-8 lg:p-10">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
          <Code2 size={30} />
        </div>

        <h2 className="text-4xl font-bold text-white">Our Story</h2>

        <div className="mt-8 space-y-6 text-lg leading-9 text-slate-400">
          <p>
            SkyMart is a frontend e-commerce application created to practice
            real-world React development. The project focuses on writing clean,
            reusable and scalable code while building a modern shopping
            experience.
          </p>

          <p>
            Throughout the development process, multiple concepts such as
            authentication, protected routes, Context API, Local Storage,
            responsive layouts and API integration have been implemented to
            simulate a production-ready application.
          </p>

          <p>
            Instead of only designing pages, the goal of SkyMart is to build a
            complete shopping platform that demonstrates practical frontend
            skills and modern UI/UX principles.
          </p>
        </div>
      </div>

      {/* PROJECT STATS */}

      <div>
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            PROJECT OVERVIEW
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            SkyMart in Numbers
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-800 bg-[#10182D] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition group-hover:rotate-6">
                {item.icon}
              </div>

              <h3 className="mt-6 text-4xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-3 text-slate-400">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH STACK */}

      <div className="rounded-3xl border border-slate-800 bg-[#10182D] p-8 lg:p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            TECHNOLOGIES
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Built Using Modern Tools
          </h2>

          <p className="mt-3 text-slate-400">
            Technologies used throughout the project.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {tech.map((item, index) => (
            <div
              key={index}
              className="rounded-full border border-slate-700 bg-[#1A2238] px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-lg hover:shadow-cyan-500/20"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* CALL TO ACTION */}

      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-[#10182D] to-indigo-500/10 px-8 py-16 text-center">
        {/* Blur Effects */}

        <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-2xl shadow-cyan-500/20">
            <Globe size={36} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white lg:text-5xl">
            Ready to Start Shopping?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Explore premium products, discover amazing categories and experience
            a beautiful shopping interface built with React and modern frontend
            technologies.
          </p>

          <button
            onClick={() => navigate("/welcome/shop")}
            className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 cursor-pointer"
          >
            Explore Products
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
