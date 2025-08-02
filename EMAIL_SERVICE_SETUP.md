# Email Service Setup Guide

## Overview

This guide will help you set up email functionality for the AET Ski Transfer booking system. The system supports multiple email providers and includes professional email templates.

## Recommended Email Services

### 1. Resend (Recommended) ⭐
- **Free Tier**: 3,000 emails/month
- **Setup Time**: 5 minutes
- **Pros**: Modern API, excellent deliverability, great developer experience
- **Cons**: None for this use case

### 2. SendGrid
- **Free Tier**: 100 emails/day
- **Setup Time**: 10 minutes
- **Pros**: Enterprise-grade, extensive features
- **Cons**: Lower free tier limit

### 3. Mailgun
- **Free Tier**: 5,000 emails/month for 3 months
- **Setup Time**: 10 minutes
- **Pros**: Good deliverability
- **Cons**: Free tier expires

## Setup Instructions

### Step 1: Choose Your Email Provider

#### Option A: Resend (Recommended)

1. **Sign up** at [resend.com](https://resend.com)
2. **Verify your domain** (optional but recommended)
3. **Create API key**:
   - Go to API Keys section
   - Click "Create API Key"
   - Copy the API key

#### Option B: SendGrid

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Verify sender identity**:
   - Go to Settings → Sender Authentication
   - Verify your domain or single sender
3. **Create API key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key

#### Option C: Mailgun

1. **Sign up** at [mailgun.com](https://mailgun.com)
2. **Add domain**:
   - Go to Domains section
   - Add your domain
   - Follow DNS setup instructions
3. **Get API key**:
   - Go to Settings → API Keys
   - Copy the Private API Key

### Step 2: Configure Environment Variables

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your email service details:
   ```env
   # For Resend
   EMAIL_PROVIDER=resend
   EMAIL_API_KEY=re_your_api_key_here
   EMAIL_FROM=bookings@aet.ski
   EMAIL_FROM_NAME=AET Ski Transfer
   EMAIL_REPLY_TO=info@aet.ski
   ```

   ```env
   # For SendGrid
   EMAIL_PROVIDER=sendgrid
   EMAIL_API_KEY=SG.your_api_key_here
   EMAIL_FROM=bookings@aet.ski
   EMAIL_FROM_NAME=AET Ski Transfer
   EMAIL_REPLY_TO=info@aet.ski
   ```

   ```env
   # For Mailgun
   EMAIL_PROVIDER=mailgun
   EMAIL_API_KEY=key-your_api_key_here
   EMAIL_FROM=bookings@aet.ski
   EMAIL_FROM_NAME=AET Ski Transfer
   EMAIL_REPLY_TO=info@aet.ski
   ```

### Step 3: Test the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test the booking flow**:
   - Go to `http://localhost:3000`
   - Complete the booking form
   - Submit the form
   - Check your email for the confirmation

3. **Check the API endpoint**:
   ```bash
   curl http://localhost:3000/api/booking
   ```

## Email Templates

The system includes three types of emails:

### 1. Quote Email
- Sent to customers after booking submission
- Includes all booking details
- Professional HTML and text versions
- Branded with AET colors and styling

### 2. Confirmation Email
- Confirms booking receipt
- Provides next steps
- Includes booking ID for reference

### 3. Error Notification
- Sent to admin when email sending fails
- Includes error details and booking data
- Helps with debugging

## Customization

### Email Templates
Edit the email templates in `src/lib/email.ts`:
- `generateQuoteEmailHTML()` - Quote email HTML
- `generateQuoteEmailText()` - Quote email text
- `generateConfirmationEmailHTML()` - Confirmation email HTML
- `generateConfirmationEmailText()` - Confirmation email text

### Pricing Logic
Modify the pricing calculation in `src/app/api/booking/route.ts`:
- `calculateEstimatedPrice()` function
- Adjust base prices and additional costs

### Email Content
Update email content in the template functions:
- Company information
- Contact details
- Terms and conditions
- Branding elements

## Production Deployment

### Environment Variables
Make sure to set these in your production environment:
- `EMAIL_PROVIDER`
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `EMAIL_FROM_NAME`
- `EMAIL_REPLY_TO`

### Domain Verification
For best deliverability:
1. Verify your domain with your email provider
2. Set up SPF, DKIM, and DMARC records
3. Use a dedicated email address (not Gmail/Hotmail)

### Monitoring
Set up monitoring for:
- Email delivery rates
- Bounce rates
- Spam complaints
- API usage limits

## Troubleshooting

### Common Issues

1. **"Email service not initialized"**
   - Check that `EMAIL_API_KEY` is set
   - Verify the API key is valid
   - Check provider name spelling

2. **"Failed to send emails"**
   - Check API key permissions
   - Verify sender email is authorized
   - Check email provider status

3. **Emails going to spam**
   - Verify your domain
   - Set up proper DNS records
   - Use a professional email address

4. **Rate limiting**
   - Check your email provider's limits
   - Implement rate limiting if needed
   - Monitor usage

### Debug Mode
Enable debug logging by adding to `.env.local`:
```env
DEBUG_EMAIL=true
```

## Security Considerations

1. **API Key Security**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys regularly

2. **Email Validation**
   - Validate email addresses before sending
   - Implement rate limiting
   - Monitor for abuse

3. **Data Protection**
   - Only send necessary data in emails
   - Consider GDPR compliance
   - Implement data retention policies

## Support

If you need help:
1. Check the email provider's documentation
2. Review the console logs for errors
3. Test with a simple email first
4. Contact your email provider's support

## Next Steps

After setting up email:
1. **Database Integration**: Store bookings in a database
2. **Admin Panel**: Create an admin interface to manage bookings
3. **Payment Integration**: Add payment processing
4. **SMS Notifications**: Add SMS confirmations
5. **Analytics**: Track booking conversions and email performance 