import React from 'react';
import { IconComponentsProps } from '../../../models/IIcon';

const IconPlay: React.FC<IconComponentsProps> = ({ color }) => (
  <svg
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.287422 0.0693819C0.376104 0.0231631 0.475355 0 0.574754 0C0.673886 0 0.773106 0.0231631 0.862176 0.0693819L7.71255 4.55186C7.89006 4.64422 8 4.81521 8 5.00008C8 5.18493 7.89036 5.35589 7.71255 5.44814L0.862176 9.93081C0.684394 10.0231 0.465233 10.0231 0.287571 9.93081C0.109759 9.83824 0 9.6672 0 9.48246V0.51755C0 0.332781 0.10958 0.16182 0.287422 0.0693819Z"
      fill={color}
    />
  </svg>
);

export default IconPlay;
