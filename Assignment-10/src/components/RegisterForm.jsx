import React, { useContext } from "react";
import { User, Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/MyContext";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { setStoreUser } = useContext(MyStore);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const createNewUser = (data) => {
    setStoreUser((prev) => {
      const updatedUsers = [...(prev || []), data];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      reset();
      toast.success("Account created successfully! Please log in. 🎉");
      navigate("/");
      return updatedUsers;
    });
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShoppingBag size={24} />
        </div>
      </div>

      <h1 className="mt-4 text-center text-xl font-bold tracking-tight text-white sm:text-2xl">
        Create Your Account
      </h1>
      <p className="mt-1 text-center text-xs text-slate-400">
        Join SkyMart for simple & effortless shopping.
      </p>

      <form onSubmit={handleSubmit(createNewUser)} className="mt-6 space-y-4">
        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Full Name
          </label>
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 focus-within:border-blue-500">
            <User size={16} className="mr-2 text-slate-400" />
            <input
              {...register("username", {
                required: "Name is required",
                pattern: {
                  value: /^\S.*$/,
                  message: "Leading spaces not allowed",
                },
              })}
              type="text"
              placeholder="John Doe"
              className="h-10 w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
          {errors.username && (
            <p className="mt-1 text-[11px] text-red-400">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Email Address
          </label>
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 focus-within:border-blue-500">
            <Mail size={16} className="mr-2 text-slate-400" />
            <input
              {...register("useremail", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="name@example.com"
              className="h-10 w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
          {errors.useremail && (
            <p className="mt-1 text-[11px] text-red-400">{errors.useremail.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Password
          </label>
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 focus-within:border-blue-500">
            <Lock size={16} className="mr-2 text-slate-400" />
            <input
              {...register("userpassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="••••••••"
              className="h-10 w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
          {errors.userpassword && (
            <p className="mt-1 text-[11px] text-red-400">{errors.userpassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-xs font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
        >
          <span>Create Account</span>
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="mt-6 border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link to="/" className="font-semibold text-blue-400 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
