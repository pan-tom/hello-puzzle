import React from 'react'
import { StyledButton } from './Button.styles'

// Shared button primitive used across app controls.
const Button = ({ onClick, disabled, children }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
)

export default Button
