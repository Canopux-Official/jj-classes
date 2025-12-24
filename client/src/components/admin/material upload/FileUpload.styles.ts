// // FileUpload.styles.ts
// import { styled } from '@mui/material/styles';
// import { Box, Paper, Typography, Button, List, ListItem, TextField, IconButton, Tabs, Tab, Card } from '@mui/material';

// // Main Container with Light Background
// export const StyledContainer = styled(Box)(({ theme }) => ({
//   minHeight: '100vh',
//   backgroundColor: '#f5f7fa',
//   padding: theme.spacing(3),
//   display: 'flex',
//   justifyContent: 'center',
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(4),
//   },
// }));

// // Paper Container
// export const StyledPaper = styled(Paper)(({ theme }) => ({
//   width: '100%',
//   padding: theme.spacing(2),
//   borderRadius: '12px',
//   backgroundColor: '#ffffff',
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(2.5),
//   },
// }));

// // Header Box
// export const HeaderBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   marginBottom: theme.spacing(3),
//   gap: theme.spacing(2),
// }));

// // Section Title
// export const SectionTitle = styled(Typography)(({ theme }) => ({
//   fontWeight: 600,
//   marginBottom: theme.spacing(2),
//   color: '#0c1c24ff',
//   display: 'flex',
//   alignItems: 'center',
// }));

// // Styled Divider
// export const StyledDivider = styled(Box)(({ theme }) => ({
//   height: '1px',
//   backgroundColor: '#e0e0e0',
//   margin: theme.spacing(3, 0),
// }));

// // Upload Button
// export const UploadButton = styled(Button)(() => ({
//   height: '48px',
//   fontSize: '15px',
//   fontWeight: 600,
//   borderColor: '#066466',
//   color: '#066466',
//   borderWidth: '2px',
//   borderStyle: 'dashed',
//   '&:hover': {
//     borderColor: '#055254',
//     backgroundColor: 'rgba(6, 100, 102, 0.04)',
//     borderWidth: '2px',
//   },
// }));

// // File List Container
// export const FileList = styled(List)(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   border: '1px solid #e0e0e0',
//   borderRadius: '8px',
//   maxHeight: '200px',
//   overflow: 'auto',
//   backgroundColor: '#fafafa',
// }));

// // File Item
// export const FileItem = styled(ListItem)(({ theme }) => ({
//   borderBottom: '1px solid #f0f0f0',
//   paddingTop: theme.spacing(1),
//   paddingBottom: theme.spacing(1),
//   '&:last-child': {
//     borderBottom: 'none',
//   },
//   '&:hover': {
//     backgroundColor: '#f5f5f5',
//   },
// }));

// // Tag Container
// export const TagContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   gap: theme.spacing(1),
//   marginTop: theme.spacing(2),
//   marginBottom: theme.spacing(1),
// }));

// // Tag Input
// export const TagInput = styled(TextField)(() => ({
//   flex: 1,
// }));

// // Add Tag Button
// export const AddTagButton = styled(IconButton)(() => ({
//   backgroundColor: '#f5f5f5',
//   '&:hover': {
//     backgroundColor: '#e0e0e0',
//   },
// }));

// // Tags Display Container
// export const TagsDisplay = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   gap: theme.spacing(0.5),
//   marginBottom: theme.spacing(2),
// }));

// // Submit Button
// export const SubmitButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(3),
//   height: '48px',
//   fontSize: '15px',
//   fontWeight: 600,
//   background: 'linear-gradient(135deg, #066466 0%, #0c1c24ff 100%)',
//   color: '#ffffff',
//   '&:hover': {
//     background: 'linear-gradient(135deg, #055254 0%, #0a161d 100%)',
//   },
//   '&:disabled': {
//     background: '#e0e0e0',
//     color: '#999',
//   },
// }));

// // Styled Tabs
// export const StyledTabs = styled(Tabs)(() => ({
//   '& .MuiTabs-indicator': {
//     backgroundColor: '#066466',
//     height: '3px',
//   },
//   '& .MuiTabs-scrollButtons': {
//     color: '#066466',
//   },
// }));

// // Styled Tab
// export const StyledTab = styled(Tab)(({ theme }) => ({
//   fontWeight: 600,
//   fontSize: '14px',
//   color: '#666',
//   minWidth: 'auto',
//   padding: theme.spacing(1.5, 2),
//   [theme.breakpoints.down('sm')]: {
//     fontSize: '13px',
//     padding: theme.spacing(1.5, 1.5),
//     minWidth: '70px',
//   },
//   '&.Mui-selected': {
//     color: '#066466',
//   },
//   '&:hover': {
//     color: '#066466',
//     backgroundColor: 'rgba(6, 100, 102, 0.04)',
//   },
// }));

// // Content Section
// export const ContentSection = styled(Box)(({ theme }) => ({
//   display: 'grid',
//   gridTemplateColumns: '1fr',
//   gap: theme.spacing(3),
//   [theme.breakpoints.up('lg')]: {
//     gridTemplateColumns: '500px 1fr',
//   },
// }));

// // Upload Section (Left Side)
// export const UploadSection = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: '12px',
//   backgroundColor: '#ffffff',
//   height: 'fit-content',
//   position: 'sticky',
//   top: theme.spacing(2),
// }));

// // Materials Section (Right Side)
// export const MaterialsSection = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: '12px',
//   backgroundColor: '#ffffff',
// }));

// // Material Card
// export const MaterialCard = styled(Card)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   borderRadius: '8px',
//   border: '1px solid #e0e0e0',
//   '&:hover': {
//     boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//   },
// }));


import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f5f7fa',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#0c1c24ff',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.25rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const UploadButton = styled(Button)(() => ({
  height: '48px',
  fontSize: '15px',
  fontWeight: 600,
  borderColor: '#066466',
  color: '#066466',
  borderWidth: '2px',
  borderStyle: 'dashed',
  '&:hover': {
    borderColor: '#055254',
    backgroundColor: 'rgba(6, 100, 102, 0.04)',
    borderWidth: '2px',
  },
}));

export const TreeContainer = styled(Box)(({ theme }) => ({
  maxHeight: '600px',
  overflowY: 'auto',
  paddingRight: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    maxHeight: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '400px',
    paddingRight: theme.spacing(0.5),
  },
}));

interface NodeBoxProps {
  isRoot: boolean;
  level: number;
}

export const NodeBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isRoot' && prop !== 'level',
})<NodeBoxProps>(({ theme, isRoot, level }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  marginLeft: level * 16,
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: isRoot ? 'rgba(6, 100, 102, 0.05)' : 'transparent',
  border: isRoot ? '1px solid #066466' : '1px solid transparent',
  '&:hover': {
    backgroundColor: isRoot ? 'rgba(6, 100, 102, 0.08)' : '#f5f5f5',
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.5),
    padding: theme.spacing(1, 1),
    marginLeft: level * 12,
  },
}));

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0.25),
  },
}));