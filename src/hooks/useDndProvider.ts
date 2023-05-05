/*
 * @Author: hqk
 * @Date: 2023-03-21 18:57:03
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-07 15:07:28
 * @Description:
 */
import { useCreation } from 'ahooks'
import { useState, useCallback } from 'react'

export const useDndProvider = () => {
  const [dndArea, setDndArea] = useState()
  const handleRef = useCallback((node: any) => setDndArea(node), [])
  const html5Options = useCreation(() => ({ rootElement: dndArea }), [dndArea])
  return { dndArea, handleRef, html5Options }
}
