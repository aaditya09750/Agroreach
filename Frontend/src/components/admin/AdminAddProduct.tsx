import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, ChevronDown, Trash2, Package } from 'lucide-react';
import { Product } from '../../data/products';
import { useCurrency } from '../../context/CurrencyContext';
import { adminService } from '../../services/adminService';
import { useProduct } from '../../context/ProductContext';
import { getImageUrls } from '../../utils/imageUtils';

interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  stockStatus: 'In Stock' | 'Out of Stock';
  stockQuantity: number;
  stockUnit: 'kg' | 'litre' | 'dozen' | 'piece' | 'grams' | 'ml';
  discount: number;
  isHotDeal: boolean;
  isBestSeller: boolean;
  isTopRated: boolean;
  status?: 'sale' | 'new' | null;
  createdAt: string;
  updatedAt: string;
}

const AdminAddProduct: React.FC = () => {
  const { getCurrencySymbol } = useCurrency();
  const { refreshProducts } = useProduct();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [stock, setStock] = useState('');
  const [stockUnit, setStockUnit] = useState<'kg' | 'litre' | 'dozen' | 'piece' | 'grams' | 'ml'>('kg');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editNewTag, setEditNewTag] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStockUnitDropdown, setShowStockUnitDropdown] = useState(false);
  const [showEditCategoryDropdown, setShowEditCategoryDropdown] = useState(false);
  const [showEditStockUnitDropdown, setShowEditStockUnitDropdown] = useState(false);
  const [showEditStockDropdown, setShowEditStockDropdown] = useState(false);
  const [showEditFeaturesDropdown, setShowEditFeaturesDropdown] = useState(false);
  const [recentProducts, setRecentProducts] = useState<BackendProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<BackendProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const stockUnitDropdownRef = useRef<HTMLDivElement>(null);
  const editCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const editStockUnitDropdownRef = useRef<HTMLDivElement>(null);
  const editStockDropdownRef = useRef<HTMLDivElement>(null);
  const editFeaturesDropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: '', label: 'Select category' },
    { value: 'Fresh Fruit', label: 'Fresh Fruit' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Meat & Fish', label: 'Meat & Fish' },
    { value: 'Dairy & Eggs', label: 'Dairy & Eggs' },
  ];

  const stockStatuses = [
    { value: 'In Stock', label: 'In Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ];

  const stockUnits = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'grams', label: 'Grams (g)' },
    { value: 'litre', label: 'Litre (L)' },
    { value: 'ml', label: 'Millilitre (ml)' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'piece', label: 'Piece' }
  ];

  // Load recent products on mount
  useEffect(() => {
    loadRecentProducts(1);
  }, []);

  const loadRecentProducts = async (page: number = 1) => {
    try {
      setIsLoadingMore(true);
      const response = await adminService.getRecentProducts({ limit: 10, page });
      if (response.success) {
        const newProducts = response.data.products;
        
        if (page === 1) {
          // First load
          setRecentProducts(newProducts);
          setDisplayedProducts(newProducts);
        } else {
          // Load more
          setRecentProducts(prev => [...prev, ...newProducts]);
          setDisplayedProducts(prev => [...prev, ...newProducts]);
        }
        
        // Check if there are more products to load
        setHasMore(newProducts.length === 10);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error loading recent products:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    loadRecentProducts(currentPage + 1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (stockUnitDropdownRef.current && !stockUnitDropdownRef.current.contains(event.target as Node)) {
        setShowStockUnitDropdown(false);
      }
      if (editCategoryDropdownRef.current && !editCategoryDropdownRef.current.contains(event.target as Node)) {
        setShowEditCategoryDropdown(false);
      }
      if (editStockUnitDropdownRef.current && !editStockUnitDropdownRef.current.contains(event.target as Node)) {
        setShowEditStockUnitDropdown(false);
      }
      if (editStockDropdownRef.current && !editStockDropdownRef.current.contains(event.target as Node)) {
        setShowEditStockDropdown(false);
      }
      if (editFeaturesDropdownRef.current && !editFeaturesDropdownRef.current.contains(event.target as Node)) {
        setShowEditFeaturesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setImageFiles([...imageFiles, ...newFiles]);
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddEditTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editNewTag.trim()) {
      e.preventDefault();
      if (!editTags.includes(editNewTag.trim())) {
        setEditTags([...editTags, editNewTag.trim()]);
      }
      setEditNewTag('');
    }
  };

  const removeEditTag = (tagToRemove: string) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('discount', discount || '0');
      formData.append('stockQuantity', stock || '0');
      formData.append('stockUnit', stockUnit);
      formData.append('description', description || '');
      // Don't send stockStatus - let backend calculate it based on stockQuantity
      
      // Add tags as JSON array
      if (tags.length > 0) {
        tags.forEach(tag => {
          formData.append('tags', tag);
        });
      }

      // Add images
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await adminService.createProduct(formData);
      
      if (response.success) {
        setSubmitMessage({ type: 'success', text: 'Product added successfully!' });
        
        // Reset form
        setProductName('');
        setCategory('');
        setPrice('');
        setDiscount('');
        setStock('');
        setStockUnit('kg');
        setDescription('');
        setSellerName('');
        setTags([]);
        setImageFiles([]);
        setImagePreviews([]);

        // Refresh products list - reset to page 1
        setCurrentPage(1);
        setHasMore(true);
        await loadRecentProducts(1);
        await refreshProducts();

        // Clear message after 3 seconds
        setTimeout(() => setSubmitMessage(null), 3000);
      }
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add product';
      setSubmitMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (product: BackendProduct) => {
    // Convert backend product to frontend Product type for editing
    const imageUrls = getImageUrls(product.images);
    
    const productForEdit: Product = {
      id: product._id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      description: product.description || '',
      category: product.category,
      tags: product.tags,
      image: imageUrls[0], // First image as thumbnail
      images: imageUrls,
      rating: product.rating,
      reviewCount: product.reviewCount,
      stock: product.stockQuantity || 0,
      stockUnit: product.stockUnit || 'kg',
      stockStatus: product.stockStatus,
      discount: product.discount !== undefined && product.discount !== null ? product.discount : 0,
      isHotDeal: product.isHotDeal,
      isBestSeller: product.isBestSeller,
      isTopRated: product.isTopRated,
      status: product.status || undefined,
    };
    
    setEditingProduct(productForEdit);
    setEditingProductId(product._id);
    setEditTags(product.tags || []);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditingProductId(null);
    setEditTags([]);
    setEditNewTag('');
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    // Confirm deletion
    const confirmed = window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`);
    
    if (!confirmed) return;

    try {
      const response = await adminService.deleteProduct(productId);
      
      if (response.success) {
        setSubmitMessage({ type: 'success', text: 'Product deleted successfully!' });
        
        // Refresh products list - reset to page 1
        setCurrentPage(1);
        setHasMore(true);
        await loadRecentProducts(1);
        await refreshProducts();

        // Clear message after 3 seconds
        setTimeout(() => setSubmitMessage(null), 3000);
      }
    } catch (error: unknown) {
      console.error('Error deleting product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
      setSubmitMessage({ type: 'error', text: errorMessage });
      
      // Clear error message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct || !editingProductId) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const updateData = {
        name: editingProduct.name,
        price: editingProduct.price,
        oldPrice: editingProduct.oldPrice || null,
        description: editingProduct.description,
        category: editingProduct.category,
        stockQuantity: editingProduct.stock || 0,
        stockUnit: editingProduct.stockUnit || 'kg',
        discount: (editingProduct.discount && Number(editingProduct.discount) > 0) ? Number(editingProduct.discount) : 0,
        tags: editTags,
        isHotDeal: editingProduct.isHotDeal || false,
        isBestSeller: editingProduct.isBestSeller || false,
        isTopRated: editingProduct.isTopRated || false,
      };

      const response = await adminService.updateProduct(editingProductId, updateData);
      
      if (response.success) {
        setSubmitMessage({ type: 'success', text: 'Product updated successfully!' });
        
        // Refresh products list - reset to page 1
        setCurrentPage(1);
        setHasMore(true);
        await loadRecentProducts(1);
        await refreshProducts();
        
        // Close modal
        handleCloseEditModal();

        // Clear message after 3 seconds
        setTimeout(() => setSubmitMessage(null), 3000);
      }
    } catch (error: unknown) {
      console.error('Error updating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
      setSubmitMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-text-dark">Products</h1>
        <p className="text-sm text-text-muted mt-1">Add new products to your store</p>
      </div>

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`p-4 rounded-lg ${
          submitMessage.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitMessage.text}
        </div>
      )}

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
              {imagePreviews.map((image, index) => (
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
              {imagePreviews.length < 5 && (
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
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => {
                          setCategory(cat.value);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${
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
          </div>

          {/* Price, Discount, and Stock */}
          <div className="grid grid-cols-3 gap-6">
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

            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-text-dark mb-2">
                Discount (%)
              </label>
              <div className="relative">
                <input
                  type="number" 
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 pr-10 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                  step="1"
                  min="0"
                  max="100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">%</span>
              </div>
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-text-dark mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-text-muted mt-1">Leave empty or 0 for out of stock</p>
            </div>
          </div>

          {/* Stock Unit */}
          <div>
            <label htmlFor="stockUnit" className="block text-sm font-medium text-text-dark mb-2">
              Stock Unit <span className="text-sale">*</span>
            </label>
            <div className="relative" ref={stockUnitDropdownRef}>
              <button
                type="button"
                onClick={() => setShowStockUnitDropdown(!showStockUnitDropdown)}
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
              >
                <span className="text-text-dark">
                  {stockUnits.find(u => u.value === stockUnit)?.label || 'Select stock unit'}
                </span>
                <ChevronDown size={16} className="text-text-muted" />
              </button>
              {showStockUnitDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                  {stockUnits.map((unit) => (
                    <button
                      key={unit.value}
                      type="button"
                      onClick={() => {
                        setStockUnit(unit.value as 'kg' | 'litre' | 'dozen' | 'piece' | 'grams' | 'ml');
                        setShowStockUnitDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${
                        stockUnit === unit.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                      }`}
                    >
                      {unit.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-text-muted mt-1">Select the unit for stock measurement</p>
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

          {/* Seller Name and Tags Input */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="sellerName" className="block text-sm font-medium text-text-dark mb-2">
                Seller Name
              </label>
              <input
                type="text"
                id="sellerName"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Enter seller name"
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label htmlFor="newTag" className="block text-sm font-medium text-text-dark mb-2">
                Add Tags
              </label>
              <input
                type="text"
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter to add tags"
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Tags Display */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Current Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeTag(tag)}
                    className="hover:text-primary/70 transition-colors" 
                    title="Remove tag"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              {tags.length === 0 && (
                <p className="text-sm text-text-muted">No tags added yet. Add tags above.</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="p-6 border-t border-border-color flex justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2 border border-border-color rounded-lg text-sm text-text-dark hover:bg-gray-50 transition-colors font-medium"
            onClick={() => {
              setProductName('');
              setCategory('');
              setPrice('');
              setDiscount('');
              setStock('');
              setStockUnit('kg');
              setDescription('');
              setSellerName('');
              setTags([]);
              setNewTag('');
              setImageFiles([]);
              setImagePreviews([]);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>

      {/* Recent Products Table */}
      <div id="recent-products-section" className="bg-white rounded-xl border border-border-color">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-lg font-semibold text-text-dark">Recent Products</h2>
          <p className="text-sm text-text-muted mt-1">Manage your product inventory</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-border-color">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border-color">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <Package size={32} className="text-text-muted" />
                      </div>
                      <p className="text-sm font-medium text-text-dark">No products added yet</p>
                      <p className="text-xs text-text-muted mt-1">Add your first product above</p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-border-color">
                          <img 
                            src={getImageUrls(product.images)[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-dark truncate">{product.name}</p>
                          <p className="text-xs text-text-muted mt-0.5">ID: {product._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-text-dark-gray">{product.category}</td>
                    <td className="px-6 py-5 text-sm font-medium text-text-dark">
                      {getCurrencySymbol()}{product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-5 text-sm text-text-dark-gray text-center">
                      {product.stockQuantity}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${
                        product.stockStatus === 'In Stock' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-sale/10 text-sale'
                      }`}>
                        {product.stockStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          type="button"
                          onClick={() => handleEditClick(product)}
                          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors px-2 py-1"
                        >
                          Edit
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteProduct(product._id, product.name)}
                          className="text-sale hover:text-sale/80 transition-colors p-2 hover:bg-sale/10 rounded-lg"
                          title="Delete product"
                        >
                          <Trash2 size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Load More Button */}
        {hasMore && displayedProducts.length > 0 && (
          <div className="p-6 border-t border-border-color flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoadingMore ? 'Loading...' : 'Load More Products'}
            </button>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && editingProduct && (
        <div 
          className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseEditModal();
          }}
        >
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[85vh] overflow-hidden relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={handleCloseEditModal} 
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
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
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden">
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
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                            {['Fresh Fruit', 'Vegetables', 'Meat & Fish', 'Dairy & Eggs'].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setEditingProduct({...editingProduct, category: cat});
                                  setShowEditCategoryDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${
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

                    {/* Stock Quantity */}
                    <div>
                      <label htmlFor="editStock" className="block text-sm font-medium text-text-dark mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        id="editStock"
                        value={editingProduct.stock || 0}
                        onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                        min="0"
                        placeholder="0"
                      />
                    </div>

                    {/* Stock Unit */}
                    <div>
                      <label htmlFor="editStockUnit" className="block text-sm font-medium text-text-dark mb-2">
                        Stock Unit <span className="text-sale">*</span>
                      </label>
                      <div className="relative" ref={editStockUnitDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowEditStockUnitDropdown(!showEditStockUnitDropdown)}
                          className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
                        >
                          <span className="text-text-dark">
                            {stockUnits.find(u => u.value === (editingProduct.stockUnit || 'kg'))?.label || 'Select stock unit'}
                          </span>
                          <ChevronDown size={16} className="text-text-muted" />
                        </button>
                        {showEditStockUnitDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto scrollbar-hide">
                            {stockUnits.map((unit) => (
                              <button
                                key={unit.value}
                                type="button"
                                onClick={() => {
                                  setEditingProduct({...editingProduct, stockUnit: unit.value as 'kg' | 'litre' | 'dozen' | 'piece' | 'grams' | 'ml'});
                                  setShowEditStockUnitDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${
                                  (editingProduct.stockUnit || 'kg') === unit.value ? 'bg-primary/5 text-primary font-medium' : 'text-text-dark-gray'
                                }`}
                              >
                                {unit.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Discount */}
                    <div>
                      <label htmlFor="editDiscount" className="block text-sm font-medium text-text-dark mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        id="editDiscount"
                        value={editingProduct.discount && Number(editingProduct.discount) > 0 ? editingProduct.discount : ''}
                        onChange={(e) => setEditingProduct({...editingProduct, discount: e.target.value ? parseFloat(e.target.value) : 0})}
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter discount percentage (optional)"
                      />
                    </div>

                    {/* Old Price */}
                    <div>
                      <label htmlFor="editOldPrice" className="block text-sm font-medium text-text-dark mb-2">
                        Old Price (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{getCurrencySymbol()}</span>
                        <input
                          type="number"
                          id="editOldPrice"
                          value={editingProduct.oldPrice || ''}
                          onChange={(e) => setEditingProduct({...editingProduct, oldPrice: e.target.value ? parseFloat(e.target.value) : undefined})}
                          className="w-full pl-8 pr-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                          step="0.01"
                          placeholder="Original price before discount"
                        />
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
                      value={editingProduct.description || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                      rows={4}
                      placeholder="Enter product description (optional)"
                      className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Tags Input */}
                  <div>
                    <label htmlFor="editNewTag" className="block text-sm font-medium text-text-dark mb-2">
                      Add Tags
                    </label>
                    <input
                      type="text"
                      id="editNewTag"
                      value={editNewTag}
                      onChange={(e) => setEditNewTag(e.target.value)}
                      onKeyDown={handleAddEditTag}
                      placeholder="Type tag and press Enter (e.g., Organic, Fresh, Local)"
                      className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Display Tags */}
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">
                      Current Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {editTags.length > 0 ? (
                        editTags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                            {tag}
                            <button 
                              type="button" 
                              onClick={() => removeEditTag(tag)}
                              className="hover:text-primary/70 transition-colors" 
                              title="Remove tag"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-text-muted">No tags added</span>
                      )}
                    </div>
                  </div>

                  {/* Product Features Dropdown */}
                  <div>
                    <label htmlFor="editProductFeatures" className="block text-sm font-medium text-text-dark mb-2">
                      Product Features
                    </label>
                    <div className="relative" ref={editFeaturesDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowEditFeaturesDropdown(!showEditFeaturesDropdown)}
                        className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors flex items-center justify-between text-left"
                      >
                        <span className="text-text-dark text-sm">
                          {(() => {
                            const features = [];
                            if (editingProduct.isHotDeal) features.push('Hot Deal');
                            if (editingProduct.isBestSeller) features.push('Best Seller');
                            if (editingProduct.isTopRated) features.push('Top Rated');
                            return features.length > 0 ? features.join(', ') : 'Select features';
                          })()}
                        </span>
                        <ChevronDown size={16} className="text-text-muted" />
                      </button>
                      {showEditFeaturesDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-color rounded-lg shadow-lg z-10">
                          <div className="p-3 space-y-2">
                            {/* Hot Deal Option */}
                            <label className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/5 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={editingProduct.isHotDeal || false}
                                onChange={(e) => setEditingProduct({...editingProduct, isHotDeal: e.target.checked})}
                                className="w-4 h-4 border-border-color rounded focus:ring-primary focus:ring-2 cursor-pointer accent-primary checkbox-white-tick"
                              />
                              <span className="text-sm text-text-dark">Hot Deal</span>
                            </label>
                            
                            {/* Best Seller Option */}
                            <label className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/5 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={editingProduct.isBestSeller || false}
                                onChange={(e) => setEditingProduct({...editingProduct, isBestSeller: e.target.checked})}
                                className="w-4 h-4 border-border-color rounded focus:ring-primary focus:ring-2 cursor-pointer accent-primary checkbox-white-tick"
                              />
                              <span className="text-sm text-text-dark">Best Seller</span>
                            </label>
                            
                            {/* Top Rated Option */}
                            <label className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/5 cursor-pointer transition-colors">
                              <input
                                type="checkbox"
                                checked={editingProduct.isTopRated || false}
                                onChange={(e) => setEditingProduct({...editingProduct, isTopRated: e.target.checked})}
                                className="w-4 h-4 border-border-color rounded focus:ring-primary focus:ring-2 cursor-pointer accent-primary checkbox-white-tick"
                              />
                              <span className="text-sm text-text-dark">Top Rated</span>
                            </label>
                          </div>
                        </div>
                      )}
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
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
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
