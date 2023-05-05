/*
 * @Author: hqk
 * @Date: 2023-03-06 16:35:09
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-06 16:35:57
 * @Description:
 */
function styleStrToObject(styleStr: string) {
  const obj = {} as any
  const s = styleStr
    .toLowerCase()
    .replace(/-(.)/g, function (m, g) {
      return g.toUpperCase()
    })
    .replace(/;\s?$/g, '')
    .split(/:|;/g)
  for (let i = 0; i < s.length; i += 2) {
    obj[s[i].replace(/\s/g, '')] = s[i + 1].replace(/^\s+|\s+$/g, '')
  }

  return obj
}

export default styleStrToObject
