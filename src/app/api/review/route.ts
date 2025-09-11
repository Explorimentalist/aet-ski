// src/app/api/review/route.ts
import { NextRequest, NextResponse } from 'next/server';

function initializeEmailServiceFromEnv(): void {
  const apiKey = process.env.EMAIL_API_KEY || '';
  if (!apiKey) {
    console.warn('Email API key not configured. Review emails will not be sent.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rating, comment, name, bookingName } = await request.json();

    // Validate
    const errors: string[] = [];
    if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required');
    const r = Number(rating);
    if (!r || isNaN(r) || r < 1 || r > 5) errors.push('Rating must be between 1 and 5');
    if (!comment || typeof comment !== 'string' || comment.trim().length < 10) errors.push('Comment must be at least 10 characters');

    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors.join('. ') }, { status: 400 });
    }

    initializeEmailServiceFromEnv();

    const apiKey = process.env.EMAIL_API_KEY || '';
    const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    const fromName = process.env.EMAIL_FROM_NAME || 'AET Ski Transfer';

    let emailSent = false;

    try {
      if (!apiKey) throw new Error('Missing EMAIL_API_KEY');

      const toRecipients = ['feedback@aet.ski', 'brianoko@gmail.com'];
      const subject = `New AET Review (${r}★) from ${name}`;

      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Review</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1D4747; color: white; padding: 24px; text-align: center; }
            .content { padding: 24px; background: #f9f9f9; }
            .box { background: #fff; border-left: 4px solid #1D4747; padding: 16px; border-radius: 8px; }
            .meta { color: #666; font-size: 14px; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Website Review</h1>
              <p>${new Date().toLocaleString()}</p>
            </div>
            <div class="content">
              <div class="box">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Rating:</strong> ${'★'.repeat(r)}${'☆'.repeat(5 - r)} (${r}/5)</p>
                ${bookingName ? `<p class="meta"><strong>Lead passenger booking name:</strong> ${bookingName}</p>` : ''}
                <p><strong>Comment:</strong></p>
                <p>${String(comment).replace(/\n/g, '<br>')}</p>
              </div>
              <p class="meta">This review was submitted via the AET website review form.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const text = `New Website Review\n\nName: ${name}\nRating: ${r}/5\n${bookingName ? `Lead passenger booking name: ${bookingName}\n` : ''}\nComment:\n${comment}\n`;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${fromName} <${fromEmail}>`,
          to: toRecipients,
          subject,
          html,
          text,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(`Resend error ${res.status}: ${res.statusText} ${JSON.stringify(data)}`);
      }

      emailSent = true;
    } catch (e: unknown) {
      console.error('Failed to send review email:', e);
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent ? 'Review submitted successfully.' : 'Review saved. Email not sent.'
    });
  } catch (error) {
    console.error('Review API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'AET Review API',
    timestamp: new Date().toISOString(),
  });
}

