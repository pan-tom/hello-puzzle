import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

type BoardContainerTransientProps = {
  $tileSize: number
  $cols: number
  $rows: number
}

export const BoardContainer = styled.section<BoardContainerTransientProps>`
  position: relative;
  margin: 0 auto;
  border: solid 1px ${colors.border};
  background: ${colors.white};
  width: ${props => props.$tileSize * props.$cols}px;
  height: ${props => props.$tileSize * props.$rows}px;
`
