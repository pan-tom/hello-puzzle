import styled, { css } from 'styled-components'
import { colors } from '@/shared/styles/tokens'

export const TileButton = styled.button`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: default;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  transition:
    opacity 0.5s ease-out,
    top 0.25s ease-out,
    left 0.25s ease-out;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible:enabled {
    outline: 2px solid ${colors.focusRing};
    outline-offset: 2px;
    z-index: 4;
  }

  &:hover,
  &:focus,
  &:active {
    background: none;
  }

  ${props =>
    props.$isActive &&
    css`
      cursor: pointer;
      z-index: 2;

      &:hover,
      &:active {
        z-index: 3;
      }
    `}
`

export const TileImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
  transition: opacity 0.5s ease-out;
  user-select: none;

  ${props =>
    props.$isHidden &&
    css`
      opacity: 0;
    `}
`
