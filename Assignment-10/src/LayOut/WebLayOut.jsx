import React from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const WebLayOut = () => {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto min-h-[calc(100vh-160px)] w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WebLayOut;
