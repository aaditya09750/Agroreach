const Newsletter = require('../models/Newsletter');
const { sendEmail } = require('../utils/emailService');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    console.log('Newsletter subscription request received');
    console.log('Request body:', req.body);

    const { email } = req.body;

    // Validate email field
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed to our newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = Date.now();
        await existingSubscriber.save();
        
        // Send welcome back email
        await sendSubscriptionEmail(email);
        
        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated'
        });
      }
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({ email });

    console.log('Subscriber created:', subscriber);

    // Send welcome email
    try {
      await sendSubscriptionEmail(email);
      console.log('Welcome email sent successfully');
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter! Check your email for confirmation.',
      data: {
        email: subscriber.email,
        subscribedAt: subscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again later.',
      error: error.message
    });
  }
};

// Helper function to send subscription email
const sendSubscriptionEmail = async (email) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header with Logo -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c5f2d; margin: 0; font-size: 28px;">
            🌱 Welcome to Agroreach!
          </h1>
        </div>

        <!-- Main Content -->
        <div style="background-color: #f0f8f0; padding: 25px; border-radius: 6px; margin-bottom: 25px;">
          <h2 style="color: #2c5f2d; margin-top: 0; font-size: 22px;">
            Thank You for Subscribing! 🎉
          </h2>
          <p style="color: #333; line-height: 1.6; margin-bottom: 15px; font-size: 16px;">
            We're thrilled to have you join our growing community of agriculture enthusiasts and organic product lovers!
          </p>
          <p style="color: #555; line-height: 1.6; font-size: 15px;">
            You're now part of the Agroreach family, and we can't wait to share amazing content with you.
          </p>
        </div>

        <!-- What to Expect Section -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #2c5f2d; margin-bottom: 15px; font-size: 18px;">
            What You'll Receive:
          </h3>
          <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>🌾 <strong>Exclusive Deals:</strong> Special discounts on organic products</li>
            <li>📰 <strong>Latest Updates:</strong> New product launches and seasonal offerings</li>
            <li>🌿 <strong>Expert Tips:</strong> Agricultural insights and organic farming guides</li>
            <li>🎁 <strong>Subscriber-Only Offers:</strong> Early access to sales and promotions</li>
            <li>📚 <strong>Educational Content:</strong> Learn about sustainable agriculture</li>
          </ul>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/shop" 
             style="display: inline-block; background-color: #2c5f2d; color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 25px; font-weight: bold; font-size: 16px;">
            Start Shopping
          </a>
        </div>

        <!-- Social Media -->
        <div style="border-top: 2px solid #e0e0e0; padding-top: 25px; margin-top: 30px;">
          <p style="color: #666; text-align: center; margin-bottom: 15px; font-size: 14px;">
            Stay Connected with Us:
          </p>
          <div style="text-align: center; margin-bottom: 20px;">
            <a href="#" style="display: inline-block; margin: 0 10px; color: #2c5f2d; text-decoration: none;">
              📘 Facebook
            </a>
            <a href="#" style="display: inline-block; margin: 0 10px; color: #2c5f2d; text-decoration: none;">
              📷 Instagram
            </a>
            <a href="#" style="display: inline-block; margin: 0 10px; color: #2c5f2d; text-decoration: none;">
              🐦 Twitter
            </a>
          </div>
        </div>

        <!-- Contact Info -->
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-top: 25px;">
          <p style="color: #666; margin: 0 0 10px 0; font-size: 14px; text-align: center;">
            <strong>Need Help?</strong>
          </p>
          <p style="color: #666; margin: 0; font-size: 14px; text-align: center;">
            📧 Email: <a href="mailto:agroreach@gmail.com" style="color: #2c5f2d; text-decoration: none;">agroreach@gmail.com</a><br>
            📞 Phone: <a href="tel:+918433509521" style="color: #2c5f2d; text-decoration: none;">+91 84335 09521</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
            You're receiving this email because you subscribed to Agroreach newsletter.
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Agroreach. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: '🌱 Welcome to Agroreach Newsletter - You\'re Subscribed!',
    html: emailHtml
  });
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again later.',
      error: error.message
    });
  }
};

// @desc    Get all subscribers (Admin only)
// @route   GET /api/newsletter/subscribers
// @access  Private/Admin
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .select('email subscribedAt')
      .sort('-subscribedAt');

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: error.message
    });
  }
};
