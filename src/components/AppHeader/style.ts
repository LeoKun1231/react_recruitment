import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 60px;
  position: fixed;
  box-shadow: 0 0 1px 1px rgb(34 45 57 / 15%);
  background-color: #fff;
  overflow: hidden;
  z-index: 999;
  .navbar {
    display: flex;
    width: calc(100% - 148px - 138px);
    justify-content: center;
    align-items: center;
    .ant-tabs,
    .ant-tabs-nav {
      height: 100%;
    }

    .ant-tabs-nav {
      border-bottom: none;
    }
    .ant-tabs-tab {
      padding: 12px 20px;
    }
  }
`
