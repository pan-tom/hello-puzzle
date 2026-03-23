import React from 'react'
import style from './Button.module.scss'

// Shared button primitive used across app controls.
const Button = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled} className={style.button}>
    {children}
  </button>
)

export default Button
