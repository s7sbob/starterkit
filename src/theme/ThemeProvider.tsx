// src/theme/ThemeProvider.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';
import { baselightTheme } from './DefaultColors';
import { DarkThemeColors } from './DarkThemeColors';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache, { StylisElement, StylisPluginCallback } from '@emotion/cache';

interface ThemeContextType {
  direction: 'ltr' | 'rtl';
}

const ThemeContext = createContext<ThemeContextType>({ direction: 'ltr' });

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const customizer = useSelector((state: AppState) => state.customizer);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  // إنشاء emotion cache للـ RTL
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
  });

  // إنشاء الثيم مع دعم RTL
  const theme = createTheme({
    ...((customizer.activeMode === 'dark' || (customizer.activeMode === 'auto' && prefersDarkMode)) 
      ? DarkThemeColors 
      : baselightTheme),
    direction,
    typography: {
      fontFamily: direction === 'rtl' 
        ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  useEffect(() => {
    // تحديث اتجاه الصفحة
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <ThemeContext.Provider value={{ direction }}>
      <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
function prefixer(_element: StylisElement, _index: number, _children: StylisElement[], _callback: StylisPluginCallback): string | void {
    throw new Error('Function not implemented.');
}

