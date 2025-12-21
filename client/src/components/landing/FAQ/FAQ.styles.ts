import type { SxProps, Theme } from '@mui/material';

export const faqStyles: Record<string, SxProps<Theme>> = {
  section: {
    // RESPONSIVE FIX: Compact on mobile, spacious on desktop
    py: { xs: 6, md: 10 },
    bgcolor: 'background.default',
  },
  header: {
    textAlign: 'center',
    // RESPONSIVE FIX: Less margin on mobile
    mb: { xs: 4, md: 6 }, 
    maxWidth: '800px',
    mx: 'auto',
    px: 2, // Ensure text doesn't touch edges on small screens
  },
  accordion: {
    mb: 2,
    borderRadius: '12px !important',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.05)',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    }
  },
  question: {
    fontWeight: 600,
    // RESPONSIVE FIX: Slightly smaller text on mobile to prevent wrapping weirdly
    fontSize: { xs: '1rem', md: '1.1rem' }, 
    color: 'primary.main',
  },
  answer: {
    color: 'text.secondary',
    lineHeight: 1.7,
    fontSize: { xs: '0.95rem', md: '1rem' },
  }
};