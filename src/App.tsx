// src/App.tsx
import { useSelector, useDispatch } from 'src/store/Store';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { AppState } from './store/Store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import router from './routes/Router';
import { useEffect } from 'react';
import { initializeFromStorage } from './store/customizer/CustomizerSlice';
import './utils/i18n';

function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeFromStorage());
  }, [dispatch]);

  // ضمان وجود قيمة افتراضية للـ direction
  const direction = customizer.activeDir || 'ltr';

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={direction}>
        <CssBaseline />
        <RouterProvider router={router} />
      </RTL>
    </ThemeProvider>
  );
}

export default App;
