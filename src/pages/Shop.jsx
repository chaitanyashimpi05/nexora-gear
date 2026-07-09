import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown, FaChevronDown, FaUndo } from "react-icons/fa";
import { getProducts, getCategories } from "../services/firebase";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import Button from "../components/ui/Button";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  // State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory !== "all" ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState(40000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc, rating, newest

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const suggestionRef = useRef(null);

  // Load Data
  useEffect(() => {
    const loadShopData = async () => {
      try {
        const [prodsData, catsData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(prodsData);
        setCategories(catsData);
      } catch (err) {
        console.error("Failed to load shop items: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadShopData();
  }, []);

  // Sync category state if query parameter changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== "all") {
      setSelectedCategories([cat]);
    } else if (cat === "all") {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  // Handle Search Suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filteredSuggests = products
        .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggests);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  // Click outside suggestions close
  useEffect(() => {
    const clickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  // Category change handler
  const handleCategoryToggle = (catId) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId];
      
      // Update URL search parameters
      if (updated.length === 1) {
        setSearchParams({ category: updated[0] });
      } else {
        setSearchParams({});
      }
      return updated;
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange(40000);
    setMinRating(0);
    setSortBy("default");
    setSearchParams({});
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter((prod) => {
    // 1. Search Query
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Filter
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(prod.category);

    // 3. Price Filter
    const matchesPrice = prod.price <= priceRange;

    // 4. Rating Filter
    const matchesRating = prod.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0; // default (no sorting / Firestore natural order)
  });

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-gaming font-extrabold uppercase tracking-tight">
          NEXORA <span className="text-gaming-cyan">ARMORY</span>
        </h1>
        <p className="text-neutral-400 text-xs font-sans max-w-xl mx-auto">
          Equip yourself with the best tools in the game. Filter, search, and sort to find your perfect mechanical keyboards, monitors, and mice.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-gaming-dark/45 border border-neutral-900 rounded-2xl p-4 glass-card">
        {/* Search */}
        <div ref={suggestionRef} className="relative w-full md:w-96 flex items-center">
          <input
            type="text"
            placeholder="Search catalog by product name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
              setCurrentPage(1);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-2.5 pl-11 text-sm text-gray-200 placeholder-neutral-500 focus:border-gaming-cyan focus:outline-none transition-all duration-300 font-sans"
          />
          <FaSearch className="absolute left-4 text-neutral-500 text-sm" />
          
          {/* Autocomplete suggestions box */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-12 left-0 right-0 glass-card bg-neutral-950/95 border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSearchQuery(s.name);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-sans border-b border-neutral-900/60 hover:bg-purple-950/30 text-gray-300 hover:text-gaming-cyan flex items-center gap-2"
                >
                  <img src={s.images[0]} alt="" className="w-6 h-6 object-cover rounded" />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <FaSortAmountDown className="text-neutral-500 text-sm hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-neutral-950 border border-neutral-850 rounded-xl px-4 py-2.5 text-xs text-gray-300 font-gaming focus:outline-none focus:border-gaming-cyan w-full sm:w-auto uppercase tracking-wider cursor-pointer"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center justify-center p-3 bg-neutral-900 border border-neutral-850 hover:border-gaming-cyan text-gray-300 rounded-xl"
          >
            <FaFilter />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS (Desktop) */}
        <div className="hidden md:block space-y-6">
          <div className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <h2 className="text-base font-gaming font-extrabold uppercase text-white">
                Filters
              </h2>
              <button
                onClick={handleClearFilters}
                className="text-[10px] uppercase font-bold text-gaming-cyan hover:text-gaming-neonCyan flex items-center gap-1 transition-colors"
              >
                <FaUndo className="text-[9px]" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-gaming font-bold text-neutral-400 tracking-wider">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-3 cursor-pointer text-xs font-sans text-neutral-300 hover:text-white select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryToggle(cat.id)}
                      className="w-4 h-4 bg-neutral-900 border-neutral-800 rounded focus:ring-offset-black text-gaming-purple focus:ring-gaming-purple cursor-pointer accent-gaming-purple"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs uppercase font-gaming font-bold text-neutral-400 tracking-wider">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-gaming-cyan font-gaming">
                  ₹{priceRange.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="40000"
                step="500"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full bg-neutral-900 rounded-lg appearance-none h-1.5 cursor-pointer border border-neutral-850"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 font-sans">
                <span>₹500</span>
                <span>₹40,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-gaming font-bold text-neutral-400 tracking-wider">
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[
                  { value: 0, label: "All Ratings" },
                  { value: 4.5, label: "⭐ 4.5 & Above" },
                  { value: 4.7, label: "⭐ 4.7 & Above" }
                ].map((rat) => (
                  <label key={rat.value} className="flex items-center space-x-3 cursor-pointer text-xs font-sans text-neutral-300 hover:text-white select-none">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rat.value}
                      onChange={() => {
                        setMinRating(rat.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 bg-neutral-900 border-neutral-800 rounded focus:ring-offset-black text-gaming-purple focus:ring-gaming-purple cursor-pointer accent-gaming-purple"
                    />
                    <span>{rat.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="md:col-span-3 space-y-10">
          {loading ? (
            <SkeletonLoader count={6} />
          ) : currentProducts.length === 0 ? (
            <div className="glass-card rounded-2xl border border-neutral-900 p-12 text-center space-y-4">
              <h3 className="text-xl font-gaming font-extrabold text-neutral-500 uppercase tracking-wider">
                No Gear Found
              </h3>
              <p className="text-neutral-400 text-sm font-sans max-w-sm mx-auto">
                No tactical options matched your search parameters. Reset filters to clear.
              </p>
              <Button onClick={handleClearFilters} variant="cyan" size="sm">
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-3 pt-6 border-t border-neutral-950">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-neutral-900 border border-neutral-850 text-xs font-gaming font-bold uppercase tracking-wider rounded-lg text-neutral-400 hover:text-white hover:border-gaming-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNo = idx + 1;
                    return (
                      <button
                        key={pageNo}
                        onClick={() => handlePageChange(pageNo)}
                        className={`w-9 h-9 rounded-lg text-xs font-gaming font-bold flex items-center justify-center border transition-all ${
                          currentPage === pageNo
                            ? "bg-gaming-cyan border-gaming-cyan text-black shadow-glow-cyan"
                            : "bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white hover:border-neutral-800"
                        }`}
                      >
                        {pageNo}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-neutral-900 border border-neutral-850 text-xs font-gaming font-bold uppercase tracking-wider rounded-lg text-neutral-400 hover:text-white hover:border-gaming-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end md:hidden">
          <div className="w-80 bg-gaming-dark h-full border-l border-neutral-900 p-6 flex flex-col justify-between">
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
                <h2 className="text-base font-gaming font-extrabold uppercase text-white">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full bg-neutral-900 border border-neutral-800 hover:text-white text-neutral-400"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-gaming font-bold text-neutral-500 tracking-wider">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-3 text-xs font-sans text-neutral-300">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 bg-neutral-900 border-neutral-800 rounded text-gaming-purple accent-gaming-purple"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs uppercase font-gaming font-bold text-neutral-500 tracking-wider">Max Price</h3>
                  <span className="text-xs font-bold text-gaming-cyan font-gaming">₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="40000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full bg-neutral-900 rounded-lg appearance-none h-1.5 border border-neutral-850"
                />
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-gaming font-bold text-neutral-500 tracking-wider">Min Rating</h3>
                <div className="space-y-2">
                  {[
                    { value: 0, label: "All Ratings" },
                    { value: 4.5, label: "⭐ 4.5 & Above" },
                    { value: 4.7, label: "⭐ 4.7 & Above" }
                  ].map((rat) => (
                    <label key={rat.value} className="flex items-center space-x-3 text-xs font-sans text-neutral-300">
                      <input
                        type="radio"
                        name="mobileRating"
                        checked={minRating === rat.value}
                        onChange={() => setMinRating(rat.value)}
                        className="w-4 h-4 bg-neutral-900 border-neutral-800 rounded text-gaming-purple accent-gaming-purple"
                      />
                      <span>{rat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-900 grid grid-cols-2 gap-4">
              <Button onClick={handleClearFilters} variant="outline" size="sm">Reset</Button>
              <Button onClick={() => setMobileFiltersOpen(false)} variant="cyan" size="sm">Apply</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
