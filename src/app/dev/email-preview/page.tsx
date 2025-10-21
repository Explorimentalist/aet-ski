import { EmailTemplateData, createEmailService, EmailConfig } from '@/lib/email';

const previewConfig: EmailConfig = {
  provider: 'resend',
  apiKey: 'preview-api-key',
  fromEmail: 'preview@aet.ski',
  fromName: 'AET Ski Preview',
  replyTo: 'hq@aet.ski',
};

const sampleEmailData: EmailTemplateData = {
  bookingData: {
    journey: {
      type: 'return',
      collectionPoint: 'Geneva Airport (GVA)',
      destinationPoint: "Val d'Isère",
    },
    dates: {
      collectionDate: new Date('2025-01-18T09:30:00Z'),
      collectionTime: '09:30',
      returnDate: new Date('2025-01-25T15:00:00Z'),
      returnTime: '15:00',
      isCollectionFlexible: false,
      isReturnFlexible: false,
    },
    people: {
      adults: 2,
      children: 2,
    },
    luggage: {
      skis: 2,
      snowboards: 1,
      suitcases: 4,
      prams: 1,
      extraItems: ['Boot bags', 'Child booster seat'],
    },
    passenger: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+44 1234 567890',
      specialRequests: 'Please include a child seat and notify on arrival.',
    },
  },
  quoteId: 'QUOTE-DEV-12345',
  estimatedPrice: 520,
  currency: '€',
};

const isDevelopment = process.env.NODE_ENV !== 'production';

const EmailPreviewPage = () => {
  if (!isDevelopment) {
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Email Preview Unavailable</h1>
        <p>This route can only be used in development environments.</p>
      </main>
    );
  }

  const emailService = createEmailService(previewConfig) as unknown as {
    generateQuoteEmailHTML: (data: EmailTemplateData) => string;
    generateConfirmationEmailHTML: (data: EmailTemplateData) => string;
  };

  const emailHtml = emailService.generateQuoteEmailHTML(sampleEmailData);
  const confirmationEmailHtml = emailService.generateConfirmationEmailHTML(sampleEmailData);

  // Generate contact form email HTML
  const contactFormHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
      <meta name="supported-color-schemes" content="light dark">
      <title>AET Contact form submission</title>
      <style>
        :root {
          color-scheme: light dark;
        }
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333333;
          background-color: #ffffff;
        }
        @media (prefers-color-scheme: dark) {
          body {
            color: #e2e8f0 !important;
            background-color: #1a1a1a !important;
          }
          .content {
            background: #2a2a2a !important;
          }
          .message-box {
            background: #333333 !important;
            color: #e2e8f0 !important;
            border-left-color: #60a5fa !important;
          }
        }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4F5B62; color: white; padding: 15px 30px; text-align: center; }
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
            <p><strong>Name:</strong> John Smith</p>
            <p><strong>Email:</strong> john.smith@example.com</p>
            <p><strong>Message:</strong></p>
            <p>Hi, I'm interested in booking a transfer from Geneva to Val d'Isère for 4 people. Could you please provide me with pricing and availability for the 15th of January? We'll have 2 pairs of skis and 4 suitcases. Thank you!</p>
          </div>
          
          
          <p>Please respond to the customer at: <a href="mailto:john.smith@example.com">john.smith@example.com</a></p>
        </div>
        
        <div class="footer">
          <div class="logo" role="img" aria-label="AET Ski Transfer">
            <img src="https://res.cloudinary.com/dzrn3khsd/image/upload/c_scale,w_263,h_66,f_png,q_auto/v1757529485/AET_logo_golden_somvxv" alt="AET Ski Transfer" width="263" height="66" style="display: block; margin: 0 auto; background-color: #2C4F6D; padding: 10px; max-width: 263px; height: auto;" />
          </div>
          <p>More than 15 years experience taking people to the French Alps</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <main style={{ padding: '2rem', minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', color: '#e2e8f0' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Email Preview</h1>
          <p style={{ margin: 0 }}>
            The markup below is rendered using the current email templates and representative data.
          </p>
        </header>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0' }}>Quote Email Template</h2>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0' }}>Client Confirmation Email Template</h2>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: confirmationEmailHtml }} />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0' }}>Contact Form Email Template</h2>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: contactFormHtml }} />
          </div>
        </section>
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';

export default EmailPreviewPage;
