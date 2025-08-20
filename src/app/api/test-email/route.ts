// src/app/api/test-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { toEmail } = await request.json();
    
    if (!toEmail) {
      return NextResponse.json(
        { error: 'toEmail is required' },
        { status: 400 }
      );
    }

    console.log('🧪 Testing Resend email service...');
    console.log('📧 Sending test email to:', toEmail);
    console.log('🔑 API Key exists:', !!process.env.EMAIL_API_KEY);
    console.log('🔑 API Key length:', process.env.EMAIL_API_KEY?.length || 0);
    console.log('📤 From email:', process.env.EMAIL_FROM);
    console.log('📤 From name:', process.env.EMAIL_FROM_NAME);

    // Test Resend API directly
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${process.env.EMAIL_FROM_NAME || 'AET Ski Transfer'} <${process.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
        to: [toEmail],
        subject: 'Test Email from AET Ski Transfer',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Test Email</title>
          </head>
          <body>
            <h1>Test Email</h1>
            <p>This is a test email from your AET Ski Transfer website.</p>
            <p>If you receive this, your Resend setup is working correctly!</p>
            <p>Sent at: ${new Date().toISOString()}</p>
          </body>
          </html>
        `,
        text: `
Test Email from AET Ski Transfer

This is a test email from your AET Ski Transfer website.

If you receive this, your Resend setup is working correctly!

Sent at: ${new Date().toISOString()}
        `,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Test email sent successfully:', result);
      
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        emailId: result.id,
      });
    } else {
      const errorData = await response.json();
      console.error('❌ Test email failed:', response.status, errorData);
      
      return NextResponse.json({
        success: false,
        error: `Resend API error: ${response.status} ${response.statusText}`,
        details: errorData,
      }, { status: response.status });
    }

  } catch (error) {
    console.error('❌ Test email error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AET Test Email API',
    timestamp: new Date().toISOString(),
    resendConfigured: !!process.env.EMAIL_API_KEY,
  });
}

