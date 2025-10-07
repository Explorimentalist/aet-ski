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
  };

  const emailHtml = emailService.generateQuoteEmailHTML(sampleEmailData);

  return (
    <main style={{ padding: '2rem', minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', color: '#e2e8f0' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Quote Email Preview</h1>
          <p style={{ margin: 0 }}>
            The markup below is rendered using the current email template and a representative booking payload.
          </p>
        </header>
        <section
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
        </section>
      </div>
    </main>
  );
};

export const dynamic = 'force-dynamic';

export default EmailPreviewPage;
