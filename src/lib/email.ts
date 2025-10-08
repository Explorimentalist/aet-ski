// src/lib/email.ts
import { BookingFormData } from '@/types';
import { findOptionByValue, locations } from '@/data/locations';

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
  generateQuoteEmailHTML(data: EmailTemplateData): string;
  generateQuoteEmailText(data: EmailTemplateData): string;
  generateConfirmationEmailHTML(data: EmailTemplateData): string;
  generateConfirmationEmailText(data: EmailTemplateData): string;
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
          bcc: ['brianoko@gmail.com'],
          subject: this.generateQuoteSubject(data),
          html: this.generateQuoteEmailHTML(data),
          text: this.generateQuoteEmailText(data),
          reply_to: data.bookingData.passenger?.email || this.config.replyTo,
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
          reply_to: data.bookingData.passenger?.email || this.config.replyTo,
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

  private generateQuoteSubject(data: EmailTemplateData): string {
    const { bookingData } = data;
    const passenger = bookingData.passenger;
    const journey = bookingData.journey;
    const people = bookingData.people;
    const dates = bookingData.dates;

    // Extract surname and first name
    const fullName = passenger?.name || 'Unknown';
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const surname = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const formattedName = surname && firstName ? `${surname}, ${firstName}` : fullName;

    // Get passenger counts
    const adults = people?.adults || 0;
    const children = people?.children || 0;

    // Get locations with human-readable labels
    const collectionPointLabel = journey?.collectionPoint 
      ? (findOptionByValue(locations, journey.collectionPoint)?.label || journey.collectionPoint)
      : 'Unknown';
    const destinationPointLabel = journey?.destinationPoint 
      ? (findOptionByValue(locations, journey.destinationPoint)?.label || journey.destinationPoint)
      : 'Unknown';

    // Format dates
    const formatDate = (date: Date | null | undefined): string => {
      if (!date) return 'TBD';
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear().toString().slice(-2);
      const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
      return `${weekday} ${day}/${month}/${year}`;
    };

    const collectionDate = formatDate(dates?.collectionDate);

    if (journey?.type === 'return') {
      const returnDate = formatDate(dates?.returnDate);
      return `R-D - ${formattedName} - Adults: ${adults} - Child: ${children} - ${collectionPointLabel} - ${destinationPointLabel} - ${collectionDate} - ${returnDate}`;
    } else {
      return `R-S - ${formattedName} - Adults: ${adults} - Child: ${children} - ${collectionPointLabel} - ${destinationPointLabel} - ${collectionDate}`;
    }
  }

  generateQuoteEmailHTML(data: EmailTemplateData): string {
    const specialRequests = data.bookingData.passenger?.specialRequests?.trim() || '';
    const extraItems = (data.bookingData.luggage?.extraItems || [])
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your AET Ski Transfer Quote</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1D4747; color: white; padding: 15px 30px; text-align: center; }
          .header h1 { margin: 0 0 6px; font-size: 24px; }
          .header p { margin: 0; font-size: 16px; }
          .content { padding: 24px; background: #f9f9f9; }
          .quote-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .details-table { width: 100%; border-collapse: collapse; }
          .column { width: 50%; vertical-align: top; padding: 0 10px; }
          .column h3 { margin-top: 0; margin-bottom: 10px; color: #1D4747; }
          .column p { margin: 6px 0; }
          .column-left { border-right: 1px solid #e0e0e0; }
          .column-right { padding-left: 20px; }
          .footer { text-align: center; padding: 16px 20px; }
          .logo { display: inline-block; }
          .logo svg { width: 140px; height: auto; }
          @media only screen and (max-width: 480px) {
            .details-table, .details-table tbody, .details-table tr, .details-table td { display: block; width: 100%; }
            .column { border-right: none; padding: 0; }
            .column-right { padding-top: 20px; }
          }
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
            
            <div class="quote-details">
              <table class="details-table" role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="column column-left">
                    <h3>Journey Details</h3>
                    <p><strong>Type:</strong> ${data.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}</p>
                    <p><strong>From:</strong> ${data.bookingData.journey?.collectionPoint}</p>
                    <p><strong>To:</strong> ${data.bookingData.journey?.destinationPoint}</p>

                    <h3>Travel Details</h3>
                    <p><strong>Date:</strong> ${data.bookingData.dates?.collectionDate ? new Date(data.bookingData.dates.collectionDate).toLocaleDateString('en-GB') : 'Flexible'}</p>
                    <p><strong>Time:</strong> ${data.bookingData.dates?.collectionTime || 'Flexible'}</p>

                    <h3>Luggage</h3>
                    <p><strong>Pairs of skis:</strong> ${data.bookingData.luggage?.skis || 0}</p>
                    <p><strong>Snowboards:</strong> ${data.bookingData.luggage?.snowboards || 0}</p>
                    <p><strong>Suitcases:</strong> ${data.bookingData.luggage?.suitcases || 0}</p>
                    <p><strong>Prams:</strong> ${data.bookingData.luggage?.prams || 0}</p>
                    ${extraItems.length ? `<p><strong>Extra items:</strong> ${extraItems.join(', ')}</p>` : ''}
                  </td>
                  <td class="column column-right">
                    <h3>Client Information</h3>
                    <p><strong>Name:</strong> ${data.bookingData.passenger?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${data.bookingData.passenger?.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> ${data.bookingData.passenger?.phone || 'N/A'}</p>
                    ${specialRequests ? `<p><strong>Special requests:</strong> ${specialRequests}</p>` : ''}

                    <h3>Passengers</h3>
                    <p><strong>Adults:</strong> ${data.bookingData.people?.adults || 0}</p>
                    <p><strong>Children:</strong> ${data.bookingData.people?.children || 0}</p>
                  </td>
                </tr>
              </table>
            </div>
            
            <p>Please review this request and provide a detailed quote to the client.</p>
          </div>
          
          <div class="footer">
            <div class="logo" role="img" aria-label="AET Ski Transfer">
              <img src="https://res.cloudinary.com/dzrn3khsd/image/upload/v1757529485/AET_logo_golden_somvxv.svg" alt="AET Ski Transfer" width="140" height="35" style="display: block; margin: 0 auto; background-color: #2C4F6D; padding: 10px;" />
            </div>
            <p>Airport transfers to Les Trois Vallées</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateQuoteEmailText(data: EmailTemplateData): string {
    return `
AET Ski Transfer - Your Transfer Quote

Hello ${data.bookingData.passenger?.name || 'there'}!

Thank you for requesting a quote for your ski transfer. Here are your booking details:

JOURNEY DETAILS:
Type: ${data.bookingData.journey?.type === 'return' ? 'Return' : 'One Way'}
From: ${data.bookingData.journey?.collectionPoint}
To: ${data.bookingData.journey?.destinationPoint}

TRAVEL DETAILS:
Date: ${data.bookingData.dates?.collectionDate ? new Date(data.bookingData.dates.collectionDate).toLocaleDateString('en-GB') : 'Flexible'}
Time: ${data.bookingData.dates?.collectionTime || 'Flexible'}

PASSENGERS:
Adults: ${data.bookingData.people?.adults || 0}
Children: ${data.bookingData.people?.children || 0}

LUGGAGE:
Pairs of skis: ${data.bookingData.luggage?.skis || 0}
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

  generateConfirmationEmailHTML(data: EmailTemplateData): string {
    const passengerName = data.bookingData.passenger?.name || 'there';
    
    return `
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
              <h2>Hello ${passengerName}, your quote information has been received!</h2>
              <p>Thank you for choosing AET Ski Transfer. We've received your booking request and will process it shortly.</p>
            </div>
            
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

  generateConfirmationEmailText(data: EmailTemplateData): string {
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
