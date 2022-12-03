import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import theme from './ui-utils/theme';
import { Navbar } from './components/Navbar';
import { MaterialsPage } from './screens/Materials';
import { StoreProvider } from './context/Store';
import { RequestsPage } from './screens/Requests';
import { LoginPage } from './screens/Login';
import { MyOffersPage } from './screens/MyOffers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const App = () => {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <BrowserRouter>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <QueryClientProvider client={queryClient}>
                <Navbar />
                <Box ml="200px">
                  <Routes>
                    <Route path="/" element={<MaterialsPage />} />
                    <Route path="/demandes" element={<RequestsPage />} />
                    <Route path="/se-connecter" element={<LoginPage />} />
                    <Route path="/mes-offres" element={<MyOffersPage />} />
                  </Routes>
                </Box>
              </QueryClientProvider>
            </StyledEngineProvider>
          </BrowserRouter>
        </StoreProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
