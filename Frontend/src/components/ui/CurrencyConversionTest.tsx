import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * Currency Conversion Test Component
 * This component demonstrates and tests the currency conversion functionality
 */
const CurrencyConversionTest: React.FC = () => {
  const { currency, setCurrency, convertPrice, formatPrice, exchangeRate } = useCurrency();

  // Test prices in INR (base currency)
  const testPrices = [
    { name: 'Product A', inrPrice: 150 },
    { name: 'Product B', inrPrice: 500 },
    { name: 'Product C', inrPrice: 1000 },
    { name: 'Product D', inrPrice: 88.221 }, // Should equal $1.00
    { name: 'Product E', inrPrice: 5000 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Currency Conversion Test</h1>
        
        {/* Currency Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Select Currency:</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currency === 'INR'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currency === 'USD'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Exchange Rate Information</h3>
          <p className="text-blue-800">
            1 USD = ₹{exchangeRate.toFixed(3)} INR
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Current Selection: <span className="font-semibold">{currency}</span>
          </p>
        </div>

        {/* Test Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Price (INR)</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Price (USD)</th>
                <th className="border border-gray-300 px-4 py-2 text-right">Displayed As</th>
              </tr>
            </thead>
            <tbody>
              {testPrices.map((item, index) => {
                const usdPrice = item.inrPrice / exchangeRate;
                const formattedPrice = formatPrice(item.inrPrice);
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ₹{item.inrPrice.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ${usdPrice.toFixed(2)}
                    </td>
                    <td className={`border border-gray-300 px-4 py-2 text-right font-semibold ${
                      currency === 'USD' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {formattedPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cart Simulation */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Cart Calculation Example</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {/* Cart Items */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Product A (₹150) × 2</span>
                <span className="font-medium">{formatPrice(150 * 2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Product B (₹500) × 1</span>
                <span className="font-medium">{formatPrice(500)}</span>
              </div>
            </div>
            
            {/* Totals */}
            <div className="border-t border-gray-300 pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-medium">{formatPrice(800)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="font-medium">{formatPrice(50)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%):</span>
                <span className="font-medium">{formatPrice(convertPrice(800) * 0.18)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-400 pt-2">
                <span>Total:</span>
                <span className="text-primary">
                  {formatPrice(convertPrice(800) + convertPrice(50) + (convertPrice(800) * 0.18))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Guide */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">✓ Verification Guide</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• ₹88.221 should display as $1.00 when USD is selected</li>
            <li>• ₹150 should display as $1.70 when USD is selected</li>
            <li>• ₹500 should display as $5.67 when USD is selected</li>
            <li>• ₹1000 should display as $11.34 when USD is selected</li>
            <li>• Switching currency should update all prices instantly</li>
            <li>• Currency preference should persist after page reload</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConversionTest;
