import React from 'react';
import { IconComponentsProps } from 'models/IIcon';

const IconPause: React.FC<IconComponentsProps> = ({ color }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 8H2.66667V0H0V8ZM5.33333 0V8H8V0H5.33333Z"
      fill={color}
    />
  </svg>
);

export default IconPause;
