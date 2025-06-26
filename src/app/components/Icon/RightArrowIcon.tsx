import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface RightArrowIconProps {
  size?: number;
  color?: string;
}

export default function RightArrowIcon({ size = 24, color = 'black' }: RightArrowIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}