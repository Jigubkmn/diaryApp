import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export default function PlusIcon({ width = 40, height = 40, color = 'white' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
      <Path
        d="M31.6666 21.6633H21.6666V31.6633H18.3333V21.6633H8.33325V18.33H18.3333V8.32996H21.6666V18.33H31.6666V21.6633Z" 
        fill={color}
      />
    </Svg>
  );
}
