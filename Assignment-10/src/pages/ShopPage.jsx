import React, { useContext, useEffect, useState } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { MyStore } from "../context/MyContext";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  const {
    apiData,
    products,
    setProducts,
    selectCategory,
    setSelectCategory,
    sortBy,
    setSortBy,
    cartItems,
  } = useContext(MyStore);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(() => {
    let result = selectCategory === "all"
      ? [...apiData]
      : apiData.filter((item) => item.category === selectCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "top-rated") {
      result = result.filter((item) => item.rating?.rate > 3);
    } else if (sortBy === "low-rated") {
      result = result.filter((item) => item.rating?.rate <= 3);
    }

    setProducts(result);
  }, [apiData, selectCategory, sortBy, searchQuery, setProducts]);

  return (
    <section className="space-y-6">
      {/* Catalog Header & Filters */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Store Catalog
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Showing {products.length} of {apiData.length} available items
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 sm:w-56"
              />
            </div>

            {/* Category Select */}
            <div className="flex items-center gap-2">
              <select
                value={selectCategory}
                onChange={handleCategoryChange}
                className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-xs text-slate-200 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value="electronics">Electronics</option>
              </select>

              {/* Sort Select */}
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-xs text-slate-200 outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="top-rated">Top Rated (&gt;3 ★)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <Filter size={36} className="mb-3 text-slate-500" />
          <h3 className="text-lg font-bold text-white">No products found</h3>
          <p className="mt-1 text-xs text-slate-400">
            Try adjusting your search query or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectCategory("all");
              setSortBy("featured");
            }}
            className="mt-4 flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
          >
            <RefreshCw size={14} />
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const isInCart = cartItems.some((item) => item.id === product.id);

            return (
              <ProductCard
                key={product.id}
                product={product}
                isInCart={isInCart}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ShopPage;
