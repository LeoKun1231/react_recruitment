/*
 * @Author: hqk
 * @Date: 2023-02-26 16:01:53
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-08 20:12:31
 * @Description:
 */
export function getErrorMessage(res: any) {
  if (res.code == 500 || res.code == 20000) {
    return res.message ?? res.data
  }
}

export default function checkError(res: any): boolean {
  return res.code == 500 || res.code == 20000 || !res.success
}
