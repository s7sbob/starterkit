// src/store/customizer/CustomizerSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface StateType {
  activeDir: string; // إزالة علامة الاستفهام
  activeMode: string;
  activeTheme: string;
  SidebarWidth: number;
  MiniSidebarWidth: number;
  TopbarHeight: number;
  isCollapse: boolean;
  isLayout: string;
  isSidebarHover: boolean;
  isMobileSidebar: boolean;
  isHorizontal: boolean;
  isLanguage: string;
  isCardShadow: boolean;
  borderRadius: number;
}

// دوال مساعدة لضمان وجود قيم افتراضية
const getInitialLanguage = (): string => {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'ar';
};

const getInitialDirection = (): string => {
  const savedDirection = localStorage.getItem('direction');
  const savedLanguage = localStorage.getItem('language');
  if (savedDirection) return savedDirection;
  return savedLanguage === 'ar' ? 'rtl' : 'ltr';
};

const getInitialMode = (): string => {
  return localStorage.getItem('activeMode') || 'light';
};

const getInitialTheme = (): string => {
  return localStorage.getItem('activeTheme') || 'BLUE_THEME';
};

const getInitialLayout = (): string => {
  return localStorage.getItem('isLayout') || 'boxed';
};

const initialState: StateType = {
  activeDir: getInitialDirection(),
  activeMode: getInitialMode(),
  activeTheme: getInitialTheme(),
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: getInitialLayout(),
  isCollapse: JSON.parse(localStorage.getItem('isCollapse') || 'false'),
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: JSON.parse(localStorage.getItem('isHorizontal') || 'false'),
  isLanguage: getInitialLanguage(),
  isCardShadow: JSON.parse(localStorage.getItem('isCardShadow') || 'true'),
  borderRadius: parseInt(localStorage.getItem('borderRadius') || '7'),
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setTheme: (state: StateType, action) => {
      state.activeTheme = action.payload;
      localStorage.setItem('activeTheme', action.payload);
    },
    setDarkMode: (state: StateType, action) => {
      state.activeMode = action.payload;
      localStorage.setItem('activeMode', action.payload);
    },
    setDir: (state: StateType, action) => {
      state.activeDir = action.payload;
      localStorage.setItem('direction', action.payload);
    },
    setLanguage: (state: StateType, action) => {
      state.isLanguage = action.payload;
      const newDirection = action.payload === 'ar' ? 'rtl' : 'ltr';
      state.activeDir = newDirection;
      
      localStorage.setItem('language', action.payload);
      localStorage.setItem('direction', newDirection);
      
      document.documentElement.dir = newDirection;
      document.documentElement.lang = action.payload;
    },
    setCardShadow: (state: StateType, action) => {
      state.isCardShadow = action.payload;
      localStorage.setItem('isCardShadow', JSON.stringify(action.payload));
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
      localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    hoverSidebar: (state: StateType, action) => {
      state.isSidebarHover = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
    },
    toggleLayout: (state: StateType, action) => {
      state.isLayout = action.payload;
      localStorage.setItem('isLayout', action.payload);
    },
    toggleHorizontal: (state: StateType, action) => {
      state.isHorizontal = action.payload;
      localStorage.setItem('isHorizontal', JSON.stringify(action.payload));
    },
    setBorderRadius: (state: StateType, action) => {
      state.borderRadius = action.payload;
      localStorage.setItem('borderRadius', action.payload.toString());
    },
    initializeFromStorage: (state: StateType) => {
      const savedLanguage = localStorage.getItem('language') || 'ar';
      const savedDirection = localStorage.getItem('direction') || (savedLanguage === 'ar' ? 'rtl' : 'ltr');
      
      state.isLanguage = savedLanguage;
      state.activeDir = savedDirection;
      
      document.documentElement.dir = savedDirection;
      document.documentElement.lang = savedLanguage;
    },
  },
});

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow,
  initializeFromStorage,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
