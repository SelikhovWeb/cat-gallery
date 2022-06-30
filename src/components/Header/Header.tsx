import React, { FC } from 'react';
import './Header.css';
// @ts-ignore
import { ReactComponent as CatLogo } from '../../icons/cat.svg';

const Header: FC = () => {
  return (
    <div className="header">
      <div className="cat-wrapper">
        <CatLogo />
      </div>
      <h1>Welcome to the cat app</h1>
    </div>
  );
};

export default Header;
