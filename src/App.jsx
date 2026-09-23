import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
      light: '#ede7f6',
      dark: '#4527a0',
    },
    secondary: {
      main: '#1e88e5',
      light: '#e3f2fd',
      dark: '#1565c0',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Inter', sans-serif`,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
