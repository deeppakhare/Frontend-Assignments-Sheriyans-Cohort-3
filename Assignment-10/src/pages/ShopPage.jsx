import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { MyStore } from "../context/MyContext";
import ProductCard from "../components/ProductCard";

const ShopPage = () => {
  let {
    apiData,
    setApiData,
    products,
    setProducts,
    selectCategory,
    setSelectCategory,
    sortBy,
    setSortBy,
    cartItems,
    setCartItems,
  } = useContext(MyStore);

  let handleSearch = (e) => {
    let value = e.target.value.toLowerCase();

    const newPro = apiData.filter(
      (item) =>
        item.title.toLowerCase().includes(value) ||
        item.description.toLowerCase().includes(value),
    );

    setProducts(newPro);
  };

  let filteredProduct = (e) => {
    let value = e.target.value;

    setSelectCategory(e.target.value);

    const filteredProduct =
      value === "all"
        ? apiData
        : apiData.filter((item) => item.category === value);

    setProducts(filteredProduct);
  };

  let handleSorting = (e) => {
    let value = e.target.value;

    setSortBy(e.target.value);

    if (value === "featured") {
      setProducts(apiData);
    } else if (value === "low-high") {
      const newPro = [...apiData].sort((a, b) => a.price - b.price);
      setProducts(newPro);
    } else if (value === "high-low") {
      const newPro = [...apiData].sort((a, b) => b.price - a.price);
      setProducts(newPro);
    } else if (value === "top-rated") {
      const newPro = [...apiData].filter((item) => item.rating.rate > 3);
      setProducts(newPro);
    } else if (value === "low-rated") {
      const newPro = [...apiData].filter((item) => item.rating.rate <= 3);
      setProducts(newPro);
    }
  };

  

  useEffect(() => {
    let result =
      selectCategory === "all"
        ? [...apiData]
        : apiData.filter((item) => item.category === selectCategory);

    if (sortBy === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "top-rated") {
      result = result.filter((item) => item.rating.rate > 3);
    } else if (sortBy === "low-rated") {
      result = result.filter((item) => item.rating.rate <= 3);
    }

    setProducts(result);
  }, [apiData, selectCategory, sortBy]);

  return (
    <section className="space-y-8">
      {/* Catalog Header */}
      <div className="rounded-3xl border border-slate-800 bg-[#10182D] p-6 lg:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Left */}

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Catalog
            </p>

            <h1 className="text-4xl font-bold text-white">All Products</h1>

            <p className="mt-3 text-slate-400">20 products ready to explore</p>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search products..."
                className="h-12 w-full rounded-2xl border border-slate-700 bg-[#1A2238] pl-11 pr-4 text-white outline-none transition focus:border-cyan-500 md:w-72"
              />
            </div>

            {/* Category */}

            <select
              value={selectCategory}
              onChange={filteredProduct}
              className="h-12 rounded-2xl border border-slate-700 bg-[#1A2238] px-5 text-white outline-none transition focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">All Categories</option>

              <option value="men's clothing">Men's Clothing</option>

              <option value="women's clothing">Women's Clothing</option>

              <option value="jewelery">Jewelry</option>

              <option value="electronics">Electronics</option>
            </select>

            {/* Sort */}

            <select
              value={sortBy}
              onChange={handleSorting}
              className="h-12 rounded-2xl border border-slate-700 bg-[#1A2238] px-5 text-white outline-none transition focus:border-cyan-500 cursor-pointer"
            >
              <option value="featured">Featured</option>

              <option value="low-high">Price: Low → High</option>

              <option value="high-low">Price: High → Low</option>

              <option value="top-rated">Top Rated</option>

              <option value="low-rated">Low Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Here */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          let isInCart = cartItems.find((item) => item.id === product.id);

          return (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isInCart}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ShopPage;
