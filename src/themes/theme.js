import { createTheme } from '@mui/material/styles';
export const appTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#215b4a',
          contrastText: '#f0f9f5',
        },
        secondary: {
          main: '#3b8e74',
        },
        background: {
          default: '#dbf0e5',
          paper: '#f0f9f5',
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