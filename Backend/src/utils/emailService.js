const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.error('Nodemailer is not properly loaded');
      return null;
    }

    console.log('Creating email transporter with:', {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      passLength: process.env.EMAIL_PASS?.length
    });
    
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
};

// Send email
exports.sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.log('Email transporter not available, skipping email send');
      return { success: false, message: 'Email service not configured' };
    }

    const mailOptions = {
      from: `AR E-commerce <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error; // Re-throw to allow controller to handle
  }
};

// Send order confirmation email
exports.sendOrderConfirmation = async (email, orderDetails) => {
  const {
    orderId,
    customerName,
    items,
    billingAddress,
    paymentMethod,
    subtotal,
    shipping,
    tax,
    total,
    orderDate,
    currency = 'USD' // Default to USD if not provided
  } = orderDetails;

  // Get currency symbol and formatting
  const getCurrencySymbol = (curr) => {
    return curr === 'INR' ? '₹' : '$';
  };

  const getCurrencyName = (curr) => {
    return curr === 'INR' ? 'INR' : 'USD';
  };

  const currencySymbol = getCurrencySymbol(currency);
  const currencyName = getCurrencyName(currency);

  // Format currency with proper symbol
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    // For INR, format with commas (Indian style: 1,00,000)
    if (currency === 'INR') {
      const parts = formattedPrice.split('.');
      const integerPart = parts[0];
      const decimalPart = parts[1];
      // Indian number system formatting
      const lastThree = integerPart.substring(integerPart.length - 3);
      const otherNumbers = integerPart.substring(0, integerPart.length - 3);
      const formatted = otherNumbers !== '' 
        ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
        : lastThree;
      return `${currencySymbol}${formatted}.${decimalPart}`;
    }
    // For USD, standard formatting with commas
    return `${currencySymbol}${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Generate items table rows
  const itemsRows = items.map((item, index) => `
    <tr style="border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 15px 10px; color: #666;">${index + 1}</td>
      <td style="padding: 15px 10px;">
        <strong style="color: #333;">${item.name}</strong>
      </td>
      <td style="padding: 15px 10px; text-align: center; color: #666;">${item.quantity}</td>
      <td style="padding: 15px 10px; text-align: right; color: #666;">${formatPrice(item.price)}</td>
      <td style="padding: 15px 10px; text-align: right; color: #2c5f2d; font-weight: 600;">${formatPrice(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Invoice - ${orderId}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 700px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2c5f2d 0%, #3d8b40 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">AgroReach</h1>
          <p style="color: #e8f5e9; margin: 8px 0 0 0; font-size: 14px;">Your Order is Confirmed!</p>
        </div>

        <!-- Invoice Header -->
        <div style="padding: 30px; background-color: #f9f9f9; border-bottom: 2px solid #2c5f2d;">
          <div style="display: table; width: 100%;">
            <div style="display: table-cell; width: 50%;">
              <h2 style="color: #2c5f2d; margin: 0 0 10px 0; font-size: 24px;">INVOICE</h2>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong style="color: #333;">Order ID:</strong> ${orderId}
              </p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong style="color: #333;">Order Date:</strong> ${orderDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong style="color: #333;">Currency:</strong> <span style="background-color: #e8f5e9; padding: 3px 10px; border-radius: 4px; color: #2c5f2d; font-weight: 600;">${currencyName}</span>
              </p>
            </div>
            <div style="display: table-cell; width: 50%; text-align: right; vertical-align: top;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong style="color: #333;">Payment Method:</strong><br>
                ${paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <!-- Customer & Billing Details -->
        <div style="padding: 30px; background-color: #ffffff;">
          <div style="margin-bottom: 30px;">
            <h3 style="color: #2c5f2d; margin: 0 0 15px 0; font-size: 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px;">
              Billing Information
            </h3>
            <p style="margin: 5px 0; color: #666; line-height: 1.6;">
              <strong style="color: #333;">${billingAddress.firstName} ${billingAddress.lastName}</strong><br>
              ${billingAddress.companyName ? `${billingAddress.companyName}<br>` : ''}
              ${billingAddress.streetAddress}<br>
              ${billingAddress.state}, ${billingAddress.zipCode}<br>
              ${billingAddress.country}
            </p>
            <p style="margin: 15px 0 5px 0; color: #666;">
              <strong style="color: #333;">Email:</strong> ${billingAddress.email}<br>
              <strong style="color: #333;">Phone:</strong> ${billingAddress.phone}
            </p>
          </div>

          <!-- Order Items Table -->
          <h3 style="color: #2c5f2d; margin: 0 0 15px 0; font-size: 16px; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px;">
            Order Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f5f5f5; border-bottom: 2px solid #2c5f2d;">
                <th style="padding: 12px 10px; text-align: left; color: #333; font-weight: 600; font-size: 13px;">#</th>
                <th style="padding: 12px 10px; text-align: left; color: #333; font-weight: 600; font-size: 13px;">Product</th>
                <th style="padding: 12px 10px; text-align: center; color: #333; font-weight: 600; font-size: 13px;">Qty</th>
                <th style="padding: 12px 10px; text-align: right; color: #333; font-weight: 600; font-size: 13px;">Price</th>
                <th style="padding: 12px 10px; text-align: right; color: #333; font-weight: 600; font-size: 13px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRows}
            </tbody>
          </table>

          <!-- Order Summary -->
          <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Subtotal:</td>
                <td style="padding: 8px 0; text-align: right; color: #333; font-size: 14px; font-weight: 600;">${formatPrice(subtotal)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Shipping:</td>
                <td style="padding: 8px 0; text-align: right; color: #333; font-size: 14px; font-weight: 600;">${shipping > 0 ? formatPrice(shipping) : 'FREE'}</td>
              </tr>
              ${tax > 0 ? `
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Tax:</td>
                <td style="padding: 8px 0; text-align: right; color: #333; font-size: 14px; font-weight: 600;">${formatPrice(tax)}</td>
              </tr>
              ` : ''}
              <tr style="border-top: 2px solid #2c5f2d;">
                <td style="padding: 15px 0 8px 0; color: #2c5f2d; font-size: 18px; font-weight: 700;">Total:</td>
                <td style="padding: 15px 0 8px 0; text-align: right; color: #2c5f2d; font-size: 20px; font-weight: 700;">${formatPrice(total)}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Thank You Message -->
        <div style="padding: 30px; background-color: #f9f9f9; text-align: center; border-top: 1px solid #e0e0e0;">
          <h3 style="color: #2c5f2d; margin: 0 0 15px 0; font-size: 18px;">Thank You for Your Order!</h3>
          <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6; font-size: 14px;">
            We're processing your order and will send you a shipping confirmation email as soon as it's on its way.
          </p>
          <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; margin: 5px 0; font-size: 12px;">
              If you have any questions, please contact us at:<br>
              <a href="mailto:agroreach01@gmail.com" style="color: #2c5f2d; text-decoration: none;">agroreach01@gmail.com</a>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; background-color: #2c5f2d; text-align: center;">
          <p style="color: #e8f5e9; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} AgroReach. All rights reserved.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  await this.sendEmail({
    to: email,
    subject: `Order Confirmation & Invoice - ${orderId}`,
    html
  });
};

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
  const html = `
    <h2>Welcome to AR E-commerce!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for creating an account with us.</p>
    <p>Start shopping and enjoy exclusive deals!</p>
  `;

  await this.sendEmail({
    to: email,
    subject: 'Welcome to AR E-commerce',
    html
  });
};
