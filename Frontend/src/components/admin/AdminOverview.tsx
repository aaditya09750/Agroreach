import React from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const stats = [
    {
      label: 'Customers',
      value: '10,243',
      change: '8%',
      isPositive: true,
    },
    {
      label: 'Income',
      value: '$39,403,450',
      change: '8%',
      isPositive: true,
    },
  ];

  const customers = [
    { name: 'Johnson D.', avatar: '👤' },
    { name: 'Didinya J.', avatar: '👤' },
    { name: 'Penny L.', avatar: '👤' },
    { name: 'Elon M.', avatar: '👤' },
  ];

  const popularProducts = [
    { name: 'Product A', category: 'UI Kit', earnings: '$5461', image: '📦' },
    { name: 'Product B', category: 'UI Kit', earnings: '$5461', image: '📦' },
    { name: 'Product C', category: 'UI Kit', earnings: '$5461', image: '📦' },
    { name: 'Product D', category: 'UI Kit', earnings: '$5461', image: '📦' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-text-dark">Dashboard</h1>

      {/* Overview Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-text-dark">Overview</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
            All Time
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-border-color">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-text-dark">{stat.value}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stat.isPositive 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-sale/10 text-sale'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-xl border border-border-color">
        <h3 className="text-base font-medium text-text-dark mb-6">
          Welcome to our <span className="font-semibold">new online experience</span>
        </h3>
        <div className="flex gap-8">
          {customers.map((customer, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl mb-2">
                {customer.avatar}
              </div>
              <p className="text-sm text-text-dark-gray">{customer.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Total Income Chart */}
        <div className="col-span-2 bg-white p-6 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-text-dark">Total Income</h3>
            <button className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors">
              All Time
              <ChevronDown size={16} />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-text-muted">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-2 text-primary/30" />
              <p className="text-sm">Chart visualization here</p>
            </div>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-6 rounded-xl border border-border-color">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-text-dark">Popular Products</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-color">
              <span className="text-xs font-medium text-text-muted">Product</span>
              <span className="text-xs font-medium text-text-muted">Earnings</span>
            </div>
            {popularProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {product.image}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-text-dark">{product.earnings}</span>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors">
              All Products
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 rounded-xl border border-border-color">
        <h3 className="text-base font-medium text-text-dark mb-4">Comments</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between pb-3 border-b border-border-color">
            <span className="text-xs font-medium text-text-muted">Comments</span>
            <span className="text-xs font-medium text-text-muted">Date</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-text-dark-gray max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
              labore et dolore magna aliqua, sed do eiusmod tempor incididunt
            </p>
            <span className="text-sm text-text-muted">Nov 22, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
