# Admin Panel Documentation

## Overview
A comprehensive admin panel has been created for the AgroReach website that matches the current design system, including fonts (Poppins), colors (Primary: #00B207), and overall styling.

## Features

### 1. **Admin Dashboard** (`/admin`)
The main admin interface with three primary sections:

#### **Overview Section**
- Dashboard statistics (Customers, Income)
- Welcome section with customer avatars
- Total income chart visualization area
- Popular products sidebar
- Comments section for recent feedback
- Real-time metrics with percentage changes

#### **Products Section** (Add Products)
- Product image upload (up to 5 images)
- Product details form:
  - Product name
  - Category selection (Vegetables, Fruits, Grains, Dairy, Meat, Organic)
  - Price input with currency symbol
  - Stock quantity management
  - Product description
  - Tag management system
- Recent products table with:
  - Product thumbnail
  - Category display
  - Price and stock information
  - Status badges (Active/Inactive)
  - Quick edit actions

#### **Orders Section** (Shop Orders)
- Order statistics cards:
  - Total orders with growth percentage
  - Pending orders count
  - Completed orders with metrics
  - Total revenue tracking
- Advanced order management:
  - Search functionality
  - Status filter (All, Pending, Processing, Completed, Cancelled)
  - Detailed order table with:
    - Order ID
    - Customer information with avatar
    - Order date
    - Number of items
    - Total amount
    - Status badges with color coding
    - View order details action
  - Pagination controls

### 2. **Components Created**

#### **AdminHeader.tsx**
- Logo with "Admin Panel" designation
- Global search bar
- Create button (Primary green color)
- Notification bell with indicator
- User profile icon

#### **AdminSidebar.tsx**
- Navigation menu items:
  - Home (Overview)
  - Products
  - Customers (with dropdown indicator)
  - Shop (Orders)
  - Income (with dropdown indicator)
  - Promote (with dropdown indicator)
- Bottom menu:
  - Help (with notification badge showing 8)
  - Logout
- Active state highlighting
- Hover effects matching site style

#### **AdminOverview.tsx**
- Statistics cards with trend indicators
- Customer showcase section
- Chart placeholder for income visualization
- Popular products list
- Comments section

#### **AdminAddProduct.tsx**
- Multi-image upload with preview
- Comprehensive product form
- Tag management
- Recent products table

#### **AdminOrders.tsx**
- Order statistics dashboard
- Advanced filtering and search
- Detailed order table
- Status management

## Design System Alignment

### Colors Used
- **Primary**: `#00B207` (Green)
- **Primary Light**: `#EDF2EE`
- **Text Dark**: `#1A1A1A`
- **Text Light**: `#4D4D4D`
- **Text Muted**: `#808080`
- **Border**: `#E6E6E6`
- **Warning**: `#FF8A00`
- **Sale/Error**: `#EA4B48`
- **Background**: `#F2F2F2` (Gray-50)

### Typography
- **Font Family**: Poppins (from Google Fonts)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- Consistent with existing site typography

### Layout
- **Sidebar Width**: 256px (w-64)
- **Header Height**: 73px
- **Spacing**: Consistent 24px (p-6) padding
- **Border Radius**: 12px (rounded-xl) for cards
- **Gaps**: 24px between elements

### UI Elements
- Rounded corners matching site style
- Consistent hover states
- Primary color for active states
- Shadow effects for elevation
- Border styling consistent with main site

## Routing
- Main route: `/admin`
- Integrated into existing App.tsx routing system

## Usage

### Accessing the Admin Panel
Navigate to `http://localhost:5173/admin` (or your deployment URL + `/admin`)

### Navigation
Click on the sidebar menu items to switch between:
- **Home**: Overview dashboard
- **Products**: Add and manage products
- **Shop**: View and manage orders

## Technical Details

### File Structure
```
Frontend/
├── src/
│   ├── pages/
│   │   └── admin/
│   │       └── AdminDashboard.tsx
│   └── components/
│       └── admin/
│           ├── AdminHeader.tsx
│           ├── AdminSidebar.tsx
│           ├── AdminOverview.tsx
│           ├── AdminAddProduct.tsx
│           └── AdminOrders.tsx
```

### Dependencies
- React
- React Router DOM
- Lucide React (for icons)
- Tailwind CSS (for styling)

### State Management
- Local state management using React useState
- Active view switching between sections
- Form handling for product addition
- Search and filter functionality

## Future Enhancements
- Integration with backend API
- Real data fetching and updates
- User authentication for admin access
- Role-based access control
- Advanced analytics and reporting
- Export functionality for orders and products
- Bulk operations for products
- Order status update workflow
- Real-time notifications

## Notes
- All styling matches the existing website design system
- Responsive design principles applied
- Accessible UI with proper ARIA labels
- Clean, maintainable code structure
- Ready for backend integration
