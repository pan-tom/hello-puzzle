import { createGlobalStyle } from 'styled-components'
import { colors } from './tokens'

const AppGlobalStyle = createGlobalStyle`
  body {
    margin: 15px 0;
    padding: 0;
    font-family: Verdana, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${colors.bg};
    color: ${colors.font};
  }
`

export default AppGlobalStyle
