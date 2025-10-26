# Contact Form Setup Guide

## Overview
The contact form allows logged-in users to send messages directly to the AgroReach team at `agroreach01@gmail.com`. Users receive a confirmation email upon successful submission.

## Features
- ✅ User authentication required
- ✅ Email sent to admin (agroreach01@gmail.com)
- ✅ Confirmation email sent to user
- ✅ Form validation (required fields, email format)
- ✅ Loading states and error handling
- ✅ User-friendly notifications

## Backend Setup

### 1. Environment Variables
Create a `.env` file in the `Backend` directory (use `.env.example` as reference):

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=agroreach01@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 2. Gmail App Password Setup
Since the email uses Gmail, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords** (under 2-Step Verification section)
5. Select app: **Mail**
6. Select device: **Other** (enter "AR E-commerce")
7. Click **Generate**
8. Copy the 16-character password
9. Paste it in your `.env` file as `EMAIL_PASS`

**Important:** Never commit your `.env` file to version control!

### 3. Dependencies
The following packages are already included in `package.json`:
- `nodemailer` - For sending emails

If you need to install:
```bash
npm install nodemailer
```

### 4. API Endpoint
**POST** `/api/contact`
- **Auth Required:** Yes (Bearer token)
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Product Inquiry",
    "message": "I have a question about..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Your message has been sent successfully. We will get back to you soon!"
  }
  ```

## Frontend Implementation

### 1. Contact Service
Located at: `Frontend/src/services/contactService.ts`

Provides the `sendMessage` method to submit contact forms.

### 2. Contact Form Component
Located at: `Frontend/src/components/sections/ContactContent.tsx`

Features:
- Auto-populated user name and email (if logged in)
- Real-time validation
- Disabled state during submission
- Success/error notifications
- Automatic redirect to sign-in if not authenticated

### 3. Usage Flow
1. User navigates to Contact page
2. Fills in the contact form
3. Clicks "Send Message"
4. System checks if user is logged in
5. Validates form fields
6. Sends email to admin
7. Sends confirmation email to user
8. Displays success notification
9. Form resets

## Email Templates

### Admin Email
- **To:** agroreach01@gmail.com
- **Subject:** Contact Form: [User's Subject]
- **Contains:**
  - User's name
  - User's email
  - Subject
  - Message
  - User ID (if logged in)
  - Timestamp

### User Confirmation Email
- **To:** User's email address
- **Subject:** We received your message - AgroReach
- **Contains:**
  - Thank you message
  - Summary of submitted message
  - Contact information for urgent matters

## Error Handling

### Frontend
- Authentication check before submission
- Form field validation
- Email format validation
- Network error handling
- User-friendly error messages via notifications

### Backend
- Input validation
- Email service error handling
- Detailed logging
- Graceful degradation if email service fails

## Testing

### Manual Testing Checklist
- [ ] User can access contact form
- [ ] Form validates required fields
- [ ] Form validates email format
- [ ] Unauthenticated users are redirected to sign-in
- [ ] Email is sent to agroreach01@gmail.com
- [ ] Confirmation email is sent to user
- [ ] Success notification appears
- [ ] Form resets after submission
- [ ] Error notifications work correctly
- [ ] Loading state displays during submission

### Test the Email Functionality
1. Configure the `.env` file with valid Gmail credentials
2. Start the backend server: `npm run dev`
3. Start the frontend: `npm run dev`
4. Log in as a user
5. Navigate to Contact page
6. Fill in all fields
7. Submit the form
8. Check both inboxes:
   - agroreach01@gmail.com (admin email)
   - Your test email (confirmation)

## Troubleshooting

### Email Not Sending
1. **Check Gmail App Password:**
   - Ensure 2-Step Verification is enabled
   - Regenerate App Password if needed
   - Make sure you're using the App Password, not regular password

2. **Check Environment Variables:**
   ```bash
   # In Backend directory
   echo $EMAIL_USER
   echo $EMAIL_PASS
   ```

3. **Check Console Logs:**
   - Backend console shows email sending status
   - Look for errors in nodemailer

4. **Gmail Security:**
   - Check if Gmail blocked the sign-in attempt
   - Review Google Account security notifications

### Frontend Issues
1. **User Not Logged In:**
   - Verify JWT token in localStorage (`user_token`)
   - Check API interceptor is adding Authorization header

2. **API Connection:**
   - Verify `VITE_API_BASE_URL` in Frontend `.env`
   - Check CORS settings in backend
   - Verify backend is running on correct port

3. **Form Validation:**
   - Check browser console for validation errors
   - Verify all required fields are filled

## File Structure
```
Backend/
├── src/
│   ├── controllers/
│   │   └── contactController.js       # Contact form logic
│   ├── routes/
│   │   └── contactRoutes.js          # Contact API routes
│   └── utils/
│       └── emailService.js           # Email sending utility
└── .env.example                      # Environment template

Frontend/
├── src/
│   ├── components/
│   │   └── sections/
│   │       └── ContactContent.tsx    # Contact form UI
│   └── services/
│       └── contactService.ts         # Contact API service
```

## Security Notes
- User must be authenticated to send messages
- Email addresses are validated
- Rate limiting applies to all API routes
- Sensitive information (App Password) stored in environment variables
- Never expose EMAIL_PASS in client-side code

## Future Enhancements
- [ ] Add CAPTCHA to prevent spam
- [ ] Implement rate limiting specifically for contact form
- [ ] Add file attachment support
- [ ] Store contact messages in database
- [ ] Admin dashboard to view/manage contact messages
- [ ] Auto-responder with ticket number
- [ ] Email templates with better styling
- [ ] Support for multiple languages
