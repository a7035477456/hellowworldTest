// material-ui
import { styled } from '@mui/material/styles';

// project imports
import datingCollage2 from 'assets/images/datingCollage2.jpg';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'auto',
  backgroundColor: theme.vars.palette.grey[100],
  backgroundImage: `url(${datingCollage2})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}));

export default AuthWrapper1;
