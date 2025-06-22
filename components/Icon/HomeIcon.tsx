import React from 'react';
import Svg, { Path } from 'react-native-svg';

type HomeIconProps = {
  size?: number;
  color?: string;
}

export default function HomeIcon({ size = 24, color = '#000000' }: HomeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M8.17737 27.9999C6.60671 27.9999 5.33337 26.6932 5.33337 25.0799V13.3439C5.33337 12.4572 5.72671 11.6172 6.40004 11.0639L14.2227 4.63988C14.7225 4.22599 15.3511 3.99951 16 3.99951C16.649 3.99951 17.2776 4.22599 17.7774 4.63988L25.5987 11.0639C26.2734 11.6172 26.6667 12.4572 26.6667 13.3439V25.0799C26.6667 26.6932 25.3934 27.9999 23.8227 27.9999H8.17737Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.6667 28V20.6667C12.6667 19.9594 12.9477 19.2811 13.4478 18.781C13.9479 18.281 14.6262 18 15.3334 18H16.6667C17.374 18 18.0523 18.281 18.5524 18.781C19.0525 19.2811 19.3334 19.9594 19.3334 20.6667V28"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
