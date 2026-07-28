import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const Promise = () => {
  const promises = [
    {
      id: 1,
      title: "Free Shipping",
      description: "Free delivery on all qualified items.",
      icon: <Truck size={20} />,
    },
    {
      id: 2,
      title: "Secure Checkout",
      description: "100% encrypted & safe payment methods.",
      icon: <ShieldCheck size={20} />,
    },
    {
      id: 3,
      title: "Easy Returns",
      description: "Simple 7-day hassle-free return policy.",
      icon: <RotateCcw size={20} />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Dedicated assistance whenever you need it.",
      icon: <Headphones size={20} />,
    },
  ];

  return (
    <section className="my-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Why Choose SkyMart?</h2>
        <p className="mt-1 text-xs text-slate-400">Our promise for a smooth shopping experience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900 p-5 text-center transition-colors hover:border-slate-700"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
              {item.icon}
            </div>
            <h3 className="text-base font-bold text-white">{item.title}</h3>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promise;
