// material-ui
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// icons
import { IconX, IconCheck, IconPhone, IconHeart } from '@tabler/icons-react';

// ==============================|| VERIFY SELF PAGE ||============================== //

// Initial data based on the desired UI
const initialFields = [
  {
    id: 1,
    field: 'Tuổi',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: '',
    resetChecked: false,
    vettedResult: '56'
  },
  {
    id: 2,
    field: 'Thành phố hiện tại',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: 'Đã xác minh: Annandale, VA',
    resetChecked: false,
    vettedResult: 'Annandale, VA'
  },
  {
    id: 3,
    field: 'Học vấn',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: 'Đã xác minh: Kỹ sư phần mềm',
    resetChecked: false,
    vettedResult: 'Software Engineer'
  },
  {
    id: 4,
    field: 'Nghề nghiệp',
    requestVetted: true,
    vetStatus: 'Đã lên lịch',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 5,
    field: 'Con cái',
    requestVetted: true,
    vetStatus: 'Đang xử lý',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 6,
    field: 'Quê quán',
    requestVetted: false,
    vetStatus: 'Mới',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 7,
    field: 'Nước sinh ra',
    requestVetted: true,
    vetStatus: 'Đã thêm',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 8,
    field: 'Tôn giáo',
    requestVetted: true,
    vetStatus: 'Mới',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 9,
    field: 'Sở thích',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: 'Hoàn tất. Tennis, Du thuyền',
    resetChecked: false,
    vettedResult: 'Tennis, Cruise'
  },
  {
    id: 10,
    field: 'Top 3 chương trình TV',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: 'AGT, Hawaii Life, Mr Beast',
    resetChecked: false,
    vettedResult: 'AGT, Hawaii Life, Mr Beast'
  },
  {
    id: 11,
    field: 'Top 3 phim yêu thích',
    requestVetted: true,
    vetStatus: 'Đã xác minh',
    comment: 'Aliens, Predator',
    resetChecked: false,
    vettedResult: 'Aliens, Predator'
  }
];

export default function VerifySelf() {
  const [fields, setFields] = useState(initialFields);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [paymentTab, setPaymentTab] = useState(0);
  const [verificationPackage, setVerificationPackage] = useState('5');
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [paymentInfo, setPaymentInfo] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    month: '',
    year: '',
    zip: '',
    cvv: ''
  });
  const [appointmentData, setAppointmentData] = useState({
    userId: '',
    email: '',
    selectedDate: null,
    selectedTime: ''
  });
  const [confirmedAppointment, setConfirmedAppointment] = useState({
    date: '',
    time: ''
  });

  const handleRequestChange = (id) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, requestVetted: !field.requestVetted } : field))
    );
  };

  const handleResetChange = (id) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, resetChecked: !field.resetChecked } : field))
    );
  };

  // Determine if reset checkbox should be enabled (only for Vetted status)
  const isResetEnabled = (vetStatus) => {
    return vetStatus === 'Đã xác minh';
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenAppointmentDialog = () => {
    setOpenAppointmentDialog(true);
  };

  const handleCloseAppointmentDialog = () => {
    setOpenAppointmentDialog(false);
  };

  const handleOpenVerificationDialog = (fieldId) => {
    setSelectedFieldId(fieldId);
    setOpenVerificationDialog(true);
  };

  const handleCloseVerificationDialog = () => {
    setOpenVerificationDialog(false);
    setOpenAppointmentDialog(false); // Also close appointment dialog
    setSelectedFieldId(null);
  };

  const handleAppointmentSubmit = () => {
    // Format the date and time for confirmation
    const dateObj = appointmentData.selectedDate ? new Date(appointmentData.selectedDate) : new Date();
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Format time (convert 12:00 to 12:00 PM (Noon))
    let formattedTime = appointmentData.selectedTime;
    if (appointmentData.selectedTime === '12:00') {
      formattedTime = '12:00 PM (Noon)';
    } else {
      const hour = parseInt(appointmentData.selectedTime.split(':')[0]);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      formattedTime = `${displayHour}:00 ${period}`;
    }
    
    setConfirmedAppointment({
      date: formattedDate,
      time: formattedTime
    });
    
    // Close appointment dialog and open confirmation dialog
    setOpenAppointmentDialog(false);
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleAppointmentDataChange = (field) => (event) => {
    setAppointmentData({
      ...appointmentData,
      [field]: event.target.value
    });
  };


  const handlePackageChange = (event) => {
    setVerificationPackage(event.target.value);
  };

  const handlePaymentInfoChange = (field) => (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [field]: event.target.value
    });
  };

  const getPackagePrice = (packageValue) => {
    const prices = {
      '10': 49,
      '5': 29,
      '2': 19
    };
    return prices[packageValue] || 0;
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const calculateOrderTotal = () => {
    // Map package values to simplified order totals
    const orderTotals = {
      '10': 49,
      '5': 29,
      '2': 19
    };
    return orderTotals[verificationPackage] || 0;
  };

  return (
    <>
      <MainCard title={<Typography sx={{ fontFamily: 'Comic Sans MS', fontSize: '1.5rem' }}>Xác minh thông tin của bạn</Typography>}>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Yêu cầu xác minh để nhận huy hiệu tin cậy trên hồ sơ Độc thân đã xác minh của bạn
            </Alert>
          </Grid>
          <Grid size={12}>
            <Typography variant="h3" gutterBottom>
              Quan trọng:{' '}
              <Link
                component="button"
                variant="h3"
                onClick={handleOpenDialog}
                sx={{
                  textDecoration: 'underline',
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.dark'
                  }
                }}
              >
                Bấm vào đây để xem hướng dẫn sử dụng trang này.
              </Link>
              {' '}Trạng thái xác minh: &apos;Mới{'>'}Đã thêm{'>'}Đã lên lịch{'>'}Đang xử lý{'>'}Đã xác minh&apos;
            </Typography>
          </Grid>
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Thông tin trường</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Trạng thái xác minh</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Đặt lại</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Kết quả xác minh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((row) => {
                    const resetEnabled = isResetEnabled(row.vetStatus);
                    // Fields to disable: Age, Current city, Education, Career, Children, Country of Birth, Hobbies, Top 3 TV Shows, Top 3 Favorite Movies
                    const disabledFields = [1, 2, 3, 4, 5, 7, 9, 10, 11];
                    const isCheckboxDisabled = disabledFields.includes(row.id);
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Checkbox
                              checked={row.requestVetted}
                              onChange={() => handleRequestChange(row.id)}
                              disabled={isCheckboxDisabled}
                              size="small"
                              sx={{
                                '&.Mui-disabled': {
                                  color: 'primary.main',
                                  '& .MuiSvgIcon-root': {
                                    fill: 'primary.main'
                                  }
                                }
                              }}
                            />
                            <Typography variant="body2">{row.field}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {row.vetStatus || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={row.resetChecked}
                            onChange={() => handleResetChange(row.id)}
                            disabled={!resetEnabled}
                            size="small"
                            sx={{
                              '&.Mui-disabled': {
                                color: 'grey.400',
                                '& .MuiSvgIcon-root': {
                                  fill: 'grey.400'
                                }
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{row.vettedResult || '-'}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mt: 3 }}>
              {/* Left side buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => console.log('Add clicked')}
                >
                  Thêm
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleOpenAppointmentDialog}
                >
                  Đặt lịch
                </Button>
              </Box>
              
              {/* Right side buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => console.log('Save clicked')}>
                  Lưu
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => console.log('Exit wo Save clicked')}>
                  Thoát không lưu
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Reset button positioned at bottom of Reset column */}
          <Grid size={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => console.log('Reset clicked')}
                sx={{ ml: 0 }}
              >
                Đặt lại
              </Button>
            </Box>
          </Grid>
        </Grid>
      </MainCard>

      {/* Appointment Form Dialog */}
      <Dialog
        open={openAppointmentDialog}
        onClose={handleCloseAppointmentDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Phiếu đặt lịch xác minh - Độc thân đã xác minh
            </Typography>
            <IconButton
              aria-label="đóng"
              onClick={handleCloseAppointmentDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <DialogContentText>
              Vui lòng chọn ngày và giờ cho cuộc gọi Zoom với nhân viên xác minh. Trong cuộc gọi, chúng tôi sẽ xem xét và xác minh thông tin bạn đã chọn. Vui lòng chuẩn bị đầy đủ tài liệu cần thiết vào giờ đã đặt.
            </DialogContentText>

            <TextField
              fullWidth
              label="Mã người dùng của bạn"
              value={appointmentData.userId}
              onChange={handleAppointmentDataChange('userId')}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email của bạn"
              type="email"
              value={appointmentData.email}
              onChange={handleAppointmentDataChange('email')}
              variant="outlined"
            />

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Chọn ngày
              </Typography>
              <TextField
                fullWidth
                type="date"
                value={appointmentData.selectedDate || '2020-04-10'}
                onChange={handleAppointmentDataChange('selectedDate')}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Ngày khả dụng được tô màu vàng. Ngày không khả dụng hiển thị màu xám.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Chọn giờ
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                  <Button
                    key={time}
                    variant={appointmentData.selectedTime === time ? 'contained' : 'outlined'}
                    color={appointmentData.selectedTime === time ? 'primary' : 'inherit'}
                    onClick={() => setAppointmentData({ ...appointmentData, selectedTime: time })}
                    sx={{
                      minWidth: 80,
                      borderColor: appointmentData.selectedTime === time ? 'primary.main' : 'grey.300',
                      bgcolor: appointmentData.selectedTime === time ? 'primary.main' : 'transparent',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: appointmentData.selectedTime === time ? 'primary.dark' : 'action.hover'
                      }
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAppointmentSubmit}
                disabled={!appointmentData.selectedDate || !appointmentData.selectedTime}
                sx={{
                  minWidth: 150,
                  bgcolor: '#20B2AA',
                  '&:hover': {
                    bgcolor: '#1A9A94'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'grey.300'
                  }
                }}
              >
                Gửi
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Instruction Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3">Cách xác minh hoạt động</Typography>
            <IconButton
              aria-label="đóng"
              onClick={handleCloseDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Cách xác minh hoạt động
              </Typography>
              <DialogContentText>
                Bạn chọn thông tin muốn xác minh. Sau khi xác minh, thông tin đó sẽ hiển thị &quot;Đã xác minh&quot; trên hồ sơ của bạn.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Tại sao nên xác minh?
              </Typography>
              <DialogContentText>
                Khi bạn xác minh thông tin, bạn có thể yêu cầu thông tin tương tự từ người độc thân khác. Càng xác minh nhiều, bạn càng có thể yêu cầu thêm thông tin từ người khác.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Cách yêu cầu hoạt động
              </Typography>
              <DialogContentText component="div">
                <Typography variant="body1" paragraph>
                  Khi bạn muốn yêu cầu thông tin từ ai đó:
                </Typography>
                <Box component="ol" sx={{ pl: 3, mb: 2 }}>
                  <li>
                    <Typography variant="body1">Gửi yêu cầu đến người bạn quan tâm.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Người đó quyết định có chấp nhận yêu cầu của bạn hay không.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Nếu được chấp nhận, thông tin sẽ được xác minh.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Sau khi xác minh, thông tin hiển thị trong &quot;Thông tin yêu cầu từ người khác&quot;.</Typography>
                  </li>
                </Box>
                <Typography variant="body1">
                  Bạn có toàn quyền kiểm soát thông tin muốn tiết lộ và thông tin muốn yêu cầu từ người khác.
                </Typography>
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Ví dụ
              </Typography>
              <DialogContentText>
                Nếu bạn xác minh tuổi và quê quán, bạn có thể yêu cầu tuổi và quê quán của người độc thân khác. Nếu sau đó bạn xác minh học vấn hoặc nghề nghiệp, bạn cũng có thể yêu cầu những thông tin đó.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Lợi ích
              </Typography>
              <DialogContentText component="div">
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  <li>
                    <Typography variant="body1">Chia sẻ thoải mái hơn</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Giữ phép lịch sự và tôn trọng</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Tăng tin cậy và chính xác</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Hạn chế bất ngờ</Typography>
                  </li>
                </Box>
                <Typography variant="body1">
                  Xác minh do nền tảng thực hiện với sự cho phép, thay vì yêu cầu trực tiếp từ người dùng.
                </Typography>
              </DialogContentText>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Get Verification Dialog */}
      <Dialog
        open={openVerificationDialog}
        onClose={handleCloseVerificationDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        PaperProps={{
          sx: {
            position: 'relative',
            overflow: 'visible'
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconHeart 
                size={28} 
                style={{ 
                  color: '#E91E63',
                  fill: '#E91E63',
                  stroke: '#E91E63'
                }} 
              />
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                Thanh toán - Độc thân đã xác minh
              </Typography>
            </Box>
            <IconButton
              aria-label="đóng"
              onClick={handleCloseVerificationDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            {/* Main Content - Verification Bundle and Payment Methods */}
            <Grid size={12}>
              {/* Verification Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="h4">Mua xác minh</Typography>
              </Box>

              {/* Total verification tokens balance */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1">
                  Tổng số token xác minh: 0
                </Typography>
              </Box>

              {/* Choose your verification bundle */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Chọn gói xác minh
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={verificationPackage}
                    onChange={handlePackageChange}
                  >
                    <FormControlLabel
                      value="10"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">10 token xác minh</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tổng ${getPackagePrice('10')}
                          </Typography>
                        </Box>
                      }
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">5 token xác minh</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tổng ${getPackagePrice('5')}
                          </Typography>
                        </Box>
                      }
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">2 token xác minh</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tổng ${getPackagePrice('2')}
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Pay with Section */}
              <Box>
                <Typography variant="h5" gutterBottom>
                  Thanh toán bằng
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            border: '1px solid',
                            borderColor: '#000000',
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'white',
                            flex: 1,
                            minHeight: 48
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#003087', fontSize: '1rem' }}>
                              Pay
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#009CDE', fontSize: '1rem' }}>
                              Pal
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto', fontSize: '0.875rem' }}>
                            b***6@gmail.com
                          </Typography>
                        </Box>
                      }
                      sx={{ mb: 1, ml: 0, mr: 0, alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="venmo"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            border: '1px solid',
                            borderColor: '#000000',
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'white',
                            flex: 1,
                            minHeight: 48
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#3D95CE', textTransform: 'lowercase', fontSize: '1rem' }}>
                            venmo
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto', fontSize: '0.875rem' }}>
                            @andrewhungton
                          </Typography>
                        </Box>
                      }
                      sx={{ mb: 1, ml: 0, mr: 0, alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="newcard"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 1,
                            px: 2,
                            py: 1,
                            bgcolor: 'white',
                            flex: 1
                          }}
                        >
                          <Typography variant="body1">Thêm thẻ mới</Typography>
                          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: '#E0E0E0',
                                borderRadius: 0.5,
                                px: 1.5,
                                py: 0.75,
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 50,
                                minHeight: 32
                              }}
                            >
                              <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#1434CB', letterSpacing: '0.5px' }}>
                                VISA
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'grey.300',
                                borderRadius: 0.5,
                                px: 1,
                                py: 0.5,
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 40
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 16,
                                  borderRadius: '50%',
                                  bgcolor: '#EB001B',
                                  position: 'relative',
                                  '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    width: 12,
                                    height: 16,
                                    borderRadius: '0 50% 50% 0',
                                    bgcolor: '#F79E1B'
                                  }
                                }}
                              />
                            </Box>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'grey.300',
                                borderRadius: 0.5,
                                px: 1,
                                py: 0.5,
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 40
                              }}
                            >
                              <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#006FCF' }}>
                                AMEX
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                border: '1px solid',
                                borderColor: 'grey.300',
                                borderRadius: 0.5,
                                px: 1,
                                py: 0.5,
                                bgcolor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 40
                              }}
                            >
                              <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#FF6000' }}>
                                DISCOVER
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      }
                      sx={{ mb: 1, ml: 0, mr: 0, alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="gpay"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            border: '1px solid',
                            borderColor: '#000000',
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'white',
                            flex: 1,
                            minHeight: 48
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                position: 'relative',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {/* Google G Logo - Multi-color circle */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  background: `
                                    conic-gradient(
                                      from 0deg at 50% 50%,
                                      #4285F4 0deg 90deg,
                                      #EA4335 90deg 180deg,
                                      #FBBC05 180deg 270deg,
                                      #34A853 270deg 360deg
                                    )
                                  `,
                                  borderRadius: '50%'
                                }}
                              />
                              {/* White inner circle */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '50%',
                                  height: '50%',
                                  bgcolor: 'white',
                                  borderRadius: '50%'
                                }}
                              />
                              {/* Blue G bar */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '30%',
                                  height: '20%',
                                  bgcolor: '#4285F4',
                                  top: '10%',
                                  right: '20%',
                                  borderRadius: '2px'
                                }}
                              />
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: '#5F6368', fontSize: '1rem' }}>
                              Pay
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{ mb: 1, ml: 0, mr: 0, alignItems: 'center' }}
                    />
                    <FormControlLabel
                      value="paypalcredit"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid',
                            borderColor: '#000000',
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            bgcolor: 'white',
                            flex: 1,
                            minHeight: 48
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: '#003087',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 0.5
                              }}
                            >
                              <Typography variant="caption" sx={{ color: 'white', fontWeight: 700, fontSize: '0.7rem' }}>
                                P
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#003087', fontSize: '1rem' }}>
                              Pay
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#009CDE', fontSize: '1rem' }}>
                              Pal
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 700, color: '#003087', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                              CREDIT
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mt: 0.5 }}>
                            Không lãi suất nếu trả đủ trong 6 tháng. Đăng ký ngay.{' '}
                            <Link
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                console.log('See terms clicked');
                              }}
                              sx={{
                                fontSize: '0.75rem',
                                textDecoration: 'underline',
                                color: 'primary.main'
                              }}
                            >
                              Xem điều khoản
                            </Link>
                          </Typography>
                        </Box>
                      }
                      sx={{ ml: 0, mr: 0, alignItems: 'flex-start' }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Order Summary */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2, fontSize: '1.75rem' }}>
                  Tóm tắt đơn hàng
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                    Tổng đơn hàng
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                    ${calculateOrderTotal()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Legal Text */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.75rem' }}>
                Bằng cách bấm Xác nhận và thanh toán, bạn đồng ý{' '}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('User Agreement clicked');
                  }}
                  sx={{
                    fontSize: '0.75rem',
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }}
                >
                  Thỏa thuận người dùng Vsingles
                </Link>
                {' '}và công nhận{' '}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Privacy Notice clicked');
                  }}
                  sx={{
                    fontSize: '0.75rem',
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }}
                >
                  Thông báo bảo mật
                </Link>
                .
              </Typography>

              {/* Confirm and Pay Button */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    console.log('Confirm and pay clicked', { selectedFieldId, verificationPackage, paymentMethod });
                    handleCloseVerificationDialog();
                  }}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 1.5,
                    bgcolor: '#1976D2',
                    flex: 1,
                    maxWidth: '300px',
                    '&:hover': {
                      bgcolor: '#1565C0'
                    }
                  }}
                >
                  Xác nhận và thanh toán
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={handleCloseVerificationDialog}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    py: 1.5,
                    flex: 1,
                    maxWidth: '300px'
                  }}
                >
                  Hủy
                </Button>
              </Box>

              {/* Guarantee */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>$</Box>
                  Mua hàng được bảo vệ bởi{' '}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Vsingles Money Back Guarantee clicked');
                    }}
                    sx={{
                      fontSize: '0.875rem',
                      textDecoration: 'underline',
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                  >
                    Cam kết hoàn tiền Vsingles
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Đã xác nhận lịch xác minh
            </Typography>
            <IconButton
              aria-label="đóng"
              onClick={handleCloseConfirmationDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                {confirmedAppointment.date}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                {confirmedAppointment.time}
              </Typography>
            </Box>
            
            <DialogContentText>
              Vui lòng xem email để lấy liên kết cuộc họp Zoom và tài liệu cần thiết. Tài liệu gốc không được lưu giữ. Xác minh được thực hiện trong cuộc gọi Zoom và chỉ ghi nhận một số thông tin xác minh.
            </DialogContentText>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCloseConfirmationDialog}
                sx={{
                  minWidth: 150
                }}
              >
                Đồng ý
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
