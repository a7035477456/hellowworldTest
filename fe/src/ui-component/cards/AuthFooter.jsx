// material-ui
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  const [internalIp, setInternalIp] = useState('');

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) return;
    fetch(`${origin}/api/serverInfo`)
      .then((res) => (res.ok ? res.json() : {}))
      .then((data) => {
        if (data?.internalIp) setInternalIp(data.internalIp);
      })
      .catch(() => {});
  }, []);

  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {internalIp && (
          <Typography variant="subtitle2" component="span" color="text.secondary">
            {internalIp}
          </Typography>
        )}
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.com" target="_blank" underline="hover">
          berrydashboard.com
        </Typography>
      </Stack>
      <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
        &copy; codedthemes.com
      </Typography>
    </Stack>
  );
}
