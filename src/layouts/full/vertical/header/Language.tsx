// تحديث src/layouts/full/vertical/header/Language.tsx
import React, { useEffect } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'src/store/Store';
import { setLanguage } from 'src/store/customizer/CustomizerSlice';
import FlagEn from 'src/assets/images/flag/icon-flag-en.svg';
import FlagSa from 'src/assets/images/flag/icon-flag-sa.svg';
import { useTranslation } from 'react-i18next';
import { AppState } from 'src/store/Store';

const Languages = [
  {
    flagname: 'العربية (Arabic)',
    icon: FlagSa,
    value: 'ar',
  },
  {
    flagname: 'English (UK)',
    icon: FlagEn,
    value: 'en',
  },
];

const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const customizer = useSelector((state: AppState) => state.customizer);
  const currentLang = Languages.find((_lang) => _lang.value === customizer.isLanguage) || Languages[0];
  const { i18n } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langValue: string) => {
    dispatch(setLanguage(langValue));
    i18n.changeLanguage(langValue);
    handleClose();
  };

  // تحديث i18n عند تغيير اللغة في الـ store
  useEffect(() => {
    if (customizer.isLanguage && i18n.language !== customizer.isLanguage) {
      i18n.changeLanguage(customizer.isLanguage);
    }
  }, [customizer.isLanguage, i18n]);

  return (
    <>
      <IconButton
        aria-label="language selector"
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
        color="inherit"
      >
        <Avatar 
          src={currentLang.icon} 
          alt={currentLang.value} 
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => handleLanguageChange(option.value)}
            selected={option.value === customizer.isLanguage}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar 
                src={option.icon} 
                alt={option.flagname} 
                sx={{ width: 20, height: 20 }}
              />
              <Typography>{option.flagname}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
