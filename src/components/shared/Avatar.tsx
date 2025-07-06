// src/components/shared/Avatar.tsx - إنشاء Avatar component محسن
import React, { useState, useCallback } from 'react';
import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';

interface CustomAvatarProps extends AvatarProps {
  src?: string;
  alt?: string;
}

const Avatar: React.FC<CustomAvatarProps> = ({ src, alt, ...props }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <MuiAvatar
      {...props}
      src={!imageError ? src : undefined}
      alt={alt}
      imgProps={{
        onLoad: handleImageLoad,
        onError: handleImageError,
        style: { display: imageLoaded ? 'block' : 'none' }
      }}
    />
  );
};

export default Avatar;
