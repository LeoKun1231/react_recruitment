import styled from 'styled-components'

export const TabsWrapper = styled.div`
  .item {
    box-sizing: border-box;
    flex-basis: 120px;
    flex-shrink: 0;
    padding: 14px 16px;
    margin-right: 16px;
    border-radius: 3px;
    font-size: 17px;
    text-align: center;
    border: 0.5px solid #d8d8d8;
    white-space: nowrap;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #fff;
      background-color: var(--primary-color);
    }
  }
`
