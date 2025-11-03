// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData } from '@/types';
import { initializeEmailService, EmailConfig, createEmailService } from '@/lib/email';
import { generateQuoteId, buildQuoteSubject } from '@/lib/utils';

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
    fromName: process.env.EMAIL_FROM_NAME || 'AET French Alps Transfers',
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

    // Add additional email validation
    if (!bookingData.passenger.email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    try {
      console.log('📧 Attempting to send emails using email service...');
      console.log('📧 Quote email recipient (admin):', process.env.EMAIL_HQ_TO || 'hq@aet.ski');
      console.log('📧 Customer email:', emailData.bookingData.passenger?.email || 'no email provided');
      
      // Create email service instance
      const emailConfig: EmailConfig = {
        provider: 'resend',
        apiKey: process.env.EMAIL_API_KEY || '',
        fromEmail: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        fromName: process.env.EMAIL_FROM_NAME || 'AET French Alps Transfers',
        replyTo: process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com',
      };
      
      const emailService = createEmailService(emailConfig);
      
      // Send quote email to admin/HQ using the new template
      const adminSubject = buildQuoteSubject(emailData.bookingData as BookingFormData);
      const quoteEmailHtml = emailService.generateQuoteEmailHTML(emailData);
      const quoteEmailText = emailService.generateQuoteEmailText(emailData);
      
      const quoteEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${process.env.EMAIL_FROM_NAME || 'AET French Alps Transfers'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
          // Send to HQ for quote processing
          to: [process.env.EMAIL_HQ_TO || 'hq@aet.ski'],
          subject: adminSubject,
          html: quoteEmailHtml,
          text: quoteEmailText,
          reply_to: emailData.bookingData.passenger?.email || 'brianoko@gmail.com',
        }),
      });

      if (!quoteEmailResponse.ok) {
        const errorData = await quoteEmailResponse.json();
        throw new Error(`Quote email failed: ${quoteEmailResponse.status} ${quoteEmailResponse.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log('✅ Quote email sent successfully using new template');
      emailSent = true; // Mark quote email as sent

      // Send confirmation email
      try {
        // Send confirmation email to customer's email (domain is verified)
        const confirmationRecipient = emailData.bookingData.passenger?.email || '';
        
        if (!confirmationRecipient) {
          console.error('❌ No customer email provided for confirmation');
          throw new Error('Customer email is required for confirmation');
        }
        
        console.log('📧 Sending confirmation email to customer:', confirmationRecipient);
        
        // Use email service template for confirmation email
        const confirmationEmailHtml = emailService.generateConfirmationEmailHTML(emailData);
        const confirmationEmailText = emailService.generateConfirmationEmailText(emailData);
        
        const confirmationEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${process.env.EMAIL_FROM_NAME || 'AET French Alps Transfers'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
          // Send to customer's email address (or admin in testing mode)
          to: [confirmationRecipient],
          subject: `Writing your quote ${emailData.bookingData.passenger?.name || ''} - AET French Alps Transfers`,
          html: confirmationEmailHtml,
          text: confirmationEmailText,
          reply_to: emailData.bookingData.passenger?.email || 'brianoko@gmail.com',
        }),
      });

      if (!confirmationEmailResponse.ok) {
        const errorData = await confirmationEmailResponse.json();
        throw new Error(`Confirmation email failed: ${confirmationEmailResponse.status} ${confirmationEmailResponse.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log('✅ Confirmation email sent successfully to customer');

      } catch (confirmationError) {
        console.error('❌ Confirmation email sending error:', confirmationError);
        // Don't fail the entire booking process if confirmation email fails
        // The quote email to admin will still be sent
      }

      // Update the emailSent flag - quote email is most important
      // emailSent remains true if quote email succeeded, even if confirmation fails
      // This ensures the booking process completes successfully

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      
      if (emailError instanceof Error && emailError.message.includes('403')) {
        console.error('🔍 403 Error Details:');
        console.error('  - Domain may not be verified');
        console.error('  - Sending limits may be exceeded');
        console.error('  - Account may need activation');
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
