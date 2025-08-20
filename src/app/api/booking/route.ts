// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData } from '@/types';
import { initializeEmailService, getEmailService, EmailConfig } from '@/lib/email';
import { generateQuoteId } from '@/lib/utils';

// Initialize email service with environment variables
function initializeEmailServiceFromEnv(): void {
  // Debug environment variables
  console.log('🔍 Email Service Debug Info:');
  console.log('EMAIL_PROVIDER:', process.env.EMAIL_PROVIDER);
  console.log('EMAIL_API_KEY exists:', !!process.env.EMAIL_API_KEY);
  console.log('EMAIL_API_KEY length:', process.env.EMAIL_API_KEY?.length || 0);
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('EMAIL_FROM_NAME:', process.env.EMAIL_FROM_NAME);
  console.log('EMAIL_REPLY_TO:', process.env.EMAIL_REPLY_TO);

  // Type-safe provider validation
  const validProviders: EmailConfig['provider'][] = ['resend', 'sendgrid', 'mailgun', 'emailjs', 'nodemailer'];
  const envProvider = process.env.EMAIL_PROVIDER;
  const provider: EmailConfig['provider'] = validProviders.find(p => p === envProvider) || 'resend';

  const emailConfig: EmailConfig = {
    provider,
    apiKey: process.env.EMAIL_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    fromName: process.env.EMAIL_FROM_NAME || 'AET Ski Transfer',
    replyTo: process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com',
  };

  // For testing, ensure we're using a verified sender
  if (emailConfig.fromEmail === 'onboarding@resend.dev') {
    console.log('ℹ️ Using Resend onboarding email for testing');
  }

  // Debug the actual config being passed to email service
  console.log('🔧 Email Service Config:');
  console.log('  Provider:', emailConfig.provider);
  console.log('  From Email:', emailConfig.fromEmail);
  console.log('  From Name:', emailConfig.fromName);
  console.log('  Reply To:', emailConfig.replyTo);
  console.log('  API Key Length:', emailConfig.apiKey.length);

  if (!emailConfig.apiKey) {
    console.error('❌ Email API key not configured. Emails will not be sent.');
    console.error('Please check your .env.local file and ensure EMAIL_API_KEY is set.');
    return;
  }

  try {
    initializeEmailService(emailConfig);
    console.log('✅ Email service initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize email service:', error);
  }
}

// Calculate estimated price based on booking data
function calculateEstimatedPrice(bookingData: BookingFormData): { price: number; currency: string } {
  // Base prices (in euros)
  const basePrices = {
    'one-way': 80,
    'return': 150,
  };

  // Additional costs
  const passengerCost = 15; // per additional passenger
  const luggageCost = 5; // per piece of luggage
  const skiCost = 10; // per ski/snowboard

  let basePrice = basePrices[bookingData.journey?.type || 'one-way'] || 80;
  
  // Add passenger costs (first passenger included in base price)
  const totalPassengers = (bookingData.people?.adults || 0) + (bookingData.people?.children || 0);
  if (totalPassengers > 1) {
    basePrice += (totalPassengers - 1) * passengerCost;
  }

  // Add luggage costs
  const totalLuggage = 
    (bookingData.luggage?.suitcases || 0) +
    (bookingData.luggage?.skis || 0) +
    (bookingData.luggage?.snowboards || 0) +
    (bookingData.luggage?.prams || 0);
  
  basePrice += totalLuggage * luggageCost;

  // Add ski/snowboard costs
  const totalSkis = (bookingData.luggage?.skis || 0) + (bookingData.luggage?.snowboards || 0);
  basePrice += totalSkis * skiCost;

  return {
    price: basePrice,
    currency: '€',
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const bookingData: BookingFormData = await request.json();

    // Validate required fields
    if (!bookingData.passenger?.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!bookingData.journey?.collectionPoint || !bookingData.journey?.destinationPoint) {
      return NextResponse.json(
        { error: 'Collection and destination points are required' },
        { status: 400 }
      );
    }

    // Generate unique quote ID
    const quoteId = generateQuoteId();

    // Calculate estimated price
    const { price: estimatedPrice, currency } = calculateEstimatedPrice(bookingData);

    // Initialize email service
    initializeEmailServiceFromEnv();

    // Prepare email data
    const emailData = {
      bookingData,
      quoteId,
      estimatedPrice,
      currency,
    };

    // Send emails
    let emailSent = false;
    let errorMessage = '';

    try {
      console.log('📧 Attempting to send emails directly via Resend...');
      console.log('📧 SANDBOX MODE: Overriding recipient to', process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com');
      
      // Send quote email directly via Resend (bypassing email service)
      const quoteEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${process.env.EMAIL_FROM_NAME || 'AET Ski Transfer'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
          // TESTING MODE: Override recipient to your verified email
          // In production, this would be: to: [emailData.bookingData.passenger?.email || ''],
          to: [process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com'],
          subject: `AET Quote request - ${emailData.quoteId}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>AET Quote request</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #4F5B62; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .quote-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
                .section { margin-bottom: 20px; }
                .section:last-child { margin-bottom: 0; }
                .section h3 { margin: 0 0 12px 0; color: #4F5B62; font-size: 18px; }
                .section p { margin: 0 0 8px 0; }
                .section p:last-child { margin-bottom: 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>AET Quote request</h1>
                  <p>Transfer quote information</p>
                </div>
                
                <div class="content">
                 
                  <h2>Quote Details</h2>
                  <p><strong>Quote ID:</strong> ${emailData.quoteId}</p>
                  
                  <div class="quote-details">
                    <div class="section">
                      <h3>Journey Details</h3>
                      <p><strong>Type:</strong> ${emailData.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}</p>
                      <p><strong>From:</strong> ${emailData.bookingData.journey?.collectionPoint}</p>
                      <p><strong>To:</strong> ${emailData.bookingData.journey?.destinationPoint}</p>
                    </div>
                    
                    <div class="section">
                      <h3>Travel Details</h3>
                      <p><strong>Date:</strong> ${emailData.bookingData.dates?.collectionDate ? new Date(emailData.bookingData.dates.collectionDate).toLocaleDateString() : 'Flexible'}</p>
                      <p><strong>Time:</strong> ${emailData.bookingData.dates?.collectionTime || 'Flexible'}</p>
                    </div>
                    
                    <div class="section">
                      <h3>Passengers</h3>
                      <p><strong>Adults:</strong> ${emailData.bookingData.people?.adults || 0}</p>
                      <p><strong>Children:</strong> ${emailData.bookingData.people?.children || 0}</p>
                    </div>
                    
                    <div class="section">
                      <h3>Luggage</h3>
                      <p><strong>Skis:</strong> ${emailData.bookingData.luggage?.skis || 0}</p>
                      <p><strong>Snowboards:</strong> ${emailData.bookingData.luggage?.snowboards || 0}</p>
                      <p><strong>Suitcases:</strong> ${emailData.bookingData.luggage?.suitcases || 0}</p>
                      <p><strong>Prams:</strong> ${emailData.bookingData.luggage?.prams || 0}</p>
                    </div>

                    <div class="section">
                      <h3>Client Information</h3>
                      <p><strong>Name:</strong> ${emailData.bookingData.passenger?.name || 'Not provided'}</p>
                      <p><strong>Email:</strong> ${emailData.bookingData.passenger?.email || 'Not provided'}</p>
                      <p><strong>Special Requests:</strong> ${emailData.bookingData.passenger?.specialRequests || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <p>Please review this request and provide a detailed quote to the client.</p>
                </div>
                
                <div class="footer">
                  <p>AET Ski Transfer<br>
                  More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
AET Quote request - ${emailData.quoteId}

CLIENT INFORMATION:
Name: ${emailData.bookingData.passenger?.name || 'Not provided'}
Email: ${emailData.bookingData.passenger?.email || 'Not provided'}

BOOKING DETAILS:

JOURNEY DETAILS:
Type: ${emailData.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}
From: ${emailData.bookingData.journey?.collectionPoint}
To: ${emailData.bookingData.journey?.destinationPoint}

TRAVEL DETAILS:
Date: ${emailData.bookingData.dates?.collectionDate ? new Date(emailData.bookingData.dates.collectionDate).toLocaleDateString() : 'Flexible'}
Time: ${emailData.bookingData.dates?.collectionTime || 'Flexible'}

PASSENGERS:
Adults: ${emailData.bookingData.people?.adults || 0}
Children: ${emailData.bookingData.people?.children || 0}

LUGGAGE:
Skis: ${emailData.bookingData.luggage?.skis || 0}
Snowboards: ${emailData.bookingData.luggage?.snowboards || 0}
Suitcases: ${emailData.bookingData.luggage?.suitcases || 0}
Prams: ${emailData.bookingData.luggage?.prams || 0}

Quote ID: ${emailData.quoteId}

Please review this request and provide a detailed quote to the client.

---
AET Ski Transfer
More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
          `,
          reply_to: process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com',
        }),
      });

      if (!quoteEmailResponse.ok) {
        const errorData = await quoteEmailResponse.json();
        throw new Error(`Quote email failed: ${quoteEmailResponse.status} ${quoteEmailResponse.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log('✅ Quote email sent successfully');

      // Send confirmation email
      const confirmationEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${process.env.EMAIL_FROM_NAME || 'AET Ski Transfer'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
          // TESTING MODE: Override recipient to your verified email
          // In production, this would be: to: [emailData.bookingData.passenger?.email || ''],
          to: [process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com'],
          subject: `Writing your quote ${emailData.bookingData.passenger?.name || ''} - AET Ski Transfer`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Writing your quote - AET Ski Transfer</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #4F5B62; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .confirmation { margin: 20px 0; }
                .confirmation h2 { margin: 0 0 16px 0; color: #4F5B62; }
                .confirmation p { margin: 0 0 16px 0; }
                .content p { margin: 0 0 16px 0; }
                .content ul { margin: 0 0 16px 0; padding-left: 20px; }
                .content li { margin: 0 0 8px 0; }
                .content li:last-child { margin-bottom: 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Writing your quote</h1>
                  <p>AET Ski Transfer</p>
                </div>
                
                <div class="content">
                  <div class="confirmation">
                    <h2>Hello ${emailData.bookingData.passenger?.name || 'there'}, your quote information has been received!</h2>
                    <p>Thank you for choosing AET Ski Transfer. We've received your booking request and will process it shortly.</p>
                  </div>
                  
                  <p><strong>Booking ID:</strong> ${emailData.quoteId}</p>
                  
                  <p>We'll send you a detailed quote within 24 hours with:</p>
                  <ul>
                    <li>Final pricing</li>
                    <li>Driver details</li>
                    <li>Meeting point instructions</li>
                    <li>Payment information</li>
                  </ul>
                  
                  <p>If you have any urgent questions, please contact us immediately.</p>
                  
                  <p>Best regards,<br>The AET Team</p>
                </div>
                
                <div class="footer">
                  <p>AET Ski Transfer<br>
                  More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
Writing your quote - AET Ski Transfer

Hello ${emailData.bookingData.passenger?.name || 'there'}, your quote information has been received!

Thank you for choosing AET Ski Transfer. We've received your booking request and will process it shortly.

Booking ID: ${emailData.quoteId}

We'll send you a detailed quote within 24 hours with:
- Final pricing
- Driver details
- Meeting point instructions
- Payment information

If you have any urgent questions, please contact us immediately.

Best regards,
The AET Team

---
AET Ski Transfer
More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
          `,
          reply_to: process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com',
        }),
      });

      if (!confirmationEmailResponse.ok) {
        const errorData = await confirmationEmailResponse.json();
        throw new Error(`Confirmation email failed: ${confirmationEmailResponse.status} ${confirmationEmailResponse.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log('✅ Confirmation email sent successfully');
      emailSent = true;

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      
      if (emailError instanceof Error && emailError.message.includes('403')) {
        errorMessage = 'Resend API: 403 Forbidden - Check domain verification and sending permissions';
        console.error('🔍 403 Error Details:');
        console.error('  - Domain may not be verified');
        console.error('  - Sending limits may be exceeded');
        console.error('  - Account may need activation');
      } else {
        errorMessage = emailError instanceof Error ? emailError.message : 'Email service failed';
      }
    }

    // Store booking data (you can integrate with your database here)
    const bookingRecord = {
      id: quoteId,
      ...bookingData,
      estimatedPrice,
      currency,
      createdAt: new Date().toISOString(),
      emailSent,
      status: 'pending',
    };

    // Log booking for debugging (remove in production)
    console.log('Booking received:', bookingRecord);

    // Return success response
    return NextResponse.json({
      success: true,
      quoteId,
      estimatedPrice,
      currency,
      emailSent,
      message: emailSent 
        ? 'Booking submitted successfully. Check your email for confirmation.'
        : 'Booking submitted successfully. We will contact you shortly.',
    });

  } catch (error) {
    console.error('Booking API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process booking. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AET Booking API',
    timestamp: new Date().toISOString(),
  });
} 