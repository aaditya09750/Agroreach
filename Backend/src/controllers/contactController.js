const { sendEmail } = require('../utils/emailService');

// @desc    Send contact form message
// @route   POST /api/contact
// @access  Private (requires authentication)
exports.sendContactMessage = async (req, res) => {
  try {
    console.log('Contact form request received');
    console.log('Request body:', req.body);
    console.log('User:', req.user);

    const { name, email, subject, message, location, currency } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed: Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email');
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Get user info from authenticated request
    const userId = req.user?.id || req.user?._id;
    const userName = req.user?.name || name;

    console.log('Preparing to send emails...');

    // Prepare email content for admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #2c5f2d; margin-bottom: 20px; border-bottom: 2px solid #2c5f2d; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">From:</strong>
            <p style="margin: 5px 0; color: #666;">${name}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">${email}</p>
          </div>

          ${location ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Location/Region:</strong>
            <p style="margin: 5px 0; color: #666;">
              ${location}
              ${currency ? `<span style="background-color: #f0f0f0; padding: 2px 8px; border-radius: 4px; margin-left: 8px; font-size: 12px;">${currency}</span>` : ''}
            </p>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Subject:</strong>
            <p style="margin: 5px 0; color: #666;">${subject}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #333;">Message:</strong>
            <div style="margin: 10px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #2c5f2d; border-radius: 4px;">
              <p style="margin: 0; color: #444; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          ${userId ? `
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              User ID: ${userId}<br>
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
          ` : ''}
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>This is an automated message from AR E-commerce Contact Form</p>
        </div>
      </div>
    `;

    // Prepare confirmation email for user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #2c5f2d; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Hi ${name},
          </p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2c5f2d; margin-top: 0; font-size: 16px;">Your Message Summary:</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; color: #666; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            If you have any urgent concerns, please feel free to reach out to us directly at agroreach01@gmail.com.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #2c5f2d;">The AgroReach Team</strong>
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} AgroReach. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send email to admin
    await sendEmail({
      to: 'agroreach01@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: adminEmailHtml
    });

    console.log('Admin email sent successfully');

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'We received your message - AgroReach',
      html: userEmailHtml
    });

    console.log('User confirmation email sent successfully');

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
