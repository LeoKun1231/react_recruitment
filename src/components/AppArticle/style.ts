import styled from 'styled-components'

export const AppArticleWrapper = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #efefef;
  .title {
    width: 850px;
  }
  .content {
    width: 850px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
  }
`
