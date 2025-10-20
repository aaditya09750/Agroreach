import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar Skeleton */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse opacity-10"></div>
            <div className="flex items-center gap-6">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse opacity-10"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse opacity-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Skeleton */}
      <header className="bg-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse opacity-10"></div>
            
            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse opacity-10"></div>
              ))}
            </div>
            
            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12">
            <div className="space-y-6">
              <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              <div className="h-16 w-full bg-gray-200 rounded animate-pulse opacity-10"></div>
              <div className="space-y-2">
                <div className="h-5 w-full bg-gray-200 rounded animate-pulse opacity-10"></div>
                <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse opacity-10"></div>
              </div>
              <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
            </div>
            <div className="h-[400px] bg-gray-200 rounded-2xl animate-pulse opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-6  rounded-lg">
                <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0 opacity-10"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse opacity-10"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse opacity-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Category Skeleton */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="text-center mb-12">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-4 opacity-10"></div>
            <div className="flex justify-center items-center gap-1">
              <div className="h-1 w-3 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              <div className="h-1 w-10 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              <div className="h-1 w-3 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gray-200 rounded-full animate-pulse flex-shrink-0 opacity-10"></div>
            <div className="flex gap-6 overflow-hidden flex-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex-shrink-0 w-[180px] p-6 rounded-md">
                  <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse mx-auto mb-3 opacity-10"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-2 opacity-10"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mx-auto opacity-10"></div>
                </div>
              ))}
            </div>
            <div className="w-11 h-11 bg-gray-200 rounded-full animate-pulse flex-shrink-0 opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Products Section Skeleton */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="h-10 w-56 bg-gray-200 rounded animate-pulse mb-4 opacity-10"></div>
              <div className="flex items-center gap-1">
                <div className="h-1 w-3 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
                <div className="h-1 w-10 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
                <div className="h-1 w-3 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
              </div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse opacity-10"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-52 bg-gray-200 animate-pulse opacity-10"></div>
                <div className="p-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2 opacity-10"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-3 opacity-10"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse opacity-10"></div>
                    <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse opacity-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-gray-100 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 w-32 bg-gray-700 rounded animate-pulse opacity-10"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-24 bg-gray-700 rounded animate-pulse opacity-10"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="h-4 w-48 bg-gray-700 rounded animate-pulse opacity-10"></div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 bg-gray-700 rounded-full animate-pulse opacity-10"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkeletonLoader;
