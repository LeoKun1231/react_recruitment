import appRequest from '@/services'
import { IBasePage } from '@/types/base'
import {
  IAddComment,
  IArticleDetailData,
  IArticlePageQuery,
  IArticleRelationData,
  IArticleSearchData,
  ICommentListData,
  ICommentRequest,
  ILike,
  IReport,
  ITopicContent,
  ITopicData,
  ITopicDetailData
} from '@/types/home/community'

/**
 *获取点赞数以及是否点赞
 * @param data
 * @returns
 */
export function getLikeCountAndIsLike(data: ILike) {
  return appRequest.post({
    url: '/common/like/detail',
    data
  })
}

/**
 *  点赞
 * @param data
 * @returns
 */
export function doLike(data: ILike) {
  return appRequest.post({
    url: `/common/${data.articleId ? 'article' : 'comment'}/like/do`,
    data
  })
}

/**
 *取消点赞
 * @param data
 * @returns
 */
export function cancelLike(data: ILike) {
  return appRequest.post({
    url: `/common/${data.articleId ? 'article' : 'comment'}/like/cancel`,
    data
  })
}

/**
 *获取点菜数以及是否点踩
 * @param data
 * @returns
 */
export function getDisLikeCountAndIsDisLike(data: ILike) {
  return appRequest.post({
    url: '/common/dislike/detail',
    data
  })
}

/**
 *  点赞
 * @param data
 * @returns
 */
export function doDisLike(data: ILike) {
  return appRequest.post({
    url: '/common/dislike/do',
    data
  })
}

/**
 *取消点赞
 * @param data
 * @returns
 */
export function cancelDisLike(data: ILike) {
  return appRequest.post({
    url: '/common/dislike/cancel',
    data
  })
}

/**
 * @description: 获取话题列表
 * @param {IBasePage} data
 * @return {*}
 */
export function getTopicList(data: IBasePage) {
  return appRequest.post<ITopicData>({
    url: '/common/topic/list',
    data,
    isHidnLoading: true
  })
}
/**
 * @description: 随机获取十条话题
 * @param
 * @return {*}
 */
export function getRandomTopicList() {
  return appRequest.get<ITopicData>({
    url: '/common/topic/randomList',
    isHidnLoading: true
  })
}

/**
 * @description: 添加文章
 * @param {ITopicContent} data
 * @return {*}
 */
export function publishArticle(data: ITopicContent) {
  return appRequest.post({
    url: '/common/article/add',
    data
  })
}

/**
 * @description:获取文章列表
 * @param {IArticlePageQuery} data
 * @return {*}
 */
export function getArticleList(data: IArticlePageQuery) {
  return appRequest.post({
    url: '/common/article/list',
    data,
    isHidnLoading: true
  })
}

export function getTopicDetail(id: number) {
  return appRequest.get<ITopicDetailData>({
    url: `/common/topic/detail/${id}`
  })
}

export function getSearchResult(title: string) {
  return appRequest.post<IArticleSearchData>({
    url: '/common/article/search',
    data: {
      title
    },
    isHidnLoading: true
  })
}

/**
 * @description: 添加评论
 * @param {IAddComment} data
 * @return {*}
 */
export function addComment(data: IAddComment) {
  return appRequest.post({
    url: '/common/comment/add',
    data
  })
}

/**
 * @description: 获取评论列表
 * @param {ICommentRequest} data
 * @return {*}
 */
export function getCommentList(data: ICommentRequest) {
  return appRequest.post<ICommentListData>({
    url: '/common/comment/list',
    data,
    isHidnLoading: true
  })
}

/**
 * 获取更多评论
 */
export function getMoreCommentList(data: Pick<ICommentRequest, 'articleId' | 'rootId' | 'userId'>) {
  return appRequest.post<ICommentListData>({
    url: '/common/comment/children',
    data,
    isHidnLoading: true
  })
}

/**
 * @description:获取文章
 * @param {number} id
 * @return {*}
 */
export function getArticleDetailById(id: number) {
  return appRequest.get<IArticleDetailData>({
    url: `/common/article/detail/${id}`,
    isHidnLoading: true
  })
}

/**
 * @description:获取相关文章
 * @param {number} id
 * @return {*}
 */
export function getArticleRelationById(id: number) {
  return appRequest.get<IArticleRelationData>({
    url: `/common/article/reationList/${id}`,
    isHidnLoading: true
  })
}

/**
 * @description:增加文章浏览量
 * @param {number} id
 * @return {*}
 */
export function addArticleWatchCount(id: number) {
  return appRequest.get({
    url: `/common/article/addWatchCount/${id}`,
    isHidnLoading: true
  })
}

export function deleteArticleById(id: number) {
  return appRequest.delete({
    url: `/common/article/delete/${id}`,
    isHidnLoading: true
  })
}

export function deleteCommentById(id: number) {
  return appRequest.delete({
    url: `/common/comment/delete/${id}`,
    isHidnLoading: true
  })
}
