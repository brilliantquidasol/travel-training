/**
 * Send "booking approved, ready for payment" email to customer.
 * Uses Resend when RESEND_API_KEY is set; otherwise logs only (no error).
 *
 * Setup:
 * 1. Sign up at https://resend.com and get an API key.
 * 2. Add to .env.local: RESEND_API_KEY=re_xxxx
 * 3. Optional: RESEND_FROM="TravelPro <onboarding@resend.dev>" (default; use your domain in production)
 */
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY?.trim?.();
const fromAddress = process.env.RESEND_FROM?.trim?.() || 'TravelPro <onboarding@resend.dev>';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendBookingApprovalEmail({ to, name, paymentUrl, tourTitle }) {
  const subject = 'Your booking is approved – ready for payment';
  const text = `Hi ${name || 'there'},

Your booking request for "${tourTitle || 'your tour'}" has been approved.

Complete your payment here to confirm your reservation:
${paymentUrl}

Thank you for choosing TravelPro.`;

  if (resend) {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject,
      text,
    });
    if (error) {
      console.error('[Email] Resend error:', error);
      return { ok: false, error };
    }
    return { ok: true, id: data?.id };
  }

  // No provider configured – log only so confirm flow still works
  console.log('[Email] Booking approval (RESEND_API_KEY not set):', { to, subject, paymentUrl });
  return { ok: true };
}
