// src/components/Banner.tsx
import React from 'react';

interface BannerProps {
  message: string;              // The message to display
  backgroundColor?: string;     // Optional background color
  color?: string;               // Optional text color
  onClick?: () => void;         // Optional click handler
}

const Banner: React.FC<BannerProps> = ({ message, backgroundColor = 'blue', color = 'white', onClick }) => {
  const bannerStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor,
    color,
    textAlign: 'center',
    cursor: onClick ? 'pointer' : 'default'
  };

  return (
    <div style={bannerStyle} onClick={onClick}>
      {message}
    </div>
  );
};

export default Banner;
