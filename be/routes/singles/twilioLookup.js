/**
 * Twilio Lookup V2 – Line Type Intelligence
 * Used to block "bad" phone types: Google Voice (non-fixed VoIP), landline, toll-free, premium.
 * Only mobile numbers are accepted for SMS verification.
 *
 * @see https://www.twilio.com/docs/lookup/v2-api
 */

const BLOCKED_LINE_TYPES = new Set([
  'voip',           // non-fixed VoIP (Google Voice, Skype, Burner apps)
  'nonfixedvoip',   // alternate naming
  'landline',       // cannot receive SMS reliably
  'tollfree',       // 1-800 etc., not personal
  'premium',        // high-rate / SMS pumping risk
  'sharedcost',     // shared-cost numbers
]);

const ALLOWED_LINE_TYPE = 'mobile';

/**
 * Validate that the phone number is a mobile line (not VoIP, landline, etc.).
 * Uses Twilio Lookup V2 with line_type_intelligence.
 *
 * @param {import('twilio').Twilio} twilioClient - Twilio client (from twilio(accountSid, authToken))
 * @param {string} e164Phone - Phone in E.164 e.g. +15551234567
 * @returns {Promise<{ ok: true } | { ok: false, error: string, type?: string, carrierName?: string }>}
 */
export async function validatePhoneLineType(twilioClient, e164Phone) {
  try {
    const lookup = await twilioClient.lookups.v2
      .phoneNumbers(e164Phone)
      .fetch({ fields: 'line_type_intelligence' });

    const info = lookup.lineTypeIntelligence;
    if (!info) {
      return {
        ok: false,
        error: 'We could not verify this phone number. Please use a mobile number that can receive SMS.',
      };
    }

    const type = (info.type || '').toLowerCase();
    const carrierName = info.carrierName || '';

    if (BLOCKED_LINE_TYPES.has(type)) {
      const friendly =
        type === 'voip' || type === 'nonfixedvoip'
          ? 'Virtual numbers (e.g. Google Voice) are not allowed. Please use a mobile number that can receive SMS.'
          : type === 'landline'
            ? 'Landline numbers cannot receive SMS. Please use a mobile number.'
            : 'This phone type is not accepted. Please use a mobile number that can receive SMS.';
      return {
        ok: false,
        error: friendly,
        type: info.type,
        carrierName,
      };
    }

    if (type !== ALLOWED_LINE_TYPE) {
      return {
        ok: false,
        error: 'Please use a mobile phone number that can receive SMS.',
        type: info.type,
        carrierName,
      };
    }

    return { ok: true };
  } catch (err) {
    console.error('[twilioLookup] Lookup failed:', err.message);
    return {
      ok: false,
      error: 'We could not verify this phone number. Please try again or use a different mobile number.',
    };
  }
}
