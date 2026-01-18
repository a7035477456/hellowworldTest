import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { useGetSingles } from 'api/singles';

// assets
import { IconSearch, IconChevronRight, IconX, IconCheck } from '@tabler/icons-react';
import UserRound from 'assets/images/users/user-round.svg';

// ==============================|| FAVORITES ||============================== //

// Initial fields data for Request Vetted Information
const initialVettedFields = [
  {
    id: 1,
    field: 'Photo',
    requestVetted: true,
    vetStatus: 'permit',
    vettedResult: 'Click here for Verified photo'
  },
  {
    id: 2,
    field: 'Age',
    requestVetted: true,
    vetStatus: 'permit',
    vettedResult: '56'
  },
  {
    id: 3,
    field: 'Current city',
    requestVetted: true,
    vetStatus: 'permit',
    vettedResult: 'Annandale, VA'
  },
  {
    id: 4,
    field: 'Home City',
    requestVetted: false,
    vetStatus: '',
    vettedResult: ''
  },
  {
    id: 5,
    field: 'Country of Birth',
    requestVetted: false,
    vetStatus: '',
    vettedResult: ''
  },
  {
    id: 6,
    field: 'Education',
    requestVetted: true,
    vetStatus: 'Not yet',
    vettedResult: ''
  },
  {
    id: 7,
    field: 'Career',
    requestVetted: true,
    vetStatus: 'Not yet',
    vettedResult: ''
  },
  {
    id: 8,
    field: 'Children',
    requestVetted: true,
    vetStatus: 'requested',
    vettedResult: ''
  },
  {
    id: 9,
    field: 'Religion',
    requestVetted: true,
    vetStatus: 'requested',
    vettedResult: ''
  },
  {
    id: 10,
    field: 'Hobbies',
    requestVetted: true,
    vetStatus: 'Not yet',
    vettedResult: ''
  },
  {
    id: 11,
    field: 'Top 3 TV Shows',
    requestVetted: true,
    vetStatus: 'permit',
    vettedResult: 'AGT, Hawaii Life, Mr Beast'
  },
  {
    id: 12,
    field: 'Top 3 Favorite Movies',
    requestVetted: true,
    vetStatus: 'permit',
    vettedResult: 'Aliens, Predator'
  }
];

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('22003');
  const [maxDistance, setMaxDistance] = useState(19);
  const [gender, setGender] = useState('Men');
  const [ageRange, setAgeRange] = useState([21, 35]);
  const { singles, singlesLoading, singlesError } = useGetSingles();
  
  // Dialog states
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [vettedFields, setVettedFields] = useState(initialVettedFields);
  const [tokenPackage, setTokenPackage] = useState('5');
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const filteredSingles = (singles || []).filter((person) => {
    const query = searchQuery.toLowerCase();
    const memberId = `member ${String(person.id).padStart(5, '0')}`;
    return memberId.includes(query);
  });

  const handleMessage = (id) => {
    console.log('Message clicked for:', id);
    // Add message functionality here
  };

  const handleRequestVettedInfo = (id) => {
    setSelectedMemberId(id);
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
    setSelectedMemberId(null);
  };

  const handleRequest = () => {
    // Count checked fields to determine tokens needed
    const checkedCount = vettedFields.filter(field => field.requestVetted).length;
    // Close request dialog and open checkout dialog
    setOpenRequestDialog(false);
    setOpenCheckoutDialog(true);
  };

  const handleCloseCheckoutDialog = () => {
    setOpenCheckoutDialog(false);
  };

  const handleConfirmAndPay = () => {
    // Close checkout dialog and return to Interested page
    setOpenCheckoutDialog(false);
    // Reset state if needed
    setSelectedMemberId(null);
  };

  const handleFieldCheckboxChange = (id) => {
    setVettedFields(
      vettedFields.map((field) => 
        field.id === id ? { ...field, requestVetted: !field.requestVetted } : field
      )
    );
  };

  const handleReset = () => {
    setVettedFields(initialVettedFields);
  };

  const getPackagePrice = (packageValue) => {
    const prices = {
      '10': 49,
      '5': 29,
      '2': 14
    };
    return prices[packageValue] || 0;
  };

  const calculateOrderTotal = () => {
    return getPackagePrice(tokenPackage);
  };

  const getVerificationStatusText = (status) => {
    if (status === 'permit') return 'Approved';
    if (status === 'Not yet') return 'Not Approved for now';
    if (status === 'requested') return 'Pending Approval';
    return status || '-';
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  return (
    <MainCard
      title="Favorites"
      secondary={
        <OutlinedInput
          id="input-search-cards"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" />
            </InputAdornment>
          }
          sx={{ width: { xs: '100%', sm: 250 } }}
        />
      }
    >
      {/* Purple Banner */}
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          color: 'common.white',
          p: 2,
          mb: 3,
          borderRadius: 1,
          textAlign: 'center'
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Access to this list is reserved for singles who have verified their photo, age, location, and career.
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
          You may complete verification under My Vetting Info.
        </Typography>
      </Box>

      {/* Singles Discovery Search Block */}
      <SubCard
        sx={{
          mb: 3,
          backgroundColor: 'secondary.light',
          border: 'none'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'secondary.main',
            mb: 3,
            fontWeight: 600
          }}
        >
          Singles Discovery
        </Typography>
        
        <Grid container spacing={3}>
          {/* Location */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  My current location
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5 }}>
                  {location}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={20} />
            </Box>
          </Grid>

          {/* Maximum Distance */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Maximum distance
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {maxDistance} km
                </Typography>
              </Box>
              <Slider
                value={maxDistance}
                onChange={(e, newValue) => setMaxDistance(newValue)}
                min={1}
                max={100}
                step={1}
                sx={{
                  color: 'error.main',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'common.white',
                    border: '2px solid',
                    borderColor: 'error.main'
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: 'error.main'
                  }
                }}
              />
            </Box>
          </Grid>

          {/* Show Me */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Show me
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.primary', mt: 0.5 }}>
                  {gender}
                </Typography>
              </Box>
              <IconChevronRight stroke={1.5} size={20} />
            </Box>
          </Grid>

          {/* Age Range */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Age range
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {ageRange[0]}-{ageRange[1]}
                </Typography>
              </Box>
              <Slider
                value={ageRange}
                onChange={handleAgeRangeChange}
                min={18}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                sx={{
                  color: 'error.main',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'common.white',
                    border: '2px solid',
                    borderColor: 'error.main'
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: 'error.main'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </SubCard>

      {singlesLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {singlesError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load singles. Please try again later.
        </Alert>
      )}
      
      {!singlesLoading && !singlesError && (
        <Grid container spacing={gridSpacing}>
          {filteredSingles.map((person) => (
          <Grid key={person.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar
                    src={person.avatar && person.avatar !== 'user-round.svg' ? person.avatar : UserRound}
                    alt={`Member ${String(person.id).padStart(5, '0')}`}
                    sx={{
                      width: 80,
                      height: 80
                    }}
                  />
                </Box>
                <Typography 
                  variant="h4" 
                  component="div"
                  sx={{ 
                    color: 'secondary.main',
                    textAlign: 'center',
                    fontWeight: 500
                  }}
                >
                  Member {String(person.id).padStart(5, '0')}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleMessage(person.id)}
                  sx={{ mr: 1 }}
                >
                  Message
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleRequestVettedInfo(person.id)}
                >
                  Request Vetted Info
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      )}

      {/* Request Vetted Information Dialog */}
      <Dialog
        open={openRequestDialog}
        onClose={handleCloseRequestDialog}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Request vetted information of Member {selectedMemberId ? String(selectedMemberId).padStart(5, '0') : ''}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseRequestDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Request Vetted Information
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Important:</strong>{' '}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Instructions clicked');
                  }}
                  sx={{
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }}
                >
                  Click here for instructions on how to use this page.
                </Link>
              </Typography>
            </Alert>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Fields Information</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Verification Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Reset</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Vetted Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vettedFields.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Checkbox
                          checked={row.requestVetted}
                          onChange={() => handleFieldCheckboxChange(row.id)}
                          size="small"
                        />
                        <Typography variant="body2">{row.field}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getVerificationStatusText(row.vetStatus)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleReset}
                        sx={{ minWidth: 'auto', px: 1 }}
                      >
                        Reset
                      </Button>
                    </TableCell>
                    <TableCell>
                      {row.vettedResult ? (
                        row.field === 'Photo' ? (
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log('View verified photo clicked');
                            }}
                            sx={{
                              textDecoration: 'underline',
                              color: 'primary.main'
                            }}
                          >
                            {row.vettedResult}
                          </Link>
                        ) : (
                          <Typography variant="body2">{row.vettedResult}</Typography>
                        )
                      ) : (
                        <Typography variant="body2" color="text.secondary">-</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequest}
              sx={{ minWidth: 120 }}
            >
              request
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => console.log('Save clicked')}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseRequestDialog}
              >
                Exit Wo Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog
        open={openCheckoutDialog}
        onClose={handleCloseCheckoutDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              Vetted Singles Checkout
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseCheckoutDialog}
              sx={{
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                We do not deduct token until requested member approved your request per vetted information
              </Typography>
            </Alert>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Tokens are only deducted after the member approves your vetted information request.
              </Typography>
            </Alert>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconCheck size={24} style={{ color: '#4caf50' }} />
              <Typography variant="h4">Get Verification</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Token Balance: <strong>0</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Tokens needed of your requests: <strong>2</strong>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Choose your verification bundle
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={tokenPackage}
                onChange={(e) => setTokenPackage(e.target.value)}
              >
                <FormControlLabel
                  value="10"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">10 Tokens</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total of $49
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
                      <Typography variant="body1">5 Tokens</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total of $29
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
                      <Typography variant="body1">2 Tokens</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total of $14
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Pay with
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  value="venmo"
                  control={<Radio />}
                  label="Venmo"
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  value="newcard"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>Add new card</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#1434CB' }}>
                          VISA
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#006FCF' }}>
                          MC
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#FF6000' }}>
                          AMEX
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#FF6000' }}>
                          DISC
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  value="gpay"
                  control={<Radio />}
                  label="Google Pay"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Order Summary
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Order total ${calculateOrderTotal()}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.75rem' }}>
            By clicking Confirm and pay, you agree{' '}
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
              User Agreement
            </Link>
            {' '}and acknowledge our{' '}
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
              Privacy Notice
            </Link>
            .
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleConfirmAndPay}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              py: 1.5,
              mb: 2
            }}
          >
            Confirm and pay
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Purchase protected by{' '}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('Money Back Guarantee clicked');
                }}
                sx={{
                  fontSize: '0.875rem',
                  textDecoration: 'underline',
                  color: 'primary.main',
                  fontWeight: 600
                }}
              >
                Money Back Guarantee
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}
