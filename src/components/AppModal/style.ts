import styled from 'styled-components'

export const AppModalWrapper = styled.div`
  position: relative;
  &:hover > .mask {
    display: block;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    & > span {
      font-size: 22px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  }

  .mask {
    display: none;
  }
`
