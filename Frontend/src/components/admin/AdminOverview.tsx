import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { shopProducts, Product } from '../../data/products';

type TimeFilter = 'all-time' | 'today' | 'week' | 'month' | 'year';

const AdminOverview: React.FC = () => {
  const { getCurrencySymbol } = useCurrency();
  const [overviewFilter, setOverviewFilter] = useState<TimeFilter>('all-time');
  const [incomeFilter, setIncomeFilter] = useState<TimeFilter>('all-time');
  const [showOverviewDropdown, setShowOverviewDropdown] = useState(false);
  const [showIncomeDropdown, setShowIncomeDropdown] = useState(false);
  const overviewDropdownRef = useRef<HTMLDivElement>(null);
  const incomeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overviewDropdownRef.current && !overviewDropdownRef.current.contains(event.target as Node)) {
        setShowOverviewDropdown(false);
      }
      if (incomeDropdownRef.current && !incomeDropdownRef.current.contains(event.target as Node)) {
        setShowIncomeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const timeFilterOptions: { value: TimeFilter; label: string }[] = [
    { value: 'all-time', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  type StatItem = {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
  };

  // Function to get filtered stats based on selected time period
  const getFilteredStats = (filter: TimeFilter): StatItem[] => {
    // This is where you'd implement actual filtering logic based on your data
    // For now, I'll show different values based on filter to demonstrate functionality
    const statsData: Record<TimeFilter, StatItem[]> = {
      'all-time': [
        { label: 'Customers', value: '10,243', change: '8%', isPositive: true },
        { label: 'Income', value: `${getCurrencySymbol()}39,403,450`, change: '8%', isPositive: true },
      ],
      'today': [
        { label: 'Customers', value: '125', change: '12%', isPositive: true },
        { label: 'Income', value: `${getCurrencySymbol()}45,230`, change: '12%', isPositive: true },
      ],
      'week': [
        { label: 'Customers', value: '892', change: '5%', isPositive: true },
        { label: 'Income', value: `${getCurrencySymbol()}312,450`, change: '5%', isPositive: true },
      ],
      'month': [
        { label: 'Customers', value: '3,456', change: '10%', isPositive: true },
        { label: 'Income', value: `${getCurrencySymbol()}1,234,567`, change: '10%', isPositive: true },
      ],
      'year': [
        { label: 'Customers', value: '8,921', change: '15%', isPositive: true },
        { label: 'Income', value: `${getCurrencySymbol()}28,901,234`, change: '15%', isPositive: true },
      ],
    };
    return statsData[filter];
  };
  
  const stats = getFilteredStats(overviewFilter);

  const customers = [
    { name: 'Johnson D.', avatar: '👤' },
    { name: 'Didinya J.', avatar: '👤' },
    { name: 'Penny L.', avatar: '👤' },
    { name: 'Elon M.', avatar: '👤' },
  ];

  // Function to get popular products based on time filter
  const getPopularProducts = (filter: TimeFilter) => {
    // Simulate different popular products based on time period
    // In a real app, you would fetch actual sales data from your backend
    
    // Get random products from shop but keep them consistent for each filter
    const getProductsByFilter = (): Product[] => {
      switch (filter) {
        case 'today':
          // Show first 4 products for today
          return shopProducts.slice(0, 4);
        case 'week':
          // Show products 3-6 for this week
          return shopProducts.slice(2, 6);
        case 'month':
          // Show products 5-8 for this month
          return shopProducts.slice(4, 8);
        case 'year':
          // Show products 8-11 for this year
          return shopProducts.slice(7, 11);
        case 'all-time':
        default:
          // Show products based on rating for all time
          return [...shopProducts]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
      }
    };

    const products = getProductsByFilter();

    // Generate earnings based on filter and product properties
    const generateEarnings = (product: Product, filterType: TimeFilter): number => {
      const baseEarning = product.price * product.rating * 100;
      
      switch (filterType) {
        case 'today':
          return baseEarning * 0.05; // 5% of base for today
        case 'week':
          return baseEarning * 0.3; // 30% of base for week
        case 'month':
          return baseEarning * 1.2; // 120% of base for month
        case 'year':
          return baseEarning * 12; // 12x for year
        case 'all-time':
        default:
          return baseEarning * 20; // 20x for all time
      }
    };

    return products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      earnings: generateEarnings(product, filter),
      image: product.image,
    }));
  };

  const popularProducts = getPopularProducts(incomeFilter);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-text-dark">Dashboard</h1>

      {/* Overview Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-text-dark">Overview</h2>
          <div className="relative" ref={overviewDropdownRef}>
            <button 
              onClick={() => setShowOverviewDropdown(!showOverviewDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors"
            >
              {timeFilterOptions.find(option => option.value === overviewFilter)?.label}
              <ChevronDown size={16} />
            </button>
            {showOverviewDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border-color rounded-lg shadow-lg z-10">
                {timeFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setOverviewFilter(option.value);
                      setShowOverviewDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      overviewFilter === option.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-border-color">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-semibold text-text-dark">{stat.value}</h3>
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
            <h3 className="text-base font-semibold text-text-dark">Total Income</h3>
            <div className="relative" ref={incomeDropdownRef}>
              <button 
                onClick={() => setShowIncomeDropdown(!showIncomeDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg text-sm text-text-dark-gray hover:bg-gray-50 transition-colors"
              >
                {timeFilterOptions.find(option => option.value === incomeFilter)?.label}
                <ChevronDown size={16} />
              </button>
              {showIncomeDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border-color rounded-lg shadow-lg z-10">
                  {timeFilterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setIncomeFilter(option.value);
                        setShowIncomeDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        incomeFilter === option.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            <div>
              <h3 className="text-base font-medium text-text-dark">Popular Products</h3>
              <p className="text-xs text-text-muted mt-1">
                Based on {timeFilterOptions.find(option => option.value === incomeFilter)?.label.toLowerCase()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-color">
              <span className="text-xs font-medium text-text-muted">Product</span>
              <span className="text-xs font-medium text-text-muted">Earnings</span>
            </div>
            {popularProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">{product.name}</p>
                    <p className="text-xs text-text-muted">{product.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-text-dark">
                  {getCurrencySymbol()}{product.earnings.toFixed(2)}
                </span>
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
