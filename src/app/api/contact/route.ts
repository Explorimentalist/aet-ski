// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeEmailService, getEmailService, EmailConfig } from '@/lib/email';

// Initialize email service with environment variables
function initializeEmailServiceFromEnv(): void {
  const emailConfig: EmailConfig = {
    provider: 'resend',
    apiKey: process.env.EMAIL_API_KEY || '',
    fromEmail: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    fromName: process.env.EMAIL_FROM_NAME || 'AET Ski Transfer',
    replyTo: process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com',
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

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Initialize email service
    initializeEmailServiceFromEnv();

    // Send contact email
    let emailSent = false;
    let errorMessage = '';

    try {
      const emailService = getEmailService();
      
      // Send contact notification email
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${process.env.EMAIL_FROM_NAME || 'AET Ski Transfer'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
          to: [process.env.EMAIL_REPLY_TO || 'brianoko@gmail.com'],
          subject: `AET Contact submission from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>AET Contact form submission</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #4F5B62; color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; background: #f9f9f9; }
                .message-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4F5B62; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>AET Contact form submission</h1>
                  <p>Contact details</p>
                </div>
                
                <div class="content">
              
                  <div class="message-box">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <p>This message was submitted through the AET Ski Transfer website contact form.</p>
                  
                  <p>Please respond to the customer at: <a href="mailto:${email}">${email}</a></p>
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
AET Contact submission from ${name}

Contact Details:
Name: ${name}
Email: ${email}
Message: ${message}

This message was submitted through the AET Ski Transfer website contact form.

Please respond to the customer at: ${email}

---
AET Ski Transfer
More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
          `,
          reply_to: email,
        }),
      });

      if (response.ok) {
        emailSent = true;
        console.log('Contact email sent successfully via Resend');
      } else {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      errorMessage = 'Email service not configured or failed';
    }

    // Store contact data (you can integrate with your database here)
    const contactRecord = {
      id: `contact_${Date.now()}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      emailSent,
      status: emailSent ? 'sent' : 'failed',
    };

    // Log contact for debugging (remove in production)
    console.log('Contact received:', contactRecord);

    // Return success response
    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent 
        ? 'Message sent successfully. We will get back to you soon.'
        : 'Message received. We will contact you shortly.',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process contact form. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AET Contact API',
    timestamp: new Date().toISOString(),
  });
}

