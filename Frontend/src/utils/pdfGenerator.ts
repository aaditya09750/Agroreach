import jsPDF from 'jspdf';

interface OrderItem {
  name: string;
  quantity: number;
  price: number | string;
  image?: string;
}

interface InvoiceData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  items: OrderItem[];
  subtotal: number | string;
  shipping: number | string;
  tax: number | string;
  total: number | string;
  paymentMethod: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  currency?: string;
}

export const generateInvoicePDF = (invoiceData: InvoiceData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 25;

  // Helper function to add text with wrapping
  const addText = (text: string, x: number, y: number, maxWidth?: number, align: 'left' | 'center' | 'right' = 'left') => {
    if (align === 'center') {
      doc.text(text, x, y, { align: 'center', maxWidth });
    } else if (align === 'right') {
      doc.text(text, x, y, { align: 'right', maxWidth });
    } else {
      doc.text(text, x, y, { maxWidth });
    }
  };

  // Format currency - jsPDF doesn't support Rupee symbol, use Rs. instead
  const formatCurrency = (amount: number) => {
    if (invoiceData.currency === 'USD') {
      return `$ ${amount.toFixed(2)}`;
    } else {
      // Use Rs. for Rupee as jsPDF doesn't support ₹ symbol
      return `Rs. ${amount.toFixed(2)}`;
    }
  };

  // Header - Company Name
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94); // Green color
  addText('Agroreach', pageWidth / 2, yPosition, undefined, 'center');
  
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  addText('Fresh & Healthy Organic Food', pageWidth / 2, yPosition, undefined, 'center');
  
  yPosition += 15;

  // Invoice Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  addText('INVOICE', pageWidth / 2, yPosition, undefined, 'center');
  
  yPosition += 12;

  // Horizontal line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 12;

  // Order Info Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  addText(`Order ID: ${invoiceData.orderId}`, 20, yPosition);
  addText(`Date: ${invoiceData.date}`, pageWidth - 20, yPosition, undefined, 'right');
  yPosition += 12;

  // Customer and Shipping Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  addText('Bill To:', 20, yPosition);
  
  if (invoiceData.shippingAddress) {
    addText('Ship To:', pageWidth / 2 + 5, yPosition);
  }
  
  yPosition += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  
  // Customer details (left column)
  addText(invoiceData.customerName, 20, yPosition);
  if (invoiceData.shippingAddress?.street) {
    addText(invoiceData.shippingAddress.street, pageWidth / 2 + 5, yPosition, 85);
  }
  yPosition += 5;
  
  addText(invoiceData.email, 20, yPosition);
  if (invoiceData.shippingAddress?.city && invoiceData.shippingAddress?.state) {
    const cityState = `${invoiceData.shippingAddress.city}, ${invoiceData.shippingAddress.state}`;
    const zipPart = invoiceData.shippingAddress.zip ? ` ${invoiceData.shippingAddress.zip}` : '';
    addText(cityState + zipPart, pageWidth / 2 + 5, yPosition, 85);
  }
  yPosition += 5;
  
  addText(invoiceData.phone, 20, yPosition);
  if (invoiceData.shippingAddress?.country) {
    addText(invoiceData.shippingAddress.country, pageWidth / 2 + 5, yPosition);
  }
  yPosition += 12;

  // Payment Method
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  addText('Payment Method:', 20, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 102, 204); // Blue color for payment method
  addText(invoiceData.paymentMethod, 60, yPosition);
  yPosition += 12;

  // Horizontal line
  doc.setDrawColor(220, 220, 220);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Table Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setFillColor(245, 245, 245);
  doc.rect(20, yPosition - 6, pageWidth - 40, 9, 'F');
  doc.setTextColor(0, 0, 0);
  
  addText('Item', 25, yPosition);
  addText('Qty', pageWidth - 85, yPosition, undefined, 'center');
  addText('Price', pageWidth - 55, yPosition, undefined, 'right');
  addText('Total', pageWidth - 25, yPosition, undefined, 'right');
  yPosition += 9;

  // Table Items
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  
  invoiceData.items.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, '')) : item.price;
    const itemTotal = itemPrice * item.quantity;

    // Add alternating row background
    if (index % 2 === 1) {
      doc.setFillColor(252, 252, 252);
      doc.rect(20, yPosition - 5, pageWidth - 40, 8, 'F');
    }

    addText(item.name, 25, yPosition, 80);
    addText(item.quantity.toString(), pageWidth - 85, yPosition, undefined, 'center');
    addText(formatCurrency(itemPrice), pageWidth - 55, yPosition, undefined, 'right');
    addText(formatCurrency(itemTotal), pageWidth - 25, yPosition, undefined, 'right');
    yPosition += 8;
  });

  yPosition += 5;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  // Totals Section
  const subtotal = typeof invoiceData.subtotal === 'string' ? parseFloat(invoiceData.subtotal.replace(/[^0-9.-]+/g, '')) : invoiceData.subtotal;
  const shipping = typeof invoiceData.shipping === 'string' ? parseFloat(invoiceData.shipping.replace(/[^0-9.-]+/g, '')) : invoiceData.shipping;
  const tax = typeof invoiceData.tax === 'string' ? parseFloat(invoiceData.tax.replace(/[^0-9.-]+/g, '')) : invoiceData.tax;
  const total = typeof invoiceData.total === 'string' ? parseFloat(invoiceData.total.replace(/[^0-9.-]+/g, '')) : invoiceData.total;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  
  addText('Subtotal:', pageWidth - 75, yPosition);
  addText(formatCurrency(subtotal), pageWidth - 25, yPosition, undefined, 'right');
  yPosition += 6;

  // Display "Free" for shipping if it's 0, otherwise show the amount
  addText('Shipping:', pageWidth - 75, yPosition);
  if (shipping === 0) {
    doc.setTextColor(34, 197, 94); // Green color for "Free"
    addText('Free', pageWidth - 25, yPosition, undefined, 'right');
    doc.setTextColor(60, 60, 60); // Reset to normal color
  } else {
    addText(formatCurrency(shipping), pageWidth - 25, yPosition, undefined, 'right');
  }
  yPosition += 6;

  const taxLabel = tax > 0 ? 'GST (18%):' : 'Tax:';
  addText(taxLabel, pageWidth - 75, yPosition);
  addText(formatCurrency(tax), pageWidth - 25, yPosition, undefined, 'right');
  yPosition += 10;

  // Total with green background
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setFillColor(34, 197, 94);
  doc.roundedRect(pageWidth - 95, yPosition - 6, 75, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  addText('TOTAL:', pageWidth - 75, yPosition + 2);
  addText(formatCurrency(total), pageWidth - 25, yPosition + 2, undefined, 'right');
  yPosition += 18;

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const footerY = pageHeight - 25;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
  addText('Thank you for your business!', pageWidth / 2, footerY, undefined, 'center');
  
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  addText('For any questions, please contact us at support@agroreach.com', pageWidth / 2, footerY + 5, undefined, 'center');

  // Save the PDF
  const fileName = `Invoice_${invoiceData.orderId}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};
