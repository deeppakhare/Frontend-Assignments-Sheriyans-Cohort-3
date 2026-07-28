import React, { useContext } from "react";
import { User, Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/MyContext";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  let { storeUser, setStoreUser } = useContext(MyStore);

  let naviget = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  let createNewuser = (data) => {
    setStoreUser((prev) => {
      let setUser = [...prev, data];
      localStorage.setItem("users", JSON.stringify(setUser));
      reset();
      toast.success("Account created successfully! 🎉");
      naviget("/");
      return setUser;
    });
  };

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="rounded-3xl border border-slate-700/60 bg-[#151D31]/90 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
            <ShoppingBag size={30} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-4xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Join SkyMart and start your shopping journey.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(createNewuser)} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-[#1A2238] px-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <User size={18} className="mr-3 text-slate-400" />

              <input
                {...register("username", {
                  required: "* Name is required",
                  pattern: {
                    value: /^\S.*$/,
                    message: "Blank spaces is not allowed",
                  },
                })}
                type="text"
                placeholder="Enter your full name"
                className="h-12 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {errors.username && (
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-400">
              <span className="text-red-500">⚠</span>
              {errors.username.message}
            </p>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-[#1A2238] px-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Mail size={18} className="mr-3 text-slate-400" />

              <input
                {...register("useremail", {
                  required: "* Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "* Please Enter Valid Email.",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {errors.useremail && (
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-400">
              <span className="text-red-500">⚠</span>
              {errors.useremail.message}
            </p>
          )}

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-[#1A2238] px-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Lock size={18} className="mr-3 text-slate-400" />

              <input
                {...register("userpassword", {
                  required: "* Password is required",
                  minLength: {
                    value: 6,
                    message: "* Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Minimum 6 characters"
                className="h-12 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {errors.userpassword && (
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-red-400">
              <span className="text-red-500">⚠</span>
              {errors.userpassword.message}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/25"
          >
            Create Account
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
