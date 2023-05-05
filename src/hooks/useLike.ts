/*
 * @Author: hqk
 * @Date: 2023-03-13 13:50:09
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-04 14:21:58
 * @Description:
 */
import { useEffect, useState } from 'react'
import { IArticle, IArticleDetail, IComment } from '@/types/home/community'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { saveCancelLikeAction, saveLikeAction } from '@/store/features/community'

export default function useLike(item: IArticle | IComment | IArticleDetail, isArticle: boolean, userId: number) {
  const [isLike, setIsLike] = useState(item.isLike)

  const [likeCount, setLikeCount] = useState(item.likeCount)

  useEffect(() => {
    setIsLike(item.isLike)
    setLikeCount(item.likeCount)
  }, [item])

  const dispatch = useAppDispatch()
  const handleLike = useMemoizedFn(async (e: any, item: IArticle | IComment | IArticleDetail) => {
    e.stopPropagation()
    if (isLike) {
      const res = await dispatch(saveCancelLikeAction({ [isArticle ? 'articleId' : 'commentId']: item.id, userId })).unwrap()
      if (res.code == 200) {
        setIsLike(false)
        setLikeCount((c) => c - 1)
      }
    } else {
      const res = await dispatch(saveLikeAction({ [isArticle ? 'articleId' : 'commentId']: item.id, userId })).unwrap()
      if (res.code == 200) {
        setIsLike(true)
        setLikeCount((c) => c + 1)
      }
    }
  })

  return {
    likeCount,
    isLike,
    handleLike
  }
}
