import React from 'react';
import { IconComponentsProps } from 'models/IIcon';

const IconChevronDown: React.FC<IconComponentsProps> = ({ color }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.8"
      d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z"
      fill={color}
    />
  </svg>
);

export default IconChevronDown;