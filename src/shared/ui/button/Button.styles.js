import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

const buttonHoverBackground = '#f3f4f6'
const buttonHoverText = '#0f172a'

const StyledButton = styled.button`
  display: block;
  margin: 15px auto;
  padding: 10px 20px;
  min-width: 160px;
  background: ${colors.white};
  border: solid 1px ${colors.border};
  outline: none;
  cursor: pointer;
  user-select: none;
  color: ${colors.black};
  transition:
    opacity 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;

  &:hover:enabled {
    background-color: ${buttonHoverBackground};
    border-color: ${buttonHoverText};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export { StyledButton }
