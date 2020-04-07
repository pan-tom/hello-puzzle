import React from 'react';
import style from './Button.module.scss';

const Button = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={style.button}
    >
      {children}
    </button>
  )
}

export default Button;
