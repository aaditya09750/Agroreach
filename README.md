# AR E-Commerce Platform

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A comprehensive, enterprise-grade e-commerce platform built with React, TypeScript, Express, and MongoDB. This full-stack solution delivers seamless shopping experiences with advanced features including multilingual support, multi-currency transactions, real-time cart synchronization, intelligent admin dashboard, and PDF invoice generation for modern online retail operations.

## Live Preview

**Experience the application live:** [Coming Soon]

![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-yellow?style=for-the-badge&logo=netlify&logoColor=white)

## Core Features

**Intelligent Product Management** - Comprehensive product catalog with advanced filtering, sorting, and search capabilities. Support for multiple product images, detailed descriptions, category-based organization, and dynamic pricing with discount management.

**Multi-Currency Support** - Seamless shopping experience with USD and INR currency support. Real-time currency conversion with accurate exchange rates (1 USD = 88.221 INR), automatic price formatting, and persistent currency preference across sessions.

**Multilingual Interface** - Complete internationalization with support for English, Hindi (हिन्दी), and Marathi (मराठी). Dynamic content translation for products, UI elements, and user-facing text ensuring accessibility for diverse user demographics.

**Smart Shopping Cart** - Real-time cart synchronization across devices with automatic updates, persistent storage, quantity management, and instant total calculations. Guest cart support with seamless migration upon user authentication.

**Secure Authentication System** - Enterprise-grade JWT-based authentication with bcrypt password hashing, role-based access control (User/Admin), protected routes, automatic token refresh, and secure session management with 7-day token expiration.

**Comprehensive Order Management** - Complete order lifecycle tracking from creation to delivery with real-time status updates, order history with detailed views, downloadable PDF invoices, email notifications, and advanced filtering capabilities.

**Advanced Admin Dashboard** - Powerful administrative interface with real-time analytics, revenue tracking, customer management, product inventory control, order processing, and comprehensive statistics with time-based filtering (today, week, month, year, all-time).

**Responsive Design Excellence** - Mobile-first responsive architecture with Tailwind CSS ensuring optimal viewing across desktop, tablet, and mobile devices. Smooth animations with Framer Motion and intuitive user interface with Lucide React icons.

**Email Notification System** - Automated email delivery using Nodemailer for order confirmations, status updates, password resets, and promotional campaigns with professionally designed HTML templates.

**PDF Invoice Generation** - Automatic PDF invoice generation with jsPDF for order receipts, detailed itemization, billing information, and brand-customized formatting for professional documentation.

## Technology Stack

| Technology | Version | Purpose | Implementation |
|------------|---------|----------|----------------|
| React | 19.x | Frontend UI framework with hooks and modern architecture | Functional components with TypeScript, Context API for state management |
| TypeScript | 5.x | Type-safe JavaScript development | Strict typing, interfaces, and compile-time error detection |
| Express | 4.x | Backend API server for RESTful operations | Comprehensive middleware stack with error handling and validation |
| MongoDB | 7.x | NoSQL database for flexible data storage | Document-based storage with Mongoose ODM and schema validation |
| Mongoose | 7.x | MongoDB object modeling and validation | Schema design, middleware hooks, and query optimization |
| Node.js | 18+ | JavaScript runtime for server-side execution | Asynchronous event-driven architecture with ES6+ support |
| Vite | 6.x | Next-generation frontend build tool | Lightning-fast HMR, optimized bundling, and development server |
| Tailwind CSS | 3.x | Utility-first CSS framework | Responsive design, custom theming, and component styling |
| JWT | 9.x | Secure token-based authentication | Stateless authentication with role-based access control |
| Bcrypt | 2.x | Password hashing and security | Secure password encryption with salt rounds |
| Nodemailer | 6.x | Email delivery service integration | SMTP configuration with Gmail service support |
| i18next | 25.x | Internationalization framework | Multi-language support with dynamic translation loading |
| Axios | 1.x | Promise-based HTTP client | API request interceptors and automatic transformation |
| Framer Motion | 12.x | Animation library for React | Smooth transitions, page animations, and gesture interactions |
| jsPDF | 3.x | Client-side PDF generation | Invoice creation with custom formatting and branding |
| React Router | 7.x | Client-side routing and navigation | Protected routes, nested routing, and dynamic navigation |
| Express Validator | 7.x | Server-side input validation | Schema-based validation with sanitization |
| Helmet | 7.x | Security middleware for Express | HTTP header protection and XSS prevention |
| Multer | 1.x | File upload handling | Image uploads with validation and storage management |

## Quick Start

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9%2B-CB3837?style=flat-square&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7%2B-47A248?style=flat-square&logo=mongodb&logoColor=white)

- Node.js 18.0 or higher
- npm 9.0 or higher
- MongoDB 7.0 or higher (local installation or MongoDB Atlas account)
- Modern web browser with ES6+ and TypeScript support
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/aaditya09750/Agroreach.git
cd AR

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install

# Optional: Install development tools globally
npm install -g nodemon concurrently
```

### Environment Configuration

Create environment files for both frontend and backend:

**Backend (.env)**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ar-ecommerce
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ar-ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env)**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Application Configuration
VITE_APP_NAME=AR E-Commerce
VITE_CURRENCY_DEFAULT=INR
```

### Running the Application

```bash
# Option 1: Start services separately

# Start MongoDB (if running locally)
mongod --dbpath C:\data\db

# Start the backend server (from the Backend directory)
cd Backend
npm start
# or with auto-reload: npm run dev

# Start the frontend development server (from the Frontend directory)
cd ../Frontend
npm run dev

# Option 2: Start both services concurrently
# Create a package.json in root directory with concurrently script
npm run dev

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
```

## Application Usage

### Customer Experience

#### Product Browsing
1. **Homepage Discovery** - Browse featured products, special offers, and category highlights on the landing page
2. **Shop Interface** - Access complete product catalog with advanced filtering by category, price range, and search
3. **Multi-View Options** - Switch between grid and list views for optimal product browsing
4. **Product Details** - View comprehensive product information with image gallery, descriptions, ratings, and reviews
5. **Smart Search** - Real-time search functionality with instant results across product names and descriptions

#### Shopping & Checkout
1. **Cart Management** - Add products with quantity selection, update quantities, remove items, and view real-time totals
2. **Guest Shopping** - Browse and add to cart without authentication, with seamless migration upon login
3. **Currency Selection** - Toggle between USD and INR with automatic price conversion throughout the application
4. **Language Preference** - Switch between English, Hindi, and Marathi for localized shopping experience
5. **Secure Checkout** - Complete billing information form with validation and multiple payment method support
6. **Order Confirmation** - Receive email confirmation with order details and downloadable PDF invoice

#### User Dashboard
1. **Profile Management** - Update personal information, contact details, and profile picture
2. **Order History** - View complete order history with status tracking and detailed order information
3. **Order Tracking** - Real-time order status updates with progress tracker (Pending → Processing → Shipped → Delivered)
4. **Invoice Download** - Generate and download PDF invoices for any completed order
5. **Billing Address** - Manage default billing and shipping addresses for faster checkout

### Admin Experience

#### Dashboard Analytics
1. **Revenue Tracking** - Monitor total revenue, monthly revenue, and percentage changes with time-based filtering
2. **Order Statistics** - Track total orders, pending orders, processing orders, and completed orders
3. **Customer Analytics** - View total customers, new customers, and customer growth metrics
4. **Product Insights** - Monitor total products, low stock alerts, and inventory status
5. **Time Filters** - Analyze data by today, this week, this month, this year, or all-time periods

#### Product Management
1. **Add Products** - Create new products with multiple images, detailed descriptions, pricing, and categorization
2. **Edit Products** - Update product information, adjust pricing, modify descriptions, and manage inventory
3. **Delete Products** - Remove discontinued or out-of-stock products from the catalog
4. **Stock Management** - Track inventory levels, set stock quantities, and receive low-stock alerts
5. **Image Management** - Upload up to 5 product images with preview and reordering capabilities

#### Order Management
1. **Order Overview** - View all orders with filtering by status, date range, and customer
2. **Order Processing** - Update order status through the complete lifecycle
3. **Order Details** - Access comprehensive order information including items, customer details, and payment status
4. **Customer Communication** - Send automated email notifications for order status updates
5. **Bulk Operations** - Process multiple orders simultaneously with batch status updates

#### Customer Management
1. **Customer List** - View all registered customers with detailed information
2. **Customer Details** - Access customer profiles, order history, and account status
3. **Account Control** - Activate or deactivate customer accounts as needed
4. **Analytics** - Track customer lifetime value, average order value, and engagement metrics

## API Documentation

### Authentication Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/auth/signup` | POST | Register new user account | None | `{"firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123"}` |
| `/api/auth/signin` | POST | User login with credentials | None | `{"email": "john@example.com", "password": "password123"}` |
| `/api/auth/me` | GET | Get current user profile | Required | None |
| `/api/auth/logout` | POST | Logout current user | Required | None |

### Product Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/products` | GET | Retrieve all products with filters | None | Query: `?category=vegetables&minPrice=10&maxPrice=50&search=tomato&page=1&limit=12` |
| `/api/products/:id` | GET | Get single product by ID | None | None |
| `/api/products` | POST | Create new product | Admin | `{"name": "Product", "price": 25, "category": "vegetables", "description": "...", "images": [...]}` |
| `/api/products/:id` | PUT | Update existing product | Admin | Same as POST |
| `/api/products/:id` | DELETE | Delete product | Admin | None |

### Cart Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/cart` | GET | Get user's cart | Required | None |
| `/api/cart/add` | POST | Add item to cart | Required | `{"productId": "123", "quantity": 2}` |
| `/api/cart/update` | PUT | Update cart item quantity | Required | `{"productId": "123", "quantity": 3}` |
| `/api/cart/remove/:productId` | DELETE | Remove item from cart | Required | None |
| `/api/cart/clear` | DELETE | Clear entire cart | Required | None |

### Order Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/orders` | GET | Get user's orders | Required | Query: `?status=pending&page=1&limit=10` |
| `/api/orders/:id` | GET | Get specific order details | Required | None |
| `/api/orders` | POST | Create new order | Required | `{"items": [...], "billingAddress": {...}, "paymentMethod": "COD", "total": 150}` |
| `/api/orders/:id/status` | PUT | Update order status | Admin | `{"status": "processing"}` |
| `/api/orders/:id/cancel` | PUT | Cancel order | Required | None |

### Admin Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/admin/dashboard/stats` | GET | Get dashboard statistics | Admin | Query: `?period=month` |
| `/api/admin/customers` | GET | Get all customers | Admin | Query: `?page=1&limit=20` |
| `/api/admin/customers/:id` | GET | Get customer details | Admin | None |
| `/api/admin/customers/:id/status` | PUT | Update customer status | Admin | `{"isActive": false}` |

### User Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/users/profile` | GET | Get user profile | Required | None |
| `/api/users/profile` | PUT | Update user profile | Required | `{"firstName": "John", "lastName": "Doe", "phone": "+1234567890"}` |
| `/api/users/billing-address` | PUT | Update billing address | Required | `{"streetAddress": "123 Main St", "city": "New York", ...}` |
| `/api/users/change-password` | PUT | Change password | Required | `{"currentPassword": "old", "newPassword": "new"}` |

### Newsletter & Contact Endpoints

| Endpoint | Method | Description | Authentication | Request Format |
|----------|--------|-------------|----------------|----------------|
| `/api/newsletter/subscribe` | POST | Subscribe to newsletter | None | `{"email": "user@example.com"}` |
| `/api/contact` | POST | Submit contact form | None | `{"name": "John", "email": "john@example.com", "message": "..."}` |

## System Architecture

The application implements a modern three-tier architecture optimized for scalability, security, and maintainability:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client Layer (React + TS)                   │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐      │
│  │  User Pages   │  │ Admin Panel   │  │  Shared UI    │      │
│  │  - Shop       │  │  - Dashboard  │  │  - Header     │      │
│  │  - Cart       │  │  - Products   │  │  - Footer     │      │
│  │  - Checkout   │  │  - Orders     │  │  - Modals     │      │
│  │  - Dashboard  │  │  - Customers  │  │  - Forms      │      │
│  └───────────────┘  └───────────────┘  └───────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Context API State Management                    │  │
│  │  - ProductContext  - CartContext    - UserContext        │  │
│  │  - OrderContext    - CurrencyContext - LanguageContext   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ▼ HTTPS/REST API ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Application Layer (Express.js)                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                   Middleware Stack                         │ │
│  │  - Helmet Security  - CORS  - Rate Limiting  - JWT Auth  │ │
│  │  - Body Parser     - Multer  - Validation  - Error Handler│ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Controllers  │  │  Services    │  │  Utilities   │         │
│  │  - Auth      │  │  - Email     │  │  - Token Gen │         │
│  │  - Products  │  │  - Image     │  │  - Helpers   │         │
│  │  - Orders    │  │  Handler     │  │  - Validator │         │
│  │  - Admin     │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                            ▼ Mongoose ODM ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Data Layer (MongoDB)                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Users   │  │ Products │  │  Orders  │  │   Cart   │       │
│  │  Schema  │  │  Schema  │  │  Schema  │  │  Schema  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  - Indexing for Performance                             │   │
│  │  - Schema Validation                                    │   │
│  │  - Middleware Hooks (pre/post)                          │   │
│  │  - Population for References                            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Architecture Highlights:**
- **Frontend**: React 19 with TypeScript for type safety, Context API for global state, React Router for navigation
- **Backend**: Express.js RESTful API with comprehensive middleware stack, JWT authentication, and role-based authorization
- **Database**: MongoDB with Mongoose ODM for schema modeling, validation, and efficient querying with indexing
- **Security**: Helmet for HTTP headers, bcrypt for password hashing, JWT for stateless authentication, rate limiting for API protection
- **File Storage**: Multer for handling multipart/form-data, local file system for product images with static serving
- **Email Service**: Nodemailer with Gmail SMTP for transactional emails and notifications
- **Deployment**: Frontend optimized with Vite build, Backend compatible with cloud platforms (Heroku, AWS, DigitalOcean)

## Performance Optimization

**Frontend Optimizations:**
- Code splitting with React lazy loading for reduced initial bundle size
- React.memo and useMemo for preventing unnecessary re-renders
- Image optimization with lazy loading and WebP format support
- Debounced search and filtering to minimize API calls
- Optimistic UI updates for instant user feedback
- Service worker caching for offline functionality
- Tree shaking to eliminate dead code in production builds
- CDN integration for static asset delivery

**Backend Optimizations:**
- MongoDB connection pooling for efficient database operations
- Indexed database queries on frequently accessed fields (email, orderId, category)
- Pagination for large data sets to reduce payload size
- Lean queries to return plain JavaScript objects instead of Mongoose documents
- Compression middleware for response payload reduction
- Rate limiting to prevent abuse and ensure fair resource allocation
- Efficient error handling without stack trace exposure in production
- Request validation to prevent malformed data processing

**Database Optimizations:**
- Compound indexes for multi-field query optimization
- Schema design following MongoDB best practices with embedded documents
- Connection retry logic with exponential backoff
- Projection to return only required fields
- Aggregation pipeline for complex analytics queries
- TTL indexes for automatic data cleanup
- Read/write concern configuration for consistency

## Development Features

**Hot Reload Development**
- Vite HMR for instant frontend updates without page refresh
- Nodemon integration for automatic backend server restarts on file changes
- Environment variable hot reloading for configuration updates
- Source maps for debugging TypeScript and React components

**Code Quality Tools**
- ESLint configuration for consistent JavaScript/TypeScript code style
- TypeScript strict mode for enhanced type checking
- React hooks linting for proper hook usage patterns
- Express validator for comprehensive input sanitization
- Pre-commit hooks with Husky for quality gates
- Prettier integration for automated code formatting

**Developer Experience**
- Comprehensive API documentation with request/response examples
- TypeScript interfaces for strong typing across the application
- Modular component architecture for maintainability
- Centralized configuration management with environment variables
- Error boundaries for graceful error handling in React
- Detailed server logging for debugging and monitoring

## Deployment Guide

### Production Environment Variables

**Frontend (Netlify/Vercel)**
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_APP_NAME=AR E-Commerce
VITE_CURRENCY_DEFAULT=INR
```

**Backend (Heroku/AWS/DigitalOcean)**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ar-ecommerce
JWT_SECRET=your_production_secret_key_min_32_characters
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
EMAIL_SERVICE=gmail
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Build Commands

```bash
# Frontend build for production
cd Frontend
npm run build
# Output: dist/ folder ready for deployment

# Backend preparation for deployment
cd Backend
npm ci --only=production
# Ensure .env is configured for production

# Create admin user (first-time setup)
npm run create-admin
```

### Deployment Platforms

**Frontend Deployment (Netlify)**
```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: Set in Netlify dashboard
```

**Backend Deployment (Heroku)**
```bash
# Login to Heroku
heroku login

# Create new app
heroku create ar-ecommerce-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main

# Open application
heroku open
```

**Database Deployment (MongoDB Atlas)**
1. Create MongoDB Atlas account
2. Create new cluster (free tier available)
3. Configure network access (IP whitelist or 0.0.0.0/0 for cloud deployment)
4. Create database user with read/write permissions
5. Get connection string and update MONGODB_URI

## Project Structure

```
AR/
├── Backend/
│   ├── server.js                    # Express server entry point
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Backend environment variables
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   └── cloudinary.js        # Image upload config
│   │   ├── controllers/             # Request handlers
│   │   │   ├── authController.js    # Authentication logic
│   │   │   ├── productController.js # Product CRUD operations
│   │   │   ├── orderController.js   # Order management
│   │   │   ├── adminController.js   # Admin dashboard logic
│   │   │   └── ...
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── User.js              # User schema with auth
│   │   │   ├── Product.js           # Product schema
│   │   │   ├── Order.js             # Order schema
│   │   │   └── Cart.js              # Shopping cart schema
│   │   ├── routes/                  # API route definitions
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── productRoutes.js     # Product endpoints
│   │   │   ├── orderRoutes.js       # Order endpoints
│   │   │   └── ...
│   │   ├── middleware/              # Express middleware
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── roleCheck.js         # Admin role verification
│   │   │   ├── errorHandler.js      # Global error handler
│   │   │   └── upload.js            # File upload handler
│   │   ├── validators/              # Input validation
│   │   │   ├── authValidator.js     # Auth data validation
│   │   │   ├── productValidator.js  # Product data validation
│   │   │   └── orderValidator.js    # Order data validation
│   │   └── utils/                   # Utility functions
│   │       ├── emailService.js      # Email sending logic
│   │       ├── tokenGenerator.js    # JWT token creation
│   │       ├── helpers.js           # Helper functions
│   │       └── imageHandler.js      # Image processing
│   ├── scripts/
│   │   ├── createAdmin.js           # Admin user creation script
│   │   └── updateStockUnit.js       # Stock management script
│   └── uploads/                     # Product image storage
│
├── Frontend/
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.ts               # Vite configuration
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── tsconfig.json                # TypeScript configuration
│   ├── .env                         # Frontend environment variables
│   ├── src/
│   │   ├── main.tsx                 # React entry point
│   │   ├── App.tsx                  # Root component with routing
│   │   ├── index.css                # Global styles
│   │   ├── pages/                   # Page components
│   │   │   ├── user/                # User-facing pages
│   │   │   │   ├── HomePage.tsx     # Landing page
│   │   │   │   ├── ShopPage.tsx     # Product catalog
│   │   │   │   ├── CartPage.tsx     # Shopping cart
│   │   │   │   ├── CheckoutPage.tsx # Checkout process
│   │   │   │   ├── DashboardPage.tsx # User dashboard
│   │   │   │   └── ...
│   │   │   └── admin/               # Admin pages
│   │   │       ├── AdminDashboard.tsx # Admin dashboard
│   │   │       └── AdminLoginPage.tsx # Admin login
│   │   ├── components/              # Reusable components
│   │   │   ├── layout/              # Layout components
│   │   │   │   ├── Header.tsx       # Site header
│   │   │   │   └── Footer.tsx       # Site footer
│   │   │   ├── admin/               # Admin components
│   │   │   │   ├── AdminOverview.tsx # Dashboard overview
│   │   │   │   ├── AdminProducts.tsx # Product management
│   │   │   │   ├── AdminOrders.tsx   # Order management
│   │   │   │   └── ...
│   │   │   ├── cart/                # Cart components
│   │   │   ├── checkout/            # Checkout components
│   │   │   ├── dashboard/           # User dashboard components
│   │   │   ├── ui/                  # UI components
│   │   │   └── ...
│   │   ├── context/                 # React Context providers
│   │   │   ├── UserContext.tsx      # User authentication state
│   │   │   ├── ProductContext.tsx   # Product data state
│   │   │   ├── CartContext.tsx      # Shopping cart state
│   │   │   ├── OrderContext.tsx     # Order management state
│   │   │   ├── CurrencyContext.tsx  # Currency conversion
│   │   │   └── LanguageContext.tsx  # i18n language state
│   │   ├── services/                # API service layer
│   │   │   ├── api.ts               # Axios configuration
│   │   │   ├── authService.ts       # Auth API calls
│   │   │   ├── productService.ts    # Product API calls
│   │   │   ├── orderService.ts      # Order API calls
│   │   │   ├── cartService.ts       # Cart API calls
│   │   │   └── ...
│   │   ├── i18n/                    # Internationalization
│   │   │   ├── config.ts            # i18next configuration
│   │   │   ├── useTranslation.ts    # Translation hook
│   │   │   └── locales/             # Language files
│   │   │       ├── en.json          # English translations
│   │   │       ├── hi.json          # Hindi translations
│   │   │       └── mr.json          # Marathi translations
│   │   ├── utils/                   # Utility functions
│   │   │   ├── pdfGenerator.ts      # PDF invoice generation
│   │   │   └── imageUtils.ts        # Image helper functions
│   │   └── data/
│   │       └── products.ts          # Product type definitions
│   └── dist/                        # Production build output
│
└── README.md                        # Project documentation
```

## Contributing Guidelines

![Contributing](https://img.shields.io/badge/Contributing-Welcome-brightgreen?style=for-the-badge&logo=git&logoColor=white)

### Development Workflow

1. **Repository Setup** - Fork the repository and clone to your local machine with `git clone`
2. **Branch Creation** - Create a feature branch from `main` with descriptive naming (`feature/add-payment-gateway`, `fix/cart-calculation-bug`)
3. **Environment Setup** - Follow installation instructions, configure environment variables, and verify both frontend and backend run successfully
4. **Code Implementation** - Implement changes following established patterns, TypeScript conventions, and React best practices
5. **Comprehensive Testing** - Test all features including authentication, cart operations, order processing, admin functions, and responsive design
6. **Code Quality** - Run ESLint, fix all warnings/errors, ensure TypeScript compilation succeeds, and maintain code coverage
7. **Documentation Update** - Update relevant documentation for API changes, new features, or modified functionality
8. **Pull Request Submission** - Submit detailed PR with description, testing notes, screenshots, and breaking changes (if any)

### Code Standards

**TypeScript & React:**
- Use functional components with TypeScript interfaces
- Implement proper type definitions for props, state, and API responses
- Follow React hooks best practices (dependency arrays, custom hooks)
- Use React.memo for performance-critical components
- Implement proper error boundaries for robust error handling

**Backend & API:**
- Follow RESTful API design principles with proper HTTP methods
- Implement comprehensive input validation with express-validator
- Use async/await for asynchronous operations with proper error handling
- Write modular, reusable controller functions
- Document API endpoints with request/response examples

**Styling & UI:**
- Use Tailwind CSS utility classes for styling
- Maintain mobile-first responsive design approach
- Ensure accessibility with ARIA attributes and semantic HTML
- Implement smooth animations with Framer Motion
- Follow consistent spacing, typography, and color schemes

**Code Organization:**
- Keep components focused and single-responsibility
- Use custom hooks for reusable logic
- Implement proper separation of concerns (services, components, utils)
- Write self-documenting code with clear variable/function names
- Add comments for complex business logic

## Testing Strategy

**Frontend Testing:**
- Component unit tests with React Testing Library
- Integration tests for user workflows (checkout, cart, authentication)
- End-to-end tests with Cypress for critical paths
- Responsive design testing across devices and browsers
- Accessibility testing with axe-core
- Performance testing with Lighthouse

**Backend Testing:**
- API endpoint testing with comprehensive coverage
- Authentication and authorization testing
- Database integration testing with test fixtures
- Error handling and validation testing
- Load testing for concurrent users
- Security testing for common vulnerabilities

**Continuous Integration:**
- Automated testing on pull requests
- Code coverage reporting with minimum thresholds
- Linting and type checking in CI pipeline
- Build verification for both frontend and backend

## Security Considerations

**Authentication & Authorization:**
- JWT tokens with secure secret keys and appropriate expiration
- Bcrypt password hashing with sufficient salt rounds (10+)
- Role-based access control (RBAC) for admin endpoints
- Protected routes with authentication middleware
- Secure session management and token refresh mechanism

**Data Protection:**
- Input validation and sanitization on all endpoints
- SQL/NoSQL injection prevention with parameterized queries
- XSS protection with content security policies
- CSRF protection for state-changing operations
- Rate limiting to prevent brute force attacks

**Infrastructure Security:**
- HTTPS enforcement in production
- Secure HTTP headers with Helmet middleware
- CORS configuration with specific origin whitelisting
- Environment variable protection (.env not in version control)
- Regular dependency updates for security patches

## Contact & Support

![Email](https://img.shields.io/badge/Email-aadigunjal0975%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![LinkedIn](https://img.shields.io/badge/LinkedIn-aadityagunjal0975-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-aaditya09750-181717?style=for-the-badge&logo=github&logoColor=white)

**Technical Support & Collaboration**

For technical inquiries, feature requests, bug reports, or development collaboration:

- **Primary Contact:** [aadigunjal0975@gmail.com](mailto:aadigunjal0975@gmail.com)
- **LinkedIn:** [aadityagunjal0975](https://www.linkedin.com/in/aadityagunjal0975)
- **GitHub Issues:** [Create Issue](https://github.com/aaditya09750/Agroreach/issues)
- **Repository:** [Agroreach](https://github.com/aaditya09750/Agroreach)

## License & Usage Rights

![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=for-the-badge&logo=copyright&logoColor=white)

**Usage Rights:** All rights reserved by the author. Contact for licensing inquiries, commercial usage permissions, and enterprise deployment discussions.

**Attribution Required:** Please credit the original author for any derivative works, academic references, or commercial implementations.

**Commercial License:** Available for enterprise use cases with custom features, dedicated support, and white-label solutions.

---

**AR E-Commerce Platform** delivers a comprehensive, production-ready solution for modern online retail with multilingual support, multi-currency transactions, and enterprise-grade features. This full-stack application demonstrates expertise in React/TypeScript development, Node.js backend architecture, MongoDB database design, RESTful API development, and responsive UI/UX design with a focus on performance, security, scalability, and exceptional user experience across all touchpoints.

**🌐 Try it live:** [Coming Soon]

**⭐ Star this repository** if you find it helpful!
