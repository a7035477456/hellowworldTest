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
    field: 'Âge',
    requestVetted: true,
    vetStatus: 'Vérifié',
    comment: '',
    resetChecked: false,
    vettedResult: '56'
  },
  {
    id: 2,
    field: 'Ville actuelle',
    requestVetted: true,
    vetStatus: 'Vérifié',
    comment: 'Vérifié : Annandale, VA',
    resetChecked: false,
    vettedResult: 'Annandale, VA'
  },
  {
    id: 3,
    field: 'Formation',
    requestVetted: true,
    vetStatus: 'Vérifié',
    comment: 'Vérifié : Ingénieur logiciel',
    resetChecked: false,
    vettedResult: 'Software Engineer'
  },
  {
    id: 4,
    field: 'Carrière',
    requestVetted: true,
    vetStatus: 'Planifié',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 5,
    field: 'Enfants',
    requestVetted: true,
    vetStatus: 'En cours',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 6,
    field: 'Ville d\'origine',
    requestVetted: false,
    vetStatus: 'Nouveau',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 7,
    field: 'Pays de naissance',
    requestVetted: true,
    vetStatus: 'Ajouté',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 8,
    field: 'Religion',
    requestVetted: true,
    vetStatus: 'Nouveau',
    comment: '',
    resetChecked: false,
    vettedResult: ''
  },
  {
    id: 9,
    field: 'Loisirs',
    requestVetted: true,
    vetStatus: 'Vérifié',
    comment: 'Terminé. Tennis, Croisière',
    resetChecked: false,
    vettedResult: 'Tennis, Cruise'
  },
  {
    id: 10,
    field: 'Top 3 séries',
    requestVetted: true,
    vetStatus: 'Vérifié',
    comment: 'AGT, Hawaii Life, Mr Beast',
    resetChecked: false,
    vettedResult: 'AGT, Hawaii Life, Mr Beast'
  },
  {
    id: 11,
    field: 'Top 3 films préférés',
    requestVetted: true,
    vetStatus: 'Vérifié',
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

  // Determine if reset checkbox should be enabled (only for Vérifié status)
  const isResetEnabled = (vetStatus) => {
    return vetStatus === 'Vérifié';
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
      <MainCard title={<Typography sx={{ fontFamily: 'Comic Sans MS', fontSize: '1.5rem' }}>Vérifier vos informations</Typography>}>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Demandez une vérification pour obtenir des badges de confiance sur votre profil Célibataires vérifiés
            </Alert>
          </Grid>
          <Grid size={12}>
            <Typography variant="h3" gutterBottom>
              Important :{' '}
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
                Cliquez ici pour les instructions d&apos;utilisation de cette page.
              </Link>
              {' '}Statut de vérification : « Nouveau » → « Ajouté » → « Planifié » → « En cours » → « Vérifié »
            </Typography>
          </Grid>
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Informations des champs</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Statut de vérification</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Réinitialiser</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Résultat vérifié</TableCell>
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
                  Ajouter
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleOpenAppointmentDialog}
                >
                  Planifier
                </Button>
              </Box>
              
              {/* Right side buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={() => console.log('Save clicked')}>
                  Enregistrer
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => console.log('Exit wo Save clicked')}>
                  Quitter sans enregistrer
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
                Réinitialiser
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
              Formulaire de rendez-vous – Célibataires vérifiés
            </Typography>
            <IconButton
              aria-label="fermer"
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
              Veuillez choisir une date et une heure pour votre appel Zoom avec notre agent de vérification. Pendant l&apos;appel, nous examinerons et vérifierons les informations que vous avez choisies. Ayez les documents requis à portée de main à l&apos;heure prévue.
            </DialogContentText>

            <TextField
              fullWidth
              label="Votre identifiant utilisateur"
              value={appointmentData.userId}
              onChange={handleAppointmentDataChange('userId')}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Votre e-mail"
              type="email"
              value={appointmentData.email}
              onChange={handleAppointmentDataChange('email')}
              variant="outlined"
            />

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Choisir la date
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
                Les dates disponibles sont surlignées en jaune. Les dates indisponibles sont en gris.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Choisir l&apos;heure
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
                Envoyer
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
            <Typography variant="h3">Comment fonctionne la vérification</Typography>
            <IconButton
              aria-label="fermer"
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
                How Verification Works
              </Typography>
              <DialogContentText>
                Vous choisissez les informations que vous souhaitez faire vérifier. Une fois vérifiées, elles apparaîtront comme « Vérifié » sur votre profil.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Pourquoi se faire vérifier ?
              </Typography>
              <DialogContentText>
                Lorsque vous faites vérifier vos informations, vous pouvez demander les mêmes informations à d&apos;autres célibataires. Plus vous en faites vérifier, plus vous pouvez en demander aux autres.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Comment fonctionnent les demandes
              </Typography>
              <DialogContentText component="div">
                <Typography variant="body1" paragraph>
                  Lorsque vous voulez demander des informations à quelqu&apos;un :
                </Typography>
                <Box component="ol" sx={{ pl: 3, mb: 2 }}>
                  <li>
                    <Typography variant="body1">Envoyez une demande à la personne concernée.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">La personne décide d&apos;accepter ou non votre demande.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Si elle est acceptée, l&apos;information est vérifiée.</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Une fois vérifiée, elle apparaît sous « Infos demandées à d&apos;autres ».</Typography>
                  </li>
                </Box>
                <Typography variant="body1">
                  Vous gardez le contrôle total sur les informations que vous souhaitez révéler et celles que vous demandez aux autres.
                </Typography>
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Exemple
              </Typography>
              <DialogContentText>
                Si vous faites vérifier votre âge et votre ville, vous pourrez ensuite demander l&apos;âge et la ville des autres célibataires. Si vous faites plus tard vérifier votre formation ou votre métier, vous pourrez aussi demander ces informations.
              </DialogContentText>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom>
                Pourquoi c&apos;est utile
              </Typography>
              <DialogContentText component="div">
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  <li>
                    <Typography variant="body1">Rend le partage moins gênant</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Garde les échanges polis et respectueux</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Renforce la confiance et l&apos;exactitude</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">Aide à éviter les mauvaises surprises</Typography>
                  </li>
                </Box>
                <Typography variant="body1">
                  La vérification est gérée par la plateforme avec votre autorisation, et non par des demandes directes entre utilisateurs.
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
                Paiement – Célibataires vérifiés
              </Typography>
            </Box>
            <IconButton
              aria-label="fermer"
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
                <Typography variant="h4">Obtenir une vérification</Typography>
              </Box>

              {/* Total verification tokens balance */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1">
                  Solde total de jetons de vérification : 0
                </Typography>
              </Box>

              {/* Choose your verification bundle */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Choisissez votre forfait de vérification
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
                          <Typography variant="body1">10 jetons de vérification</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total of ${getPackagePrice('10')}
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
                          <Typography variant="body1">5 jetons de vérification</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total of ${getPackagePrice('5')}
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
                          <Typography variant="body1">2 jetons de vérification</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total of ${getPackagePrice('2')}
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
                  Payer avec
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
                          <Typography variant="body1">Ajouter une nouvelle carte</Typography>
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
                            Sans intérêt si payé en totalité sous 6 mois. Postuler maintenant.{' '}
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
                              Voir les conditions
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
                  Récapitulatif de commande
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                    Total de la commande
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                    ${calculateOrderTotal()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Legal Text */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.75rem' }}>
                En cliquant sur Confirmer et payer, vous acceptez les{' '}
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
                  Conditions d&apos;utilisation Vsingles
                </Link>
                {' '}et reconnaissez notre{' '}
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
                  Notice de confidentialité
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
                  Confirmer et payer
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
                  Annuler
                </Button>
              </Box>

              {/* Guarantee */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-start' }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box component="span" sx={{ fontSize: '1rem', fontWeight: 600 }}>$</Box>
                  Achat protégé par la{' '}
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
                    Garantie de remboursement Vsingles
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
              Rendez-vous de vérification confirmé
            </Typography>
            <IconButton
              aria-label="fermer"
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
              Consultez votre e-mail pour le lien de la réunion Zoom et la liste des documents requis. Les documents originaux ne sont pas conservés. La vérification est effectuée pendant l&apos;appel Zoom, et seuls des éléments limités sont enregistrés.
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
                OK
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
