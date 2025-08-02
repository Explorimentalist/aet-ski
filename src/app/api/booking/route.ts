// src/app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { BookingFormData } from '@/types';
import { initializeEmailService, getEmailService, EmailConfig } from '@/lib/email';
import { generateQuoteId } from '@/lib/utils';

// Initialize email service with environment variables
function initializeEmailServiceFromEnv(): void {
  const emailConfig: EmailConfig = {
    provider: (process.env.EMAIL_PROVIDER as any) || 'resend',
    apiKey: process.env.EMAIL_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || 'bookings@aet.ski',
    fromName: process.env.EMAIL_FROM_NAME || 'AET Ski Transfer',
    replyTo: process.env.EMAIL_REPLY_TO || 'info@aet.ski',
  };

  if (!emailConfig.apiKey) {
    console.warn('Email API key not configured. Emails will not be sent.');
    return;
  }

  try {
    initializeEmailService(emailConfig);
    console.log('Email service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize email service:', error);
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
      const emailService = getEmailService();
      
      // Send quote email to customer
      const quoteEmailSent = await emailService.sendQuoteEmail(emailData);
      
      // Send confirmation email to customer
      const confirmationEmailSent = await emailService.sendConfirmationEmail(emailData);

      emailSent = quoteEmailSent && confirmationEmailSent;

      if (!emailSent) {
        errorMessage = 'Failed to send emails';
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      errorMessage = 'Email service not configured or failed';
      
      // Send error notification if email service is available
      try {
        const emailService = getEmailService();
        await emailService.sendErrorNotification(
          errorMessage,
          bookingData
        );
      } catch (notificationError) {
        console.error('Failed to send error notification:', notificationError);
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