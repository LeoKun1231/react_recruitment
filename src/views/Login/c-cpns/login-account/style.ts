/*
 * @Author: hqk
 * @Date: 2023-02-24 15:34:59
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-25 13:33:20
 * @Description:
 */
import styled from 'styled-components'

export const AccountWrapper = styled.div`
  margin-top: 20px;

  .ant-input-password {
    height: 50px;
  }
  .ant-input:not([id='normal_login_password']) {
    height: 50px;
  }
  .ant-checkbox {
    width: 14px;
    height: 14px;
  }
`
