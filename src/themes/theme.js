import { createTheme } from '@mui/material/styles';
//101820
//008000

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#101820',
      contrastText: '#f0f9f5',
    },
    secondary: {
      main: '#008000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#0d211c',
      secondary: '#0d211c',
      disabled: '#0d211c',
      hint: '#0d211c',
    },
    warning: {
      main: '#ed6c02',
    },
    divider: '#bae0ce',
  },
}); 