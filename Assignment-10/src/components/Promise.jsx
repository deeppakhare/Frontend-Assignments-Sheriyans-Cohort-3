import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const Promise = () => {
  const promises = [
    {
      id: 1,
      title: "Free Shipping",
      description: "Enjoy free shipping on orders over $50.",
      icon: <Truck size={28} />,
      bg: "bg-lime-500/10",
      color: "text-lime-400",
    },
    {
      id: 2,
      title: "Secure Payment",
      description: "100% secure payment with trusted gateways.",
      icon: <ShieldCheck size={28} />,
      bg: "bg-cyan-500/10",
      color: "text-cyan-400",
    },
    {
      id: 3,
      title: "Easy Returns",
      description: "7-day hassle-free returns on every product.",
      icon: <RotateCcw size={28} />,
      bg: "bg-orange-500/10",
      color: "text-orange-400",
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "We're always here whenever you need help.",
      icon: <Headphones size={28} />,
      bg: "bg-violet-500/10",
      color: "text-violet-400",
    },
  ];

  return (
    <section className="pt-6 pb-2">
      {/* Heading */}

      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Why Shop With Us?
        </h2>

        <p className="mt-3 text-slate-400">
          Everything you need for a smooth shopping experience.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {promises.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl border border-slate-800 bg-[#151D31] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500"
          >
            {/* Icon */}

            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>

            {/* Title */}

            <h3 className="mt-8 text-3xl font-bold text-white">{item.title}</h3>

            {/* Description */}

            <p className="mt-5 leading-8 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promise;
