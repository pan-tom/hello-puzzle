import React from 'react'
import { StyledButton } from './Button.styles'

// Shared button primitive used across app controls.
const Button = ({ onClick, disabled, children, type = 'button', ...rest }) => (
  <StyledButton type={type} onClick={onClick} disabled={disabled} {...rest}>
    {children}
  </StyledButton>
)

export default Button
