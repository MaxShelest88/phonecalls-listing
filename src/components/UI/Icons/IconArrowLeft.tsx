import React from 'react';
import { IconComponentsProps } from '../../../models/IIcon';

const IconArrowLeft: React.FC<IconComponentsProps> = ({ color}) => (
  <svg
    width="7"
    height="10"
    viewBox="0 0 7 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z"
      fill={color}
    />
  </svg>
);

export default IconArrowLeft;
