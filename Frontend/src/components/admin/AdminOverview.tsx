import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Package, Truck, AlertTriangle, Star } from 'lucide-react';
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

  // Function to get popular products based on time filter
  const getPopularProducts = (filter: TimeFilter) => {
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

  // Function to generate chart data based on time filter
  const getChartData = (filter: TimeFilter) => {
    switch (filter) {
      case 'today':
        return [
          { label: '12 AM', value: 2500 },
          { label: '4 AM', value: 1200 },
          { label: '8 AM', value: 4500 },
          { label: '12 PM', value: 7800 },
          { label: '4 PM', value: 9200 },
          { label: '8 PM', value: 6500 },
        ];
      case 'week':
        return [
          { label: 'Mon', value: 45000 },
          { label: 'Tue', value: 52000 },
          { label: 'Wed', value: 48000 },
          { label: 'Thu', value: 61000 },
          { label: 'Fri', value: 55000 },
          { label: 'Sat', value: 67000 },
          { label: 'Sun', value: 58000 },
        ];
      case 'month':
        return [
          { label: 'Week 1', value: 180000 },
          { label: 'Week 2', value: 220000 },
          { label: 'Week 3', value: 195000 },
          { label: 'Week 4', value: 245000 },
        ];
      case 'year':
        return [
          { label: 'Jan', value: 850000 },
          { label: 'Feb', value: 920000 },
          { label: 'Mar', value: 1050000 },
          { label: 'Apr', value: 980000 },
          { label: 'May', value: 1120000 },
          { label: 'Jun', value: 1080000 },
          { label: 'Jul', value: 1150000 },
          { label: 'Aug', value: 1200000 },
          { label: 'Sep', value: 1100000 },
          { label: 'Oct', value: 1250000 },
          { label: 'Nov', value: 1180000 },
          { label: 'Dec', value: 1320000 },
        ];
      case 'all-time':
      default:
        return [
          { label: '2020', value: 8500000 },
          { label: '2021', value: 10200000 },
          { label: '2022', value: 12800000 },
          { label: '2023', value: 15500000 },
          { label: '2024', value: 18900000 },
          { label: '2025', value: 13200000 },
        ];
    }
  };

  const chartData = getChartData(incomeFilter);
  const maxValue = Math.max(...chartData.map(d => d.value));

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

      {/* Quick Stats & Actions */}
      <div className="bg-white p-6 rounded-xl border border-border-color">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-dark">Welcome back, Admin!</h3>
            <p className="text-text-muted text-sm mt-1">Here's what's happening with your store today</p>
          </div>
          <div className="text-right">
            <p className="text-text-muted text-xs mb-1">Current Date</p>
            <p className="text-base font-medium text-text-dark">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Pending Orders</p>
                <p className="text-2xl font-semibold text-text-dark">24</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Out for Delivery</p>
                <p className="text-2xl font-semibold text-text-dark">12</p>
              </div>
            </div>
          </div>
          <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle size={24} className="text-warning" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Low Stock Items</p>
                <p className="text-2xl font-semibold text-text-dark">8</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">New Reviews</p>
                <p className="text-2xl font-semibold text-text-dark">15</p>
              </div>
            </div>
          </div>
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
          <div className="mt-6 px-4">
            <div className="flex items-end justify-between gap-3 h-56">
              {chartData.map((item, index) => {
                const heightPercentage = (item.value / maxValue) * 100;
                const heightPx = (heightPercentage / 100) * 200; // Convert to pixels (200px max height)
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-end justify-end h-52">
                      <div className="relative group w-full">
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-text-dark text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                          <div className="text-center">
                            <div className="font-semibold">{getCurrencySymbol()}{item.value.toLocaleString()}</div>
                          </div>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-text-dark"></div>
                          </div>
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-md transition-all duration-300 hover:from-primary/90 hover:to-primary/60 cursor-pointer shadow-sm"
                          style={{ height: `${heightPx}px`, minHeight: '8px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-full border-t-2 border-border-color mt-1"></div>
                    <p className="text-xs text-text-dark-gray font-medium mt-2 text-center">{item.label}</p>
                  </div>
                );
              })}
            </div>
            {/* Chart Summary Statistics */}
            <div className="mt-6 pt-4 border-t border-border-color">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-1">Total Revenue</p>
                  <p className="text-lg font-semibold text-text-dark">
                    {getCurrencySymbol()}{chartData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-1">Average</p>
                  <p className="text-lg font-semibold text-text-dark">
                    {getCurrencySymbol()}{Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-text-muted mb-1">Peak Period</p>
                  <p className="text-lg font-semibold text-primary">
                    {chartData.reduce((max, item) => item.value > max.value ? item : max, chartData[0]).label}
                  </p>
                </div>
              </div>
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
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
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
    </div>
  );
};

export default AdminOverview;
