import styled from 'styled-components'
import { colors } from '@/shared/styles/tokens'

export const Header = styled.header`
  width: 100%;
  max-width: 520px;
  padding: 0 16px 14px;
  margin-bottom: 14px;
  text-align: center;
`

export const Title = styled.h1`
  margin: 0;
  font-family: 'Fredoka', Verdana, sans-serif;
  font-weight: 600;
  font-size: clamp(1.65rem, 4.2vw, 2.2rem);
  letter-spacing: 0.03em;
  color: ${colors.black};
  line-height: 1.1;
`

export const Subtitle = styled.p`
  margin: 8px 0 0;
  font-family: 'Fredoka', Verdana, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${colors.font};
`
