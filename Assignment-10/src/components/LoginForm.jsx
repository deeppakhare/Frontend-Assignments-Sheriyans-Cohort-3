import React, { useContext } from "react";
import { Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MyStore } from "../context/MyContext";

const LoginForm = () => {
  let naviget = useNavigate();

  let { register, handleSubmit, reset } = useForm();

  let { currentUser, setCurrentUser } = useContext(MyStore);

  let loginUser = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (elem) =>
        elem.useremail === data.useremail &&
        elem.userpassword === data.userpassword,
    );

    if (user) {
      toast.success("Login Successful 🎉");

      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user)

      reset();

      naviget("/welcome/home");
    } else {
      toast.error("Invalid Email or Password");
      reset();
    }
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
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          Sign in to continue shopping with SkyMart.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit(loginUser)}
          className="mt-8 space-y-5 flex flex-col gap-4"
        >
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-[#1A2238] px-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Mail size={18} className="mr-3 text-slate-400" />

              <input
                {...register("useremail", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-[#1A2238] px-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Lock size={18} className="mr-3 text-slate-400" />

              <input
                {...register("userpassword", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Button */}

          <button className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/25">
            Sign In
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Divider */}

        <div className="my-7 flex items-center">
          <div className="h-px flex-1 bg-slate-700"></div>

          <span className="text-xs uppercase tracking-widest text-slate-500"></span>

          <div className="h-px flex-1 bg-slate-700"></div>
        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <button
            onClick={() => naviget("/register")}
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
