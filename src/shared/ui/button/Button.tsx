import type {
  MouseEventHandler,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import { StyledButton } from './Button.styles'

type ButtonProps = {
  disabled: boolean
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
} & Omit<
  ComponentPropsWithoutRef<typeof StyledButton>,
  'type' | 'children' | 'onClick'
>

// Shared button primitive used across app controls.
const Button = ({ disabled, onClick, children, ...rest }: ButtonProps) => (
  <StyledButton type="button" disabled={disabled} onClick={onClick} {...rest}>
    {children}
  </StyledButton>
)

export default Button
