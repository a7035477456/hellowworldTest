import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { createPassword } from 'api/createPasswordFe';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| CREATE PASSWORD ||=========================== //

export default function AuthCreatePassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checked, setChecked] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Get secure token and email from URL (link from registration email)
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!token || !email) {
      setError('Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng dùng liên kết trong email đăng ký.');
    }
  }, [token, email]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    // Validation
    if (!token || !email) {
      setError('Liên kết không hợp lệ hoặc đã hết hạn. Vui lòng dùng liên kết trong email đăng ký.');
      return;
    }
    
    if (!password) {
      setError('Mật khẩu là bắt buộc.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    
    if (!phone) {
      setError('Số điện thoại là bắt buộc.');
      return;
    }
    
    // Validate phone format (should be (XXX) XXX-XXXX)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setError('Vui lòng nhập số điện thoại 10 chữ số hợp lệ.');
      return;
    }
    
    setIsSubmitting(true);
 
    try {
      // Call the createPassword API (validates token, then sends SMS)
      await createPassword(token, email, password, phone);
      
      // Navigate to phone verification page with email and phone
      navigate(`/pages/phoneVerification?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
    } catch (err) {
      console.error('Create password error:', err);
      setError(err.message || 'Tạo mật khẩu thất bại. Vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ mb: 2, alignItems: 'center' }}> 
        {/* <Typography variant="subtitle1">Sign up v3</Typography> */}
        {/* <Typography variant="body2" sx={{ mt: 0.5 }}>
          Enter your details to continue.
        </Typography> */}
      </Stack>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-create">Mật khẩu</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-password-create" 
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="ẩn/hiện mật khẩu"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Mật khẩu"
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-confirm">Xác nhận mật khẩu</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-password-confirm" 
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="ẩn/hiện mật khẩu"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Xác nhận mật khẩu"
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-phone">Số điện thoại</InputLabel>
        <OutlinedInput 
          id="outlined-adornment-phone" 
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          name="phone"
          placeholder="(100) 000-0000"
          required
        />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          Vui lòng nhập số điện thoại hợp lệ.
        </Typography>
      </CustomFormControl>

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
        label={
          <Typography variant="subtitle1">
            Agree with &nbsp;
            <Typography variant="subtitle1" component="span" sx={{ color: 'primary.main' }}>
              Điều khoản &amp; Điều kiện.
            </Typography>
          </Typography>
        }
      />

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1, mb: 1 }}>
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
            disabled={isSubmitting || !token || !email}
          >
            {isSubmitting ? 'Đang gửi...' : 'Tạo mật khẩu'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}
