import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import Logo from 'ui-component/Logo';

// ==============================|| SERVICE NOTICE MODAL ||============================== //

export default function ServiceNoticeModal({ onExit }) {
  const handleExit = () => {
    if (typeof onExit === 'function') {
      onExit();
    } else {
      window.close();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.100',
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          maxWidth: 420,
          width: '90%',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
          p: { xs: 3, sm: 4 }
        }}
      >
        <Stack alignItems="center" spacing={2.5}>
          <Box sx={{ mb: 1 }}>
            <Logo />
          </Box>
          <Typography variant="h4" sx={{ color: 'secondary.main', fontWeight: 700 }}>
            Bonjour, bon retour
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'secondary.dark',
              fontFamily: '"Comic Neue", "Segoe Print", cursive',
              textAlign: 'center'
            }}
          >
            <strong>Avis de service :</strong> Nous nous excusons pour la gêne occasionnée. Nos serveurs sont
            actuellement hors ligne. Notre équipe technique travaille à rétablir le service. Veuillez réessayer
            d&apos;accéder aux serveurs sous peu. (E3)
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleExit}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '1rem'
            }}
          >
            Quitter
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
