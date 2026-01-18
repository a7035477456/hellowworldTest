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

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { useGetSingles } from 'api/singles';

// assets
import { IconSearch, IconChevronRight } from '@tabler/icons-react';
import UserRound from 'assets/images/users/user-round.svg';

// ==============================|| ALL SINGLES ||============================== //

export default function AllSingles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('22003');
  const [maxDistance, setMaxDistance] = useState(19);
  const [gender, setGender] = useState('Men');
  const [ageRange, setAgeRange] = useState([21, 35]);
  const { singles, singlesLoading, singlesError } = useGetSingles();

  const filteredSingles = (singles || []).filter((person) => {
    const query = searchQuery.toLowerCase();
    const memberId = `member ${String(person.id).padStart(5, '0')}`;
    return memberId.includes(query);
  });

  const handleMessage = (id) => {
    console.log('Message clicked for:', id);
    // Add message functionality here
  };

  const handleAddToVetList = (id) => {
    console.log('Add to Vet List clicked for:', id);
    // Add to vet list functionality here
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  return (
    <MainCard
      title="All Singles"
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
                  onClick={() => handleAddToVetList(person.id)}
                >
                  Add to Vet List
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
      )}
    </MainCard>
  );
}
