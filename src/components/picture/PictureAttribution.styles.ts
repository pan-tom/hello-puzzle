import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

// Shared slot below the board (attribution, fetch errors).
export const PictureMetaArea = styled.div`
  margin: 10px auto 0;
  max-width: 460px;
  min-height: 30px;
  font-size: 12px;
  text-align: center;
  color: ${colors.font};
`

export const AttributionText = styled.p`
  margin: 0;
`

export const AttributionLink = styled.a`
  color: ${colors.black};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${colors.font};
  }
`
