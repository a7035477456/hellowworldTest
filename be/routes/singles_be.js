import pool from '../db/connection.js';
import nodemailer from 'nodemailer';

export const registerUser_FFFFFFFF = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if SMTP is configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const isSmtpConfigured = smtpUser && smtpPass && 
                             smtpUser !== 'your-email@gmail.com' && 
                             smtpPass !== 'your-app-password';

    // Only send email if SMTP is properly configured
    if (isSmtpConfigured) {
      // Create a transporter for sending emails
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      // Email content - include email as query parameter
      const createPasswordLink = `http://localhost:3000/free/pages/createPassword?email=${encodeURIComponent(email)}`;
      const mailOptions = {
        from: smtpUser,
        to: email,
        subject: 'Complete Your Registration - Create Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to VSingles!</h2>
            <p>Thank you for registering. To complete your registration, please create your password by clicking the link below:</p>
            <p style="margin: 20px 0;">
              <a href="${createPasswordLink}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">
                Create Password
              </a>
            </p>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${createPasswordLink}</p>
            <p style="margin-top: 30px; color: #999; font-size: 12px;">
              If you did not register for this account, please ignore this email.
            </p>
          </div>
        `
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
        console.log('Registration email sent to:', email);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        
        // Check for Gmail App Password error
        let errorMessage = emailError.message || 'Please check your SMTP configuration and try again.';
        let errorDetails = '';
        
        if (emailError.code === 'EAUTH' || 
            (emailError.message && emailError.message.includes('Application-specific password required'))) {
          errorDetails = 'Gmail requires an App Password when 2FA is enabled. ' +
            'Go to: Google Account → Security → 2-Step Verification → App passwords. ' +
            'Generate an app password for "Mail" and use it as SMTP_PASS in your .env file.';
        } else if (emailError.message) {
          errorDetails = emailError.message;
        }
        
        // Always fail if email can't be sent - user needs the email to continue
        return res.status(500).json({ 
          error: 'Failed to send registration email',
          details: errorDetails || errorMessage
        });
      }
    } else {
      // SMTP not configured - return error in both development and production
      console.error('SMTP not configured. Cannot send registration email.');
      console.error('Please configure SMTP_USER and SMTP_PASS in your .env file.');
      return res.status(500).json({ 
        error: 'Email service not configured. Cannot send registration email.',
        details: 'Please configure SMTP_USER and SMTP_PASS in your backend .env file. For Gmail, you need to use an App Password.'
      });
    }

    res.json({ 
      success: true, 
      message: 'Registration email sent successfully' 
    });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Failed to process registration' });
  }
};

export const verifyLoginPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // First, get the user by email along with their password (stored as plain text)
    const result = await pool.query(
      `SELECT 
        singles_id, 
        profile_image_url,
        password_hash
      FROM public.singles s 
      WHERE s.email = $1
      ORDER BY s.lastLoginTime DESC
      LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      // User doesn't exist
      return res.status(401).json({ 
        error: 'Login or Password fail'
      });
    }

    const user = result.rows[0];
    
    // Debug logging to see what we're comparing
    console.log('=== LOGIN DEBUG ===');
    console.log('Email provided:', email);
    console.log('Password provided:', password);
    console.log('Password provided length:', password?.length);
    console.log('Password provided charCodes:', password?.split('').map(c => c.charCodeAt(0)));
    console.log('Password from DB:', user.password_hash);
    console.log('Password from DB length:', user.password_hash?.length);
    console.log('Password from DB charCodes:', user.password_hash?.split('').map(c => c.charCodeAt(0)));
    console.log('Password from DB is null/undefined?', user.password_hash == null);
    console.log('Are they equal (before trim)?', password === user.password_hash);
    console.log('Type of provided:', typeof password);
    console.log('Type of DB:', typeof user.password_hash);
    
    // Compare the provided password with the stored plain text password
    // Trim both values to handle any whitespace issues
    const providedPassword = password?.trim() || '';
    const storedPassword = user.password_hash?.trim() || '';
    const isPasswordValid = providedPassword === storedPassword;
    
    console.log('Provided (trimmed):', `"${providedPassword}"`);
    console.log('Stored (trimmed):', `"${storedPassword}"`);
    console.log('Are they equal (after trim)?', isPasswordValid);
    console.log('==================');

    if (!isPasswordValid) {
      // Password is wrong
      return res.status(401).json({ 
        error: 'Login or Password fail'
      });
    }

    // Remove password_hash from response for security
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Error verifying login:', error);
    res.status(500).json({ error: 'Failed to verify login' });
  }
};




export const getAllSingles_BBBBBBBB = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        singles_id, 
        profile_image_url
      FROM public.singles s 
      ORDER BY s.lastLoginTime desc`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getVettedSingles_CCCCCCCC = async (req, res) => {
  try {
    const result = await pool.query(
        `SELECT 
        s.singles_id,
        s.profile_image_url,
        s.vetted_status
      FROM public.singles s
      WHERE (s.vetted_status=true)
      ORDER BY s.lastLoginTime DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

export const getSinglesInterested_DDDDDDD = async (req, res) => {
  try {
    // Try query with interested field (boolean or date)
    let result;
    try {
      result = await pool.query(`
        SELECT
          r.singles_id_to,
          s.singles_id,
          s.profile_image_url,
          s.vetted_status
        FROM public.requests r
               JOIN public.singles s ON r.singles_id_to = s.singles_id
        WHERE r.interested = true 
        ORDER BY s.lastLoginTime DESC;
      `);
    } catch (fieldError) {
      console.error('Error fetching singles:', error);
      res.status(500).json({ error: 'Failed to fetch singles from database' });
    }

    console.log('Backend - result.rows:', JSON.stringify(result.rows, null, 2));
    console.log('Backend - first row:', result.rows[0]);
    console.log('Backend - first row keys:', result.rows[0] ? Object.keys(result.rows[0]) : 'no rows');

    // Ensure singles_id_to is always present, use singles_id as fallback
    // Convert to string to ensure consistent type
    const processedRows = result.rows.map((row) => {
      const idValue = row.singles_id_to ?? row.singles_id;
      return {
        singles_id_to: idValue != null ? String(idValue) : null,
        profile_image_url: row.profile_image_url || null,
        vetted_status: row.vetted_status === true || row.vetted_status === 'true' || row.vetted_status === 1
      };
    }).filter((row) => row.singles_id_to != null); // Filter out any rows with null IDs

    console.log('Backend - processedRows:', JSON.stringify(processedRows, null, 2));
    res.json(processedRows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Database error' });
  }


};

export const getSinglesRequest_EEEEEEEE = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.singles_id,
        r.*
      FROM public.singles s
      JOIN public.requests r ON s.singles_id = r.singles_id_from;
      ORDER BY s.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching singles:', error);
    res.status(500).json({ error: 'Failed to fetch singles from database' });
  }
};

// In-memory storage for verification codes
// Format: { email_phone: { code, password, expiresAt } }
const verificationCodes = new Map();

// Helper function to generate random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to send SMS (using Twilio or mock)
const sendSMS = async (phone, code) => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const isTwilioConfigured = twilioAccountSid && twilioAuthToken && twilioPhoneNumber;

  console.log('=== SMS SEND ATTEMPT ===');
  console.log('Phone:', phone);
  console.log('Code:', code);
  console.log('Twilio configured:', isTwilioConfigured);
  if (isTwilioConfigured) {
    console.log('Twilio Account SID:', twilioAccountSid ? 'Set' : 'Not set');
    console.log('Twilio Auth Token:', twilioAuthToken ? 'Set' : 'Not set');
    console.log('Twilio Phone Number:', twilioPhoneNumber);
  }
  console.log('========================');

  if (isTwilioConfigured) {
    try {
      // Dynamic import of twilio
      const twilio = (await import('twilio')).default;
      const client = twilio(twilioAccountSid, twilioAuthToken);

      const message = await client.messages.create({
        body: `Your Vetted Singles verification code is: ${code}`,
        from: twilioPhoneNumber,
        to: phone
      });

      console.log(`✅ SMS sent successfully to ${phone} with code: ${code}`);
      console.log('Twilio Message SID:', message.sid);
      return true;
    } catch (error) {
      console.error('❌ Error sending SMS via Twilio:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        status: error.status,
        moreInfo: error.moreInfo
      });
      throw new Error(`Failed to send SMS: ${error.message || 'Please check Twilio configuration.'}`);
    }
  } else {
    // Mock SMS for development - just log it
    console.log('⚠️  === MOCK SMS (Twilio not configured) ===');
    console.log(`To: ${phone}`);
    console.log(`Message: Your Vetted Singles verification code is: ${code}`);
    console.log('⚠️  NOTE: No actual SMS was sent. Configure Twilio to send real SMS.');
    console.log('⚠️  ========================================');
    // Still return true for development, but log a warning
    return true;
  }
};

export const createPassword_GGGGGGGG = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
      return res.status(400).json({ error: 'Email, password, and phone are required' });
    }

    // Validate phone format (remove formatting)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }

    // Format phone as +1XXXXXXXXXX for Twilio (US numbers)
    const formattedPhone = `+1${phoneDigits}`;

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();

    // Store verification code with email and password (expires in 10 minutes)
    const key = `${email}_${formattedPhone}`;
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    verificationCodes.set(key, {
      code: verificationCode,
      password: password,
      email: email,
      phone: formattedPhone,
      expiresAt: expiresAt
    });

    // Send SMS with verification code
    try {
      await sendSMS(formattedPhone, verificationCode);
      console.log(`✅ SMS sending completed for ${email} to ${formattedPhone}`);
    } catch (smsError) {
      console.error(`❌ SMS sending failed for ${email} to ${formattedPhone}:`, smsError);
      // Remove stored code if SMS fails
      verificationCodes.delete(key);
      return res.status(500).json({ 
        error: 'Failed to send verification SMS',
        details: smsError.message || 'SMS service unavailable. Please check server logs.'
      });
    }

    res.json({ 
      success: true, 
      message: 'Verification code sent to your phone' 
    });
  } catch (error) {
    console.error('Error in createPassword:', error);
    res.status(500).json({ error: 'Failed to process password creation' });
  }
};

export const verifyPhone_HHHHHHHH = async (req, res) => {
  try {
    const { email, phone, verificationCode } = req.body;

    if (!email || !phone || !verificationCode) {
      return res.status(400).json({ error: 'Email, phone, and verification code are required' });
    }

    // Format phone
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({ error: 'Phone number must be 10 digits' });
    }
    const formattedPhone = `+1${phoneDigits}`;

    // Look up verification code
    const key = `${email}_${formattedPhone}`;
    const storedData = verificationCodes.get(key);

    if (!storedData) {
      return res.status(400).json({ error: 'Verification code not found or expired. Please request a new code.' });
    }

    // Check if code has expired
    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(key);
      return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' });
    }

    // Verify code matches
    if (storedData.code !== verificationCode) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Code is valid - create user in database
    try {
      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT singles_id FROM public.singles WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        // User already exists - update password and phone
        await pool.query(
          `UPDATE public.singles 
           SET password_hash = $1, phone = $2, updated_at = CURRENT_TIMESTAMP 
           WHERE email = $3`,
          [storedData.password, formattedPhone, email]
        );
      } else {
        // Insert new user
        await pool.query(
          `INSERT INTO public.singles (email, password_hash, phone, user_status, created_at, updated_at)
           VALUES ($1, $2, $3, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [email, storedData.password, formattedPhone]
        );
      }

      // Remove verification code after successful verification
      verificationCodes.delete(key);

      res.json({ 
        success: true, 
        message: 'Phone verified successfully. Account created.' 
      });
    } catch (dbError) {
      console.error('Database error in verifyPhone:', dbError);
      res.status(500).json({ error: 'Failed to create account. Please try again.' });
    }
  } catch (error) {
    console.error('Error in verifyPhone:', error);
    res.status(500).json({ error: 'Failed to verify phone' });
  }
};