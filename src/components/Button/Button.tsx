import React, { ReactNode, FC } from 'react';
import './Button.css';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  isInvisible?: boolean;
}
const Button: FC<ButtonProps> = ({ onClick, children, isInvisible }) => {
  return (
    <button className={`Button ${isInvisible && 'invisible'}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
