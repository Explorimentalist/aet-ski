// src/lib/email.ts
import { BookingFormData } from '@/types';

// Email service configuration
export interface EmailConfig {
  provider: 'resend' | 'sendgrid' | 'mailgun' | 'emailjs' | 'nodemailer';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
}

// Email template data
export interface EmailTemplateData {
  bookingData: BookingFormData;
  quoteId: string;
  estimatedPrice?: number;
  currency?: string;
}

// Email service interface
export interface EmailService {
  sendQuoteEmail(data: EmailTemplateData): Promise<boolean>;
  sendConfirmationEmail(data: EmailTemplateData): Promise<boolean>;
  sendErrorNotification(error: string, bookingData: BookingFormData): Promise<boolean>;
}

// Resend implementation (recommended)
class ResendEmailService implements EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async sendQuoteEmail(data: EmailTemplateData): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${this.config.fromName} <${this.config.fromEmail}>`,
          to: [data.bookingData.passenger?.email || ''],
          subject: `Your AET Ski Transfer Quote - ${data.quoteId}`,
          html: this.generateQuoteEmailHTML(data),
          text: this.generateQuoteEmailText(data),
          reply_to: this.config.replyTo,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.status} ${response.statusText}`);
      }

      console.log('Quote email sent successfully via Resend');
      return true;
    } catch (error) {
      console.error('Failed to send quote email via Resend:', error);
      return false;
    }
  }

  async sendConfirmationEmail(data: EmailTemplateData): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${this.config.fromName} <${this.config.fromEmail}>`,
          to: [data.bookingData.passenger?.email || ''],
          subject: `Booking Confirmation - AET Ski Transfer`,
          html: this.generateConfirmationEmailHTML(data),
          text: this.generateConfirmationEmailText(data),
          reply_to: this.config.replyTo,
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.status} ${response.statusText}`);
      }

      console.log('Confirmation email sent successfully via Resend');
      return true;
    } catch (error) {
      console.error('Failed to send confirmation email via Resend:', error);
      return false;
    }
  }

  async sendErrorNotification(error: string, bookingData: BookingFormData): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${this.config.fromName} <${this.config.fromEmail}>`,
          to: [this.config.replyTo || this.config.fromEmail],
          subject: `Booking Error - AET Ski Transfer`,
          html: this.generateErrorEmailHTML(error, bookingData),
          text: this.generateErrorEmailText(error, bookingData),
        }),
      });

      if (!response.ok) {
        throw new Error(`Resend API error: ${response.status} ${response.statusText}`);
      }

      console.log('Error notification sent successfully via Resend');
      return true;
    } catch (error) {
      console.error('Failed to send error notification via Resend:', error);
      return false;
    }
  }

  private generateQuoteEmailHTML(data: EmailTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your AET Ski Transfer Quote</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1D4747; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .quote-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .button { display: inline-block; background: #1D4747; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AET Ski Transfer</h1>
            <p>Your Transfer Quote</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.bookingData.passenger?.name || 'there'}!</h2>
            
            <p>Thank you for requesting a quote for your ski transfer. Here are your booking details:</p>
            
            <div class="quote-details">
              <h3>Journey Details</h3>
              <p><strong>Type:</strong> ${data.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}</p>
              <p><strong>From:</strong> ${data.bookingData.journey?.collectionPoint}</p>
              <p><strong>To:</strong> ${data.bookingData.journey?.destinationPoint}</p>
              
              <h3>Travel Details</h3>
              <p><strong>Date:</strong> ${data.bookingData.dates?.collectionDate ? new Date(data.bookingData.dates.collectionDate).toLocaleDateString() : 'Flexible'}</p>
              <p><strong>Time:</strong> ${data.bookingData.dates?.collectionTime || 'Flexible'}</p>
              
              <h3>Passengers</h3>
              <p><strong>Adults:</strong> ${data.bookingData.people?.adults || 0}</p>
              <p><strong>Children:</strong> ${data.bookingData.people?.children || 0}</p>
              
              <h3>Luggage</h3>
              <p><strong>Skis:</strong> ${data.bookingData.luggage?.skis || 0}</p>
              <p><strong>Snowboards:</strong> ${data.bookingData.luggage?.snowboards || 0}</p>
              <p><strong>Suitcases:</strong> ${data.bookingData.luggage?.suitcases || 0}</p>
              <p><strong>Prams:</strong> ${data.bookingData.luggage?.prams || 0}</p>
            </div>
            
            <p><strong>Quote ID:</strong> ${data.quoteId}</p>
            
            ${data.estimatedPrice ? `<p><strong>Estimated Price:</strong> ${data.currency || '€'}${data.estimatedPrice}</p>` : ''}
            
            <p>We'll review your request and send you a detailed quote within 24 hours.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>The AET Team</p>
          </div>
          
          <div class="footer">
            <p>AET Ski Transfer<br>
            More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateQuoteEmailText(data: EmailTemplateData): string {
    return `
AET Ski Transfer - Your Transfer Quote

Hello ${data.bookingData.passenger?.name || 'there'}!

Thank you for requesting a quote for your ski transfer. Here are your booking details:

JOURNEY DETAILS:
Type: ${data.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}
From: ${data.bookingData.journey?.collectionPoint}
To: ${data.bookingData.journey?.destinationPoint}

TRAVEL DETAILS:
Date: ${data.bookingData.dates?.collectionDate ? new Date(data.bookingData.dates.collectionDate).toLocaleDateString() : 'Flexible'}
Time: ${data.bookingData.dates?.collectionTime || 'Flexible'}

PASSENGERS:
Adults: ${data.bookingData.people?.adults || 0}
Children: ${data.bookingData.people?.children || 0}

LUGGAGE:
Skis: ${data.bookingData.luggage?.skis || 0}
Snowboards: ${data.bookingData.luggage?.snowboards || 0}
Suitcases: ${data.bookingData.luggage?.suitcases || 0}
Prams: ${data.bookingData.luggage?.prams || 0}

Quote ID: ${data.quoteId}
${data.estimatedPrice ? `Estimated Price: ${data.currency || '€'}${data.estimatedPrice}` : ''}

We'll review your request and send you a detailed quote within 24 hours.

If you have any questions, please don't hesitate to contact us.

Best regards,
The AET Team

---
AET Ski Transfer
More than 15 years transferring people to Les 3 Vallées, Espace Killy & Paradiski
    `;
  }

  private generateConfirmationEmailHTML(data: EmailTemplateData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - AET Ski Transfer</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1D4747; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .confirmation { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
            <p>AET Ski Transfer</p>
          </div>
          
          <div class="content">
            <div class="confirmation">
              <h2>✅ Your booking has been received!</h2>
              <p>Thank you for choosing AET Ski Transfer. We've received your booking request and will process it shortly.</p>
            </div>
            
            <p><strong>Booking ID:</strong> ${data.quoteId}</p>
            
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
    `;
  }

  private generateConfirmationEmailText(data: EmailTemplateData): string {
    return `
Booking Confirmed! - AET Ski Transfer

✅ Your booking has been received!

Thank you for choosing AET Ski Transfer. We've received your booking request and will process it shortly.

Booking ID: ${data.quoteId}

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
    `;
  }

  private generateErrorEmailHTML(error: string, bookingData: BookingFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Error - AET Ski Transfer</title>
      </head>
      <body>
        <h1>Booking Error Alert</h1>
        <p><strong>Error:</strong> ${error}</p>
        <h2>Booking Data:</h2>
        <pre>${JSON.stringify(bookingData, null, 2)}</pre>
      </body>
      </html>
    `;
  }

  private generateErrorEmailText(error: string, bookingData: BookingFormData): string {
    return `
Booking Error Alert - AET Ski Transfer

Error: ${error}

Booking Data:
${JSON.stringify(bookingData, null, 2)}
    `;
  }
}

// Factory function to create email service
export function createEmailService(config: EmailConfig): EmailService {
  switch (config.provider) {
    case 'resend':
      return new ResendEmailService(config);
    // Add other providers here
    default:
      throw new Error(`Unsupported email provider: ${config.provider}`);
  }
}

// Default email service instance
let emailService: EmailService | null = null;

export function initializeEmailService(config: EmailConfig): void {
  emailService = createEmailService(config);
}

export function getEmailService(): EmailService {
  if (!emailService) {
    throw new Error('Email service not initialized. Call initializeEmailService first.');
  }
  return emailService;
} 