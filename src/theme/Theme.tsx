// src/theme/Theme.tsx
import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'src/store/Store';
import { useEffect } from 'react';
import { AppState } from '../store/Store';
import components from './Components';
import typography from './Typography';
import { shadows, darkshadows } from './Shadows';
import { DarkThemeColors } from './DarkThemeColors';
import { LightThemeColors } from './LightThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';

interface BuildThemeConfig {
  direction: string;
  theme: string;
}

export const BuildTheme = (config: BuildThemeConfig) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);
  const customizer = useSelector((state: AppState) => state.customizer);
  const defaultTheme = customizer.activeMode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow = customizer.activeMode === 'dark' ? darkshadows : shadows;
  const themeSelect = customizer.activeMode === 'dark' ? darkthemeOptions : themeOptions;
  
  const baseMode = {
    palette: {
      mode: customizer.activeMode,
    },
    shape: {
      borderRadius: customizer.borderRadius,
    },
    shadows: defaultShadow,
    typography: {
      ...typography,
      fontFamily: config.direction === 'rtl' 
        ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif'
        : '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
  
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );
  theme.components = components(theme);

  return theme;
};

const ThemeSettings = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  
  // ضمان وجود قيم افتراضية
  const activDir = customizer.activeDir || 'ltr';
  const activeTheme = customizer.activeTheme || 'BLUE_THEME';
  const isLanguage = customizer.isLanguage || 'ar';
  
  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });
  
  useEffect(() => {
    document.dir = activDir;
    document.documentElement.dir = activDir;
    document.documentElement.lang = isLanguage;
  }, [activDir, isLanguage]);

  return theme;
};

export { ThemeSettings };
