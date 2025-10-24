import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, ChevronDown } from 'lucide-react';
import { shopProducts, Product } from '../../data/products';
import { useCurrency } from '../../context/CurrencyContext';

const AdminAddProduct: React.FC = () => {
  const { getCurrencySymbol } = useCurrency();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showEditCategoryDropdown, setShowEditCategoryDropdown] = useState(false);
  const [showEditStockDropdown, setShowEditStockDropdown] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const editCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const editStockDropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: '', label: 'Select category' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains & Cereals' },
    { value: 'organic', label: 'Organic Products' },
  ];

  const stockStatuses = [
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (editCategoryDropdownRef.current && !editCategoryDropdownRef.current.contains(event.target as Node)) {
        setShowEditCategoryDropdown(false);
      }
      if (editStockDropdownRef.current && !editStockDropdownRef.current.contains(event.target as Node)) {
        setShowEditStockDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      productName,
      category,
      price,
      stock,
      description,
      images
    });
    // Handle form submission
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally update the product in your backend/state management
    console.log('Saving edited product:', editingProduct);
    handleCloseEditModal();
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-text-dark">Products</h1>
        <p className="text-sm text-text-muted mt-1">Add new products to your store</p>
      </div>

      {/* Add Product Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-color">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-base font-medium text-text-dark">Add New Product</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-3">
              Product Images
            </label>
            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg border-2 border-border-color overflow-hidden group">
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <X size={16} className="text-text-dark" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-border-color hover:border-primary transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 group">
                  <Upload size={24} className="text-text-muted group-hover:text-primary transition-colors" />
                  <span className="text-xs text-text-muted group-hover:text-primary transition-colors">Upload</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-text-muted mt-2">Upload up to 5 images (PNG, JPG)</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-text-dark mb-2">
                Product Name <span className="text-sale">*</span>
              </label>
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-dark mb-2">
                Category <span className="text-sale">*</span>
              </label>
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
                >
                  <span className={category ? 'text-text-dark' : 'text-text-muted'}>
                    {categories.find(c => c.value === category)?.label || 'Select category'}
                  </span>
                  <ChevronDown size={16} className="text-text-muted" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          category === cat.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                        } ${cat.value === '' ? 'text-text-muted' : ''}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text-dark mb-2">
                Price <span className="text-sale">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{getCurrencySymbol()}</span>
                <input
                  type="number" 
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-text-dark mb-2">
                Stock Quantity <span className="text-sale">*</span>
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-dark mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description..."
              rows={4}
              className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-text-dark rounded-full text-sm flex items-center gap-2">
                Organic
                <button type="button" className="hover:text-sale transition-colors" title="Remove tag">
                  <X size={14} />
                </button>
              </span>
              <span className="px-3 py-1 bg-gray-100 text-text-dark rounded-full text-sm flex items-center gap-2">
                Fresh
                <button type="button" className="hover:text-sale transition-colors" title="Remove tag">
                  <X size={14} />
                </button>
              </span>
            </div>
            <input
              type="text"
              placeholder="Add a tag..."
              className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 border-t border-border-color flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2 border border-border-color rounded-lg text-sm text-text-dark hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Recent Products Table */}
      <div id="recent-products-section" className="bg-white rounded-xl border border-border-color">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-base font-medium text-text-dark">Recent Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border-color">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {shopProducts.slice(0, 10).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-dark">{product.name}</p>
                        <p className="text-xs text-text-muted">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-dark">
                    {getCurrencySymbol()}{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">
                    {product.stockStatus === 'In Stock' ? 'Available' : 'Out of Stock'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stockStatus === 'In Stock' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-sale/10 text-sale'
                    }`}>
                      {product.stockStatus === 'In Stock' ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEditClick(product)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div 
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseEditModal();
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[85vh] overflow-hidden relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={handleCloseEditModal} 
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-text-dark" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[85vh] scrollbar-hide">
              <form onSubmit={handleSaveEdit}>
                <div className="p-6 border-b border-border-color">
                  <h2 className="text-xl font-semibold text-text-dark">Edit Product</h2>
                  <p className="text-sm text-text-muted mt-1">Update product information</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Product Image Preview */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-3">
                      Product Image
                    </label>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={editingProduct.image} 
                        alt={editingProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                      <label htmlFor="editProductName" className="block text-sm font-medium text-text-dark mb-2">
                        Product Name <span className="text-sale">*</span>
                      </label>
                      <input
                        type="text"
                        id="editProductName"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="editCategory" className="block text-sm font-medium text-text-dark mb-2">
                        Category <span className="text-sale">*</span>
                      </label>
                      <div className="relative" ref={editCategoryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowEditCategoryDropdown(!showEditCategoryDropdown)}
                          className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
                        >
                          <span className="text-text-dark">
                            {editingProduct.category || 'Select category'}
                          </span>
                          <ChevronDown size={16} className="text-text-muted" />
                        </button>
                        {showEditCategoryDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                            {['Vegetables', 'Fruits', 'Grains & Cereals', 'Dairy & Eggs', 'Meat & Fish', 'Organic Products'].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setEditingProduct({...editingProduct, category: cat});
                                  setShowEditCategoryDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                                  editingProduct.category === cat ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <label htmlFor="editPrice" className="block text-sm font-medium text-text-dark mb-2">
                        Price <span className="text-sale">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{getCurrencySymbol()}</span>
                        <input
                          type="number"
                          id="editPrice"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                          className="w-full pl-8 pr-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div>
                      <label htmlFor="editStockStatus" className="block text-sm font-medium text-text-dark mb-2">
                        Stock Status <span className="text-sale">*</span>
                      </label>
                      <div className="relative" ref={editStockDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowEditStockDropdown(!showEditStockDropdown)}
                          className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
                        >
                          <span className="text-text-dark">
                            {editingProduct.stockStatus}
                          </span>
                          <ChevronDown size={16} className="text-text-muted" />
                        </button>
                        {showEditStockDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10">
                            {stockStatuses.map((status) => (
                              <button
                                key={status.value}
                                type="button"
                                onClick={() => {
                                  setEditingProduct({...editingProduct, stockStatus: status.value as 'In Stock' | 'Out of Stock'});
                                  setShowEditStockDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                                  editingProduct.stockStatus === status.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                {status.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="editDescription" className="block text-sm font-medium text-text-dark mb-2">
                      Description
                    </label>
                    <textarea
                      id="editDescription"
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Rating */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="editRating" className="block text-sm font-medium text-text-dark mb-2">
                        Rating (1-5)
                      </label>
                      <input
                        type="number"
                        id="editRating"
                        value={editingProduct.rating}
                        onChange={(e) => setEditingProduct({...editingProduct, rating: parseInt(e.target.value)})}
                        min="1"
                        max="5"
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="editReviewCount" className="block text-sm font-medium text-text-dark mb-2">
                        Review Count
                      </label>
                      <input
                        type="number"
                        id="editReviewCount"
                        value={editingProduct.reviewCount}
                        onChange={(e) => setEditingProduct({...editingProduct, reviewCount: parseInt(e.target.value)})}
                        min="0"
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="p-6 border-t border-border-color flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="px-5 py-2 border border-border-color rounded-lg text-sm text-text-dark hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAddProduct;
