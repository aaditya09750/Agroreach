import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DashboardBanner from '../../components/sections/DashboardBanner';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import OrderDetailContent from '../../components/dashboard/OrderDetailContent';
import { Order } from '../../context/OrderContext';
import { orderService } from '../../services/orderService';
import { getImageUrl } from '../../utils/imageUtils';

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | undefined>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const loadOrder = async () => {
    if (!orderId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    console.log('OrderDetailPage - orderId from params:', orderId);

    // Always fetch fresh data from server to get latest status
    try {
      setLoading(true);
      console.log('OrderDetailPage - fetching order from server');
      const response = await orderService.getOrderById(orderId);
      
      console.log('OrderDetailPage - server response:', response);
      
      if (response.success && response.data) {
        const serverOrder = response.data.order || response.data;
        
        console.log('OrderDetailPage - server order:', serverOrder);
          
          // Map server order to local Order format
          const mappedOrder: Order = {
            id: serverOrder._id,
            _id: serverOrder._id,
            orderId: serverOrder.orderId,
            date: new Date(serverOrder.createdAt).toLocaleDateString('en-US', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            }),
            total: `$${serverOrder.total.toFixed(2)}`,
            status: serverOrder.status === 'pending' ? 'Order received' :
                   serverOrder.status === 'confirmed' ? 'Processing' :
                   serverOrder.status === 'shipped' ? 'On the way' :
                   serverOrder.status === 'delivered' ? 'Delivered' : 'Order received',
            items: serverOrder.items?.map((item: {
              product: string | { _id: string; name: string; images?: string[] };
              name?: string;
              price: number;
              quantity: number;
              image?: string;
            }) => {
              // Extract product info
              let productId: string;
              let productName: string;
              let productImage: string;

              if (typeof item.product === 'string') {
                // Product is just an ID
                productId = item.product;
                productName = item.name || 'Product';
                productImage = getImageUrl(item.image);
              } else {
                // Product is populated object
                productId = item.product._id;
                productName = item.product.name || item.name || 'Product';
                productImage = getImageUrl(item.product.images?.[0] || item.image);
              }

              return {
                id: productId,
                name: productName,
                price: item.price,
                quantity: item.quantity,
                image: productImage,
              };
            }) || [],
            subtotal: serverOrder.subtotal || 0,
            shipping: serverOrder.shipping || 0,
            gst: serverOrder.tax || 0,
            billingAddress: {
              firstName: serverOrder.billingAddress?.firstName || '',
              lastName: serverOrder.billingAddress?.lastName || '',
              email: serverOrder.billingAddress?.email || '',
              phone: serverOrder.billingAddress?.phone || '',
              streetAddress: serverOrder.billingAddress?.streetAddress || '',
              country: serverOrder.billingAddress?.country || '',
              state: serverOrder.billingAddress?.state || '',
              zipCode: serverOrder.billingAddress?.zipCode || '',
              companyName: serverOrder.billingAddress?.companyName || '',
            },
          };
          
          console.log('OrderDetailPage - mapped server order:', mappedOrder);
          setOrder(mappedOrder);
        } else {
          setNotFound(true);
      }
    } catch (error) {
      console.error('OrderDetailPage - Error fetching order:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-white">
        <Header />
        <main>
          <DashboardBanner />
          <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-3">
                <DashboardSidebar />
              </aside>
              <section className="lg:col-span-9">
                <div className="border border-border-color rounded-lg p-12 text-center">
                  <p className="text-lg text-text-muted">Loading order details...</p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !order) {
    return <Navigate to="/order-history" replace />;
  }

  return (
    <div className="bg-white">
      <Header />
      <main>
        <DashboardBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-[120px] py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <DashboardSidebar />
            </aside>
            <section className="lg:col-span-9">
              <OrderDetailContent order={order} />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
