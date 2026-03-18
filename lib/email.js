/**
 * Send "booking approved, ready for payment" email to customer.
 * Replace this with your email provider (Resend, SendGrid, etc.) when ready.
 */
export async function sendBookingApprovalEmail({ to, name, paymentUrl, tourTitle }) {
  const subject = 'Your booking is approved – ready for payment';
  const body = `Hi ${name || 'there'},

Your booking request for "${tourTitle || 'your tour'}" has been approved.

Complete your payment here to confirm your reservation:
${paymentUrl}

Thank you for choosing TravelPro.`;
  // eslint-disable-next-line no-console
  console.log('[Email] Booking approval (no provider configured):', { to, subject, paymentUrl });
  return { ok: true };
}
