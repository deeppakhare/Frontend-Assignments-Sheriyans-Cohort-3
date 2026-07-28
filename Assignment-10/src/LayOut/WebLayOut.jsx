import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const WebLayOut = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WebLayOut;
