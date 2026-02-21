// material-ui
import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO - VETTED SINGLES ||============================== //

export default function Logo() {
  const theme = useTheme();
  const textFill = theme.vars?.palette?.grey?.[900] || '#000000';

  return (
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Vetted Singles Club">
      {/* Red Heart Icon */}
      <path
        d="M20 12C20 8 14 6 12 10C10 6 4 8 4 12C4 16 12 24 20 30C28 24 36 16 36 12C36 8 30 6 28 10C26 6 20 8 20 12Z"
        fill="#E91E63"
      />
      {/* Black Circle with White Checkmark */}
      <circle cx="28" cy="22" r="5" fill="#000000" />
      <path
        d="M25.5 22L27 23.5L30.5 20"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Vetted Singles Text */}
      <text
        x="42"
        y="26"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill={textFill}
      >
        Vetted Singles
      </text>
      {/* Club Text - Rotated 45 degrees */}
      <text
        x="135"
        y="12"
        fontFamily="Arial, sans-serif"
        fontSize="13"
        fontWeight="bold"
        fill={textFill}
        transform="rotate(45 135 12)"
      >
        Club
      </text>
    </svg>
  );
}
