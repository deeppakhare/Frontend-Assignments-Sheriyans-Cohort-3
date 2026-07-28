import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B1020] flex items-center justify-center px-5 py-10">
      {/* Top Left Glow */}
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>

      {/* Bottom Right Glow */}
      <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
