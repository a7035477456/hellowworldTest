import { createPasswordTokens, pendingVerifications } from './store.js';

const LOG_PREFIX = '[createPassword]';

export async function createPassword(req, res) {
  try {
    const { token, email, password, phone } = req.body;
    console.log(LOG_PREFIX, 'called', { email: email ? `${email.slice(0, 3)}***` : null, hasToken: !!token, hasPhone: !!phone });

    if (!token || !email || !password || !phone) {
      console.log(LOG_PREFIX, 'reject: missing body', { hasToken: !!token, hasEmail: !!email, hasPassword: !!password, hasPhone: !!phone });
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }

    const stored = createPasswordTokens.get(token);
    if (!stored) {
      const storeSize = createPasswordTokens.size;
      const tokenPrefix = typeof token === 'string' && token.length >= 6 ? token.slice(0, 6) : '(short or not string)';
      console.warn(LOG_PREFIX, 'TOKEN_NOT_FOUND (not link stale – token missing from server memory)', {
        tokenLength: typeof token === 'string' ? token.length : 0,
        tokenPrefix,
        storeSize,
        hint: 'If user just received the email, server may have restarted (in-memory store cleared) or request hit a different instance.'
      });
      return res.status(400).json({
        error: 'This link is invalid or has already been used. Please request a new registration email.',
        reason: 'TOKEN_NOT_FOUND'
      });
    }
    console.log(LOG_PREFIX, 'token found', { emailStored: stored.email ? `${stored.email.slice(0, 3)}***` : null, expiresAt: stored.expiresAt });
    if (stored.email.toLowerCase() !== email.toLowerCase()) {
      console.log(LOG_PREFIX, 'reject: email mismatch', { storedEmailPrefix: stored.email?.slice(0, 3), requestEmailPrefix: email?.slice(0, 3) });
      return res.status(400).json({ error: 'Invalid link. Please use the link from your registration email.' });
    }
    if (Date.now() > stored.expiresAt) {
      createPasswordTokens.delete(token);
      console.log(LOG_PREFIX, 'reject: token expired', { expiresAt: stored.expiresAt, now: Date.now() });
      return res.status(400).json({ error: 'This link has expired. Please request a new registration email.' });
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      console.log(LOG_PREFIX, 'reject: phone not 10 digits', { digits: phoneDigits.length });
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;


    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioServiceSid = process.env.TWILIO_ServiceSID;

    const twilioEnvKeys = Object.keys(process.env).filter((k) => k.startsWith('TWILIO_'));

    console.log(LOG_PREFIX, 'Twilio env', {
      TWILIO_ACCOUNT_SID: twilioAccountSid ? `set (len ${twilioAccountSid.length})` : 'MISSING',
      TWILIO_AUTH_TOKEN: twilioAuthToken ? `set (len ${twilioAuthToken.length})` : 'MISSING',
      TWILIO_ServiceSID: twilioServiceSid ? `set (len ${twilioServiceSid.length})` : 'MISSING',
      allTwilioKeys: twilioEnvKeys
    });

    const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioServiceSid;

    if (!isTwilioConfigured) {
      const missing = [
        !twilioAccountSid && 'TWILIO_ACCOUNT_SID',
        !twilioAuthToken && 'TWILIO_AUTH_TOKEN',
        !twilioServiceSid && 'TWILIO_ServiceSID'
      ].filter(Boolean);
      console.error(LOG_PREFIX, 'Twilio Verify not configured. Missing:', missing.join(', '));
      return res.status(500).json({
        error: 'SMS service not configured (v3)',
        details: 'Please configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_ServiceSID in your .env file'
      });
    }

    console.log(LOG_PREFIX, 'token valid, sending SMS', { to: formattedPhone });
    try {
      console.log(LOG_PREFIX, 'Calling Twilio Verify', { to: formattedPhone, serviceSidPrefix: twilioServiceSid.slice(0, 6) + '...' });
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      await client.verify.v2.services(twilioServiceSid).verifications.create({
        to: formattedPhone,
        channel: 'sms'
      });

      console.log(LOG_PREFIX, 'Twilio Verify SMS sent', { to: formattedPhone });

      const emailNorm = String(email).trim().toLowerCase();
      const key = `${emailNorm}_${formattedPhone}`;
      pendingVerifications.set(key, { password, email: emailNorm, phone: formattedPhone });
      createPasswordTokens.delete(token);

      res.json({ success: true, message: 'Verification code sent to your phone' });
    } catch (error) {
      console.error(LOG_PREFIX, 'Twilio error (link was valid; failure is SMS/config)', {
        code: error.code,
        message: error.message,
        status: error.status,
        moreInfo: error.moreInfo,
        stack: error.stack
      });
      return res.status(500).json({
        error: 'Failed to send verification SMS',
        details: error.message || 'Please check Twilio configuration.'
      });
    }
  } catch (error) {
    console.error(LOG_PREFIX, 'unexpected error (not link stale)', { message: error.message, stack: error.stack });
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process password creation' });
    }
  }
}
