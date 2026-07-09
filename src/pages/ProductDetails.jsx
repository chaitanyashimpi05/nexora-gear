import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaStar, FaArrowLeft, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { getProductById, getReviews, submitReview, getProducts } from "../services/firebase";
import { formatCurrency } from "../utils/helpers";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SkeletonLoader from "../components/SkeletonLoader";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // State
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Review Form State
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Load product, reviews, and related products
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const prodData = await getProductById(id);
        if (!prodData) {
          toast.error("❌ Gear not found in database!");
          navigate("/404");
          return;
        }
        setProduct(prodData);
        setActiveImage(prodData.images[0]);
        setQuantity(1);

        // Fetch reviews
        const reviewsData = await getReviews(id);
        setReviews(reviewsData);

        // Fetch related products
        const allProducts = await getProducts();
        const related = allProducts
          .filter((p) => p.category === prodData.category && p.id !== prodData.id)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error fetching product page data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`🎮 Added ${quantity}x ${product.name} to Cart!`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  const handleBuyNow = () => {
    if (product.stockStatus === "out-of-stock") {
      toast.error("❌ Item is out of stock!", { position: "bottom-right" });
      return;
    }
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.warning("⚠️ Please fill out all fields.");
      return;
    }

    setSubmittingReview(true);
    try {
      const reviewObj = {
        productId: product.id,
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment
      };

      const addedReview = await submitReview(reviewObj);
      
      // Update UI state
      setReviews((prev) => [addedReview, ...prev]);
      
      // Update local product average rating representation
      const updatedReviews = [addedReview, ...reviews];
      const newAvgRating = parseFloat(
        (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
      );
      setProduct((prev) => ({ ...prev, rating: newAvgRating }));

      toast.success("🎮 Review submitted successfully! Thank you for the report.", {
        position: "bottom-right"
      });

      // Clear Form
      setReviewName("");
      setReviewRating(5);
      setReviewComment("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to post review. Try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Star Component for submission form
  const renderSubmitStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setReviewRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-2xl transition-colors focus:outline-none"
          >
            <FaStar
              className={
                star <= (hoverRating || reviewRating)
                  ? "text-yellow-400"
                  : "text-neutral-700"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400 opacity-60" />);
      } else {
        stars.push(<FaStar key={i} className="text-neutral-700" />);
      }
    }
    return stars;
  };

  const stockBadge = {
    "in-stock": { text: "In Stock", class: "bg-emerald-950/60 text-emerald-400 border border-emerald-900/60" },
    "low-stock": { text: "Low Stock", class: "bg-amber-950/60 text-amber-400 border border-amber-900/60" },
    "out-of-stock": { text: "Out of Stock", class: "bg-red-950/60 text-red-400 border border-red-900/60" }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SkeletonLoader type="detail" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pt-28 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Back to Shop Link */}
      <div>
        <Link
          to="/shop"
          className="inline-flex items-center space-x-2 text-xs font-gaming font-bold uppercase tracking-wider text-neutral-400 hover:text-gaming-cyan transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Armory</span>
        </Link>
      </div>

      {/* Main Grid: Images + Core Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left Side: Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center relative p-2">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-950 border transition-all duration-200 p-0.5 ${
                    activeImage === img
                      ? "border-gaming-cyan shadow-glow-cyan"
                      : "border-neutral-900 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Bio */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-gaming font-semibold bg-purple-950/80 border border-purple-800/40 text-gaming-neonPurple tracking-wider uppercase inline-block">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-gaming font-black text-white uppercase tracking-tight leading-none">
              {product.name}
            </h1>
            <div className="flex items-center space-x-3 pt-1">
              <div className="flex text-sm">{renderStars(product.rating)}</div>
              <span className="text-xs text-neutral-400 font-sans font-medium">
                ({reviews.length} customer {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-y border-neutral-900 py-4">
            <span className="text-3xl font-gaming font-black text-white">
              {formatCurrency(product.price)}
            </span>
            <span className={`text-[10px] px-3 py-1 rounded-full font-gaming font-semibold tracking-widest uppercase ${stockBadge[product.stockStatus].class}`}>
              {stockBadge[product.stockStatus].text}
            </span>
          </div>

          <p className="text-neutral-400 text-sm font-sans leading-relaxed">
            {product.description}
          </p>

          {/* Specifications Bullet list */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase font-gaming font-bold text-neutral-300 tracking-wider">
              Technical Specifications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-neutral-400">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <FaCheck className="text-gaming-cyan mt-0.5 flex-shrink-0 text-[10px]" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Actions */}
          <div className="pt-4 border-t border-neutral-900 space-y-4">
            {product.stockStatus !== "out-of-stock" ? (
              <div className="flex items-center space-x-4">
                {/* Quantity adjustments */}
                <div className="flex items-center bg-neutral-900 border border-neutral-850 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-neutral-400 hover:text-white rounded-lg transition-colors focus:outline-none"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-gaming font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="w-10 h-10 flex items-center justify-center font-bold text-neutral-400 hover:text-white rounded-lg transition-colors focus:outline-none"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 py-3.5"
                  icon={FaShoppingCart}
                >
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  variant="cyan"
                  className="flex-1 py-3.5"
                >
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-red-400 bg-red-950/20 px-4 py-3.5 rounded-xl border border-red-900/40 text-sm">
                <FaExclamationTriangle className="text-base flex-shrink-0" />
                <span className="font-semibold font-gaming uppercase tracking-wider">Currently Unavailable for Dispatch</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Tab/Section */}
      <section className="border-t border-neutral-900 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Review Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-gaming font-extrabold uppercase text-white">
            Write a <span className="text-gaming-purple">Review</span>
          </h2>
          
          <form onSubmit={handleReviewSubmit} className="glass-card rounded-2xl border border-neutral-900 p-6 space-y-4">
            <Input
              label="Gamer Handle / Name"
              placeholder="e.g. John 'Sniper' Doe"
              name="name"
              required
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
            />

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-gaming block">
                Star Rating <span className="text-gaming-cyan">*</span>
              </span>
              {renderSubmitStars()}
            </div>

            <Input
              label="Review Message"
              placeholder="Tell other gamers about the response speeds, key switches, grip, or layout..."
              name="comment"
              required
              textarea
              rows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />

            <Button
              type="submit"
              disabled={submittingReview}
              variant="primary"
              className="w-full text-center"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>

        {/* Right Column: Reviews Display */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-gaming font-extrabold uppercase text-white">
            Reviews Timeline ({reviews.length})
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {reviews.length === 0 ? (
              <div className="glass-card rounded-2xl border border-neutral-900 p-8 text-center text-neutral-500 italic font-sans text-sm">
                No reviews yet. Be the first to load a report for this product!
              </div>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-card rounded-xl p-5 border border-neutral-900/60 space-y-2.5 font-sans"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white text-sm font-semibold tracking-wide font-gaming">{rev.name}</h4>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="flex bg-neutral-950/80 px-2 py-0.5 rounded border border-neutral-850">
                      {renderStars(rev.rating)}
                    </div>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-900 pt-16 space-y-10">
          <h2 className="text-2xl font-gaming font-extrabold uppercase text-white text-center sm:text-left">
            Related <span className="text-gaming-cyan">Tactical Options</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
