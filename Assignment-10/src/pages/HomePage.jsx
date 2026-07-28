import React from "react";
import WelcomeSection from "../components/WelcomeSection";
import ActivitySummary from "../components/ActivitySummary";
import ShopByCategory from "../components/ShopByCategory";
import TopRated from "../components/TopRated";
import Promise from "../components/Promise";

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <WelcomeSection />

      {/* Dashboard Summary */}
      <ActivitySummary />

      {/* Categories */}
      <ShopByCategory />

      {/* Top Rated Products */}
      <TopRated />

      {/* Why Shop With Us */}
      <Promise />
    </div>
  );
};

export default HomePage;