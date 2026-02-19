import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { verifyPhone, resendPhoneCode } from 'api/verifyPhoneFe';

const RESEND_COUNTDOWN_SECONDS = 60;

// ===========================|| PHONE VERIFICATION ||=========================== //

export default function AuthPhoneVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(RESEND_COUNTDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  // Get email and phone from URL params
  const email = searchParams.get('email') || '';
  const phone = searchParams.get('phone') || '';

  // Countdown timer for Resend Code link
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  useEffect(() => {
    if (!email || !phone) {
      setError('Email and phone number are required.');
    }
  }, [email, phone]);

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    // Validation
    if (!email || !phone) {
      setError('Email and phone number are required.');
      return;
    }
    
    if (!verificationCode) {
      setError('Verification code is required.');
      return;
    }
    
    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Call the verifyPhone API
      await verifyPhone(email, phone, verificationCode);
      
      // On success, redirect to Page 8 (Phone Verification Success) with email
      navigate(`/pages/phoneVerificationSuccess?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Phone verification error:', err);
      setError(err.message || 'The phone verification code is incorrect. Please enter again or register phone number again.');
      setIsSubmitting(false);
    }
  };

  const handleResendCode = useCallback(async () => {
    if (resendCountdown > 0 || isResending || !email || !phone) return;
    setError('');
    setIsResending(true);
    try {
      await resendPhoneCode(email, phone);
      setResendCountdown(RESEND_COUNTDOWN_SECONDS);
    } catch (err) {
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  }, [email, phone, resendCountdown, isResending]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Please Enter the verification code we just sent to {phone || 'your phone'} to continue.
        </Typography>
      </Stack>

      <CustomFormControl fullWidth error={!!error}>
        <InputLabel htmlFor="outlined-adornment-verification-code">Verification Code</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-verification-code" 
          type="text"
          value={verificationCode}
          onChange={handleCodeChange}
          name="verificationCode"
          placeholder="Enter the code sent to your phone"
          required
          error={!!error}
          inputProps={{
            maxLength: 6,
            pattern: '[0-9]*',
            inputMode: 'numeric'
          }}
        />
      </CustomFormControl>

      {error && (
        <Typography variant="body2" sx={{ mt: 1, mb: 1, color: 'error.main' }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button 
            disableElevation 
            fullWidth 
            size="large" 
            type="submit" 
            variant="contained" 
            color="secondary"
            disabled={isSubmitting || !email || !phone}
          >
            {isSubmitting ? 'Verifying...' : 'Verify Phone'}
          </Button>
        </AnimateButton>
      </Box>

      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        {resendCountdown > 0 ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Resend code in {resendCountdown}
          </Typography>
        ) : (
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={handleResendCode}
            disabled={isResending || !email || !phone}
            sx={{ cursor: isResending ? 'wait' : 'pointer' }}
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </Link>
        )}
      </Box>
    </form>
  );
}
