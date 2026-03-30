import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

export const BoardContainer = styled.section`
  position: relative;
  margin: 0 auto;
  border: solid 1px ${colors.border};
  background: ${colors.white};
  width: ${props => props.$tileSize * props.$cols}px;
  height: ${props => props.$tileSize * props.$rows}px;
`
