// material-ui
import { styled } from '@mui/material/styles';

// project imports
import datingCollage from 'assets/images/datingCollage.jpg';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.vars.palette.grey[100],
  backgroundImage: `url(${datingCollage})`,
  backgroundSize: '75%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}));

export default AuthWrapper1;
