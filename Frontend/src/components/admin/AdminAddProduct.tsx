import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const AdminAddProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

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
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-border-color rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              >
                <option value="">Select category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains & Cereals</option>
                <option value="dairy">Dairy & Eggs</option>
                <option value="meat">Meat & Fish</option>
                <option value="organic">Organic Products</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text-dark mb-2">
                Price <span className="text-sale">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">₹</span>
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
      <div className="bg-white rounded-xl border border-border-color">
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
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                      <div>
                        <p className="text-sm font-medium text-text-dark">Fresh Tomatoes</p>
                        <p className="text-xs text-text-muted">SKU: VEG001</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">Vegetables</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-dark">₹50.00</td>
                  <td className="px-6 py-4 text-sm text-text-dark-gray">245</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
