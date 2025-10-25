const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  try {
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.error('Nodemailer is not properly loaded');
      return null;
    }
    
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
      return;
    }

    const mailOptions = {
      from: `AR E-commerce <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

// Send order confirmation email
exports.sendOrderConfirmation = async (email, orderDetails) => {
  const html = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
    <p><strong>Total:</strong> $${orderDetails.total}</p>
    <p>We'll send you another email when your order ships.</p>
  `;

  await this.sendEmail({
    to: email,
    subject: `Order Confirmation - ${orderDetails.orderId}`,
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
