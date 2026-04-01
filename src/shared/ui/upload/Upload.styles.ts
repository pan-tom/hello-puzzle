import styled from 'styled-components'

export const UploadButtonWrapper = styled.div`
  position: relative;

  > input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`
