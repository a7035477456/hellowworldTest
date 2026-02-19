import pool from '../../db/connection.js';

const LOG_PREFIX = '[resendPhoneCode]';

export async function resendPhoneCode(req, res) {
  try {
    const { email, phone } = req.body;
    const emailNorm = String(email ?? '').trim().toLowerCase();
    const phoneDigits = String(phone ?? '').replace(/\D/g, '');
    if (!emailNorm || phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Email and phone number are required.' });
    }
    const formattedPhone = `+1${phoneDigits}`;

    const sessionRow_AAAAA = await pool.query(
      `SELECT id
       FROM public.verifications
       WHERE email = $1
         AND phone = $2
         AND kind = 'phone_verify_session'
         AND used_at IS NULL
         AND expires_at > now()`,
      [emailNorm, formattedPhone]
    );
    if (!sessionRow_AAAAA.rows[0]) {
      return res.status(400).json({
        error: 'Verification session not found. Please start the verification process again.'
      });
    }

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
