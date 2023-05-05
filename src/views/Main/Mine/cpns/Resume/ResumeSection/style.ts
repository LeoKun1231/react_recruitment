import styled from 'styled-components'

export const ResumeSectionWrapper = styled.div`
  .arrow {
    &::after {
      content: '';
      position: absolute;
      left: 6px;
      bottom: -16px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 22px 11px;
      border-color: transparent transparent var(--resume-color);
      -webkit-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      transform: rotate(-90deg);
    }
  }
`
