const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { getPagination, buildPaginationResponse, calculatePercentageChange } = require('../utils/helpers');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total orders
    const totalOrders = await Order.countDocuments();
    
    // Orders this month
    const ordersThisMonth = await Order.countDocuments({
      createdAt: { $gte: firstDayThisMonth }
    });

    // Orders last month
    const ordersLastMonth = await Order.countDocuments({
      createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth }
    });

    // Pending orders
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    // Processing orders
    const processingOrders = await Order.countDocuments({ status: 'processing' });

    // Completed orders
    const completedOrders = await Order.countDocuments({ status: 'delivered' });

    // Total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Revenue this month
    const revenueThisMonthResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: 'cancelled' },
          createdAt: { $gte: firstDayThisMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const revenueThisMonth = revenueThisMonthResult.length > 0 ? revenueThisMonthResult[0].total : 0;

    // Revenue last month
    const revenueLastMonthResult = await Order.aggregate([
      {
        $match: {
          status: { $ne: 'cancelled' },
          createdAt: { $gte: firstDayLastMonth, $lte: lastDayLastMonth }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const revenueLastMonth = revenueLastMonthResult.length > 0 ? revenueLastMonthResult[0].total : 0;

    // Revenue growth
    const revenueGrowth = calculatePercentageChange(revenueThisMonth, revenueLastMonth);

    // Total customers
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // New customers this month
    const newCustomersThisMonth = await User.countDocuments({
      role: 'user',
      createdAt: { $gte: firstDayThisMonth }
    });

    // Popular products (by order count)
    const popularProducts = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalOrders: { $sum: 1 },
          totalQuantity: { $sum: '$items.quantity' },
          totalEarnings: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalOrders: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 1,
          name: '$product.name',
          image: { $arrayElemAt: ['$product.images', 0] },
          totalOrders: 1,
          totalQuantity: 1,
          totalEarnings: 1
        }
      }
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'firstName lastName email')
      .select('orderId total status createdAt');

    res.status(200).json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          thisMonth: ordersThisMonth,
          lastMonth: ordersLastMonth,
          pending: pendingOrders,
          processing: processingOrders,
          completed: completedOrders
        },
        revenue: {
          total: totalRevenue,
          thisMonth: revenueThisMonth,
          lastMonth: revenueLastMonth,
          growth: revenueGrowth
        },
        customers: {
          total: totalCustomers,
          newThisMonth: newCustomersThisMonth
        },
        popularProducts,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const { page, limit, status, search, startDate, endDate } = req.query;

    // Build filter
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'billingAddress.email': { $regex: search, $options: 'i' } },
        { 'billingAddress.phone': { $regex: search, $options: 'i' } }
      ];
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Pagination
    const { skip, limit: limitNum, page: pageNum } = getPagination(page, limit);

    // Get orders
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('user', 'firstName lastName email')
      .populate('items.product', 'name images');

    // Get total count
    const total = await Order.countDocuments(filter);

    // Build response
    const response = buildPaginationResponse(orders, total, pageNum, limitNum);

    res.status(200).json({
      success: true,
      ...response
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// @desc    Get order details (admin)
// @route   GET /api/admin/orders/:id
// @access  Private/Admin
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('items.product', 'name images price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order details',
      error: error.message
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/admin/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    // Map frontend status to backend status
    const statusMap = {
      'completed': 'delivered',
      'confirmed': 'processing'
    };
    
    const mappedStatus = statusMap[status] || status;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(mappedStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status: ${status}`
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.status = mappedStatus;

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    if (mappedStatus === 'delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save();

    console.log('Order status updated:', { orderId: order._id, oldStatus: req.body.status, newStatus: mappedStatus });

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// @desc    Delete an order
// @route   DELETE /api/admin/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    console.log('Order deleted:', { orderId: order._id, orderNumber: order.orderId });

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: { orderId: order._id }
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    // Build filter
    const filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const { skip, limit: limitNum, page: pageNum } = getPagination(page, limit);

    // Get users
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await User.countDocuments(filter);

    // Build response
    const response = buildPaginationResponse(users, total, pageNum, limitNum);

    res.status(200).json({
      success: true,
      ...response
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Toggle user active status
// @route   PATCH /api/admin/users/:id/toggle-active
// @access  Private/Admin
exports.toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user }
    });
  } catch (error) {
    console.error('Toggle user active error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message
    });
  }
};

// @desc    Get recent products
// @route   GET /api/admin/products/recent
// @access  Private/Admin
exports.getRecentProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10);
      // Removed .select() to return all fields

    res.status(200).json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get recent products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent products',
      error: error.message
    });
  }
};
