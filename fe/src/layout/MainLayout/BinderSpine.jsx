import { memo } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

// project imports
import { drawerWidth } from 'store/constant';

const MINI_DRAWER_WIDTH = 72;

// Vertical spiral binder strip (SVG) – sits between nav and main content
const BINDER_WIDTH = 24;
const RING_COUNT = 28;
const RING_GAP = 8;

function BinderSpine({ open }) {
  const theme = useTheme();
  const left = open ? drawerWidth : MINI_DRAWER_WIDTH;

  const height = RING_COUNT * RING_GAP + 20;
  const rings = [];
  for (let i = 0; i < RING_COUNT; i++) {
    const cy = 12 + i * RING_GAP;
    rings.push(
      <g key={i}>
        <ellipse
          cx={BINDER_WIDTH / 2}
          cy={cy}
          rx={4}
          ry={5}
          fill="none"
          stroke="#333"
          strokeWidth="1.2"
        />
        <path
          d={`M ${BINDER_WIDTH / 2 - 4} ${cy} Q ${BINDER_WIDTH / 2 + 6} ${cy - 4} ${BINDER_WIDTH / 2 + 4} ${cy} Q ${BINDER_WIDTH / 2 - 6} ${cy + 4} ${BINDER_WIDTH / 2 - 4} ${cy}`}
          fill="none"
          stroke="#333"
          strokeWidth="1.2"
        />
      </g>
    );
  }

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        position: 'absolute',
        left,
        top: 88,
        bottom: 0,
        width: BINDER_WIDTH,
        flexShrink: 0,
        zIndex: 1100,
        pointerEvents: 'none',
        display: { xs: 'none', md: 'block' },
        transition: theme.transitions.create('left', {
          duration: theme.transitions.duration.enteringScreen + 200,
          easing: theme.transitions.easing.easeOut
        })
      }}
    >
      <Box
        sx={{
          width: BINDER_WIDTH,
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.06) 100%)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <svg
          width={BINDER_WIDTH}
          height="100%"
          viewBox={`0 0 ${BINDER_WIDTH} ${height}`}
          preserveAspectRatio="none slice"
          style={{ overflow: 'visible' }}
        >
          {rings}
        </svg>
      </Box>
    </Box>
  );
}

export default memo(BinderSpine);

export { BINDER_WIDTH };
