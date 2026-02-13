// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 3, mt: 'auto' }}>
      <Typography variant="caption">
        &copy; Bảo lưu mọi quyền{' '}
        <Typography component={Link} href="https://vsingles.club" underline="hover" target="_blank" sx={{ color: 'secondary.main' }}>
          CodedThemes
        </Typography>
      </Typography>
      <Typography variant="caption" color="text.secondary">
        GitHub Figma UI Kit
      </Typography>
    </Stack>
  );
}
