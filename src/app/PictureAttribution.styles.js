import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

const Attribution = styled.p`
  margin: 8px auto 0;
  max-width: 460px;
  font-size: 12px;
  text-align: center;
  color: ${colors.font};
`

const AttributionLink = styled.a`
  color: ${colors.black};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${colors.font};
  }
`

export { Attribution, AttributionLink }
