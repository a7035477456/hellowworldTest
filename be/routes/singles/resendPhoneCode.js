import pool from '../../db/connection.js';

const LOG_PREFIX = '[resendPhoneCode]';

export async function resendPhoneCode(req, res) {
  try {
    const { email, phone } = req.body;
    const emailNorm = String(email ?? '').trim().toLowerCase();

    if (!emailNorm) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const phoneDigits = String(phone ?? '').replace(/\D/g, '');
    if (phoneDigits && phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits if provided.' });
    }

    const formattedPhoneFromBody = phoneDigits.length === 10 ? `+1${phoneDigits}` : null;

    let sessionRow_AAAAA = await pool.query(
      `SELECT id, phone
       FROM public.verifications
       WHERE email = $1
         AND kind = 'phone_verify_session'
         AND used_at IS NULL
         AND expires_at > now()
         ${formattedPhoneFromBody ? 'AND phone = $2' : ''}
       ORDER BY created_at DESC
       LIMIT 1`,
      formattedPhoneFromBody ? [emailNorm, formattedPhoneFromBody] : [emailNorm]
    );

    // Backward compatibility: if no row in unified table, fall back to legacy table
    if (!sessionRow_AAAAA.rows[0]) {
      sessionRow_AAAAA = await pool.query(
        `SELECT id, phone
         FROM public.pending_phone_verifications
         WHERE email = $1
           AND used_at IS NULL
           AND expires_at > now()
           ${formattedPhoneFromBody ? 'AND phone = $2' : ''}
         ORDER BY created_at DESC
         LIMIT 1`,
        formattedPhoneFromBody ? [emailNorm, formattedPhoneFromBody] : [emailNorm]
      );
    }

    if (!sessionRow_AAAAA.rows[0]) {
      return res.status(400).json({
        error: 'Verification session not found. Please start the verification process again.'
      });
    }

    const formattedPhone = sessionRow_AAAAA.rows[0].phone;

    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;
    if (!twilioAccountSid || !twilioAuthToken || !twilioServiceSid) {
      return res.status(500).json({
        error: 'SMS service not configured',
        details: 'Please configure Twilio Verify in your .env file'
      });
    }

    const twilio = (await import('twilio')).default;
    const client = twilio(twilioAccountSid, twilioAuthToken);
    await client.verify.v2.services(twilioServiceSid).verifications.create({
      to: formattedPhone,
      channel: 'sms'
    });

    console.log(LOG_PREFIX, 'resend SMS sent', { to: formattedPhone });
    return res.json({ success: true, message: 'Verification code sent to your phone.' });
  } catch (err) {
    console.error(LOG_PREFIX, err.message || err);
    return res.status(500).json({
      error: 'Failed to resend verification code',
      details: err.message || 'Please try again.'
    });
  }
}
