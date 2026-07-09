import React from "react";

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const CardSkeleton = () => (
    <div className="glass-card border border-neutral-800 rounded-xl overflow-hidden p-4 space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-neutral-900 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      {/* Content Skeletons */}
      <div className="space-y-3">
        <div className="h-4 bg-neutral-900 rounded-md w-1/3" />
        <div className="h-6 bg-neutral-900 rounded-md w-3/4" />
        <div className="h-4 bg-neutral-900 rounded-md w-full" />
        {/* Price & Rating line */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-neutral-900 rounded-md w-1/4" />
          <div className="h-4 bg-neutral-900 rounded-md w-1/5" />
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-10 bg-neutral-900 rounded-lg" />
          <div className="h-10 bg-neutral-900 rounded-lg" />
        </div>
      </div>
    </div>
  );

  const DetailSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-8 animate-pulse">
      {/* Left side - images */}
      <div className="space-y-4">
        <div className="aspect-square bg-neutral-900 rounded-2xl w-full" />
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-square bg-neutral-900 rounded-xl" />
          <div className="aspect-square bg-neutral-900 rounded-xl" />
          <div className="aspect-square bg-neutral-900 rounded-xl" />
        </div>
      </div>
      {/* Right side - info */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 bg-neutral-900 rounded-md w-1/4" />
          <div className="h-10 bg-neutral-900 rounded-md w-3/4" />
          <div className="h-6 bg-neutral-900 rounded-md w-1/3" />
        </div>
        <hr className="border-neutral-800" />
        <div className="space-y-2">
          <div className="h-4 bg-neutral-900 rounded-md w-full" />
          <div className="h-4 bg-neutral-900 rounded-md w-full" />
          <div className="h-4 bg-neutral-900 rounded-md w-5/6" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-5 bg-neutral-900 rounded-md w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-neutral-900 rounded-lg" />
            <div className="h-12 bg-neutral-900 rounded-lg" />
          </div>
        </div>
        <div className="pt-6 space-y-3">
          <div className="h-5 bg-neutral-900 rounded-md w-1/4" />
          <div className="h-4 bg-neutral-900 rounded-md w-full" />
          <div className="h-4 bg-neutral-900 rounded-md w-5/6" />
          <div className="h-4 bg-neutral-900 rounded-md w-4/5" />
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="glass-card rounded-xl p-4 flex gap-4 items-center animate-pulse border border-neutral-900">
      <div className="w-20 h-20 bg-neutral-900 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-neutral-900 rounded w-1/3" />
        <div className="h-3 bg-neutral-900 rounded w-2/3" />
        <div className="h-4 bg-neutral-900 rounded w-1/4" />
      </div>
      <div className="w-12 h-8 bg-neutral-900 rounded" />
    </div>
  );

  return (
    <>
      {type === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      )}
      {type === "detail" && <DetailSkeleton />}
      {type === "list" && (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, idx) => (
            <ListSkeleton key={idx} />
          ))}
        </div>
      )}
    </>
  );
};

export default SkeletonLoader;
