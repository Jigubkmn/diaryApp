import React from 'react';
import Svg, { Path } from 'react-native-svg';

type DiaryCreationIconProps = {
  size?: number;
  color?: string;
}

export default function DiaryCreationIcon({ size = 24, color = '#000000' }: DiaryCreationIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M13.3333 20.6667H18.6667M16 18V23.3333M12.9707 4H10C9.20435 4 8.44129 4.31607 7.87868 4.87868C7.31607 5.44129 7 6.20435 7 7V25C7 25.7957 7.31607 26.5587 7.87868 27.1213C8.44129 27.6839 9.20435 28 10 28H22C22.7956 28 23.5587 27.6839 24.1213 27.1213C24.6839 26.5587 25 25.7957 25 25V16M12.9707 4C14.628 4 16 5.34267 16 7V10C16 10.7956 16.3161 11.5587 16.8787 12.1213C17.4413 12.6839 18.2044 13 19 13H22C22.7956 13 23.5587 13.3161 24.1213 13.8787C24.6839 14.4413 25 15.2044 25 16M12.9707 4C17.8907 4 25 11.1467 25 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}