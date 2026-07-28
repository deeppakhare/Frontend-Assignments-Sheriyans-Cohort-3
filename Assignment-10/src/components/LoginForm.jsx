import React, { useContext } from "react";
import { Mail, Lock, ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MyStore } from "../context/MyContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { setCurrentUser } = useContext(MyStore);

  const loginUser = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (elem) =>
        elem.useremail === data.useremail &&
        elem.userpassword === data.userpassword
    );

    if (user) {
      toast.success("Login Successful! Welcome back.");
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      reset();
      navigate("/welcome/home");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">
      {/* Brand Icon */}
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShoppingBag size={24} />
        </div>
      </div>

      <h1 className="mt-4 text-center text-xl font-bold tracking-tight text-white sm:text-2xl">
        Sign in to SkyMart
      </h1>
      <p className="mt-1 text-center text-xs text-slate-400">
        Enter your details to access your account.
      </p>

      <form onSubmit={handleSubmit(loginUser)} className="mt-6 space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Email Address
          </label>
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 transition-colors focus-within:border-blue-500">
            <Mail size={16} className="mr-2 text-slate-400" />
            <input
              {...register("useremail", { required: "Email is required" })}
              type="email"
              placeholder="name@example.com"
              className="h-10 w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-300">
            Password
          </label>
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 px-3 transition-colors focus-within:border-blue-500">
            <Lock size={16} className="mr-2 text-slate-400" />
            <input
              {...register("userpassword", { required: "Password is required" })}
              type="password"
              placeholder="••••••••"
              className="h-10 w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-xs font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
        >
          <span>Sign In</span>
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="mt-6 border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="font-semibold text-blue-400 hover:underline cursor-pointer"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
