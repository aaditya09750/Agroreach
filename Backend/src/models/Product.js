const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  oldPrice: {
    type: Number,
    min: [0, 'Old price cannot be negative']
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return this.images.length <= 5;
      },
      message: 'Maximum 5 images allowed'
    }
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  stockStatus: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative'],
    default: 0
  },
  stockUnit: {
    type: String,
    enum: ['kg', 'litre', 'dozen', 'piece', 'grams', 'ml'],
    default: 'kg',
    required: true
  },
  brand: {
    name: {
      type: String,
      trim: true
    },
    logo: {
      type: String
    }
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isHotDeal: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isTopRated: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['sale', 'new', null],
    default: null
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update stock status based on quantity
productSchema.pre('save', function(next) {
  // Auto-set stockStatus based on stockQuantity
  if (this.stockQuantity === 0 || this.stockQuantity === undefined) {
    this.stockStatus = 'Out of Stock';
  } else {
    this.stockStatus = 'In Stock';
  }
  next();
});

// Also handle updates
productSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.stockQuantity !== undefined) {
    if (update.stockQuantity === 0) {
      update.stockStatus = 'Out of Stock';
    } else {
      update.stockStatus = 'In Stock';
    }
  }
  next();
});

// Index for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
