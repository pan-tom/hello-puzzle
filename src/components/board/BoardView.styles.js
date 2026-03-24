import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

const BoardContainer = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  border: solid 1px ${colors.border};
  background: ${colors.white};
`

export { BoardContainer }
