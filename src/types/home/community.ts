import { IBasePage, IBaseResult } from '../base'

export interface ILike {
  commentId?: number
  articleId?: number
  userId: number
}

export interface ITopic {
  id: number
  content: string
  count: number
  createTime: string
}

export interface ITopicData extends IBaseResult {
  data: {
    records: ITopic[]
    totalCount: number
  }
}

export interface ITopicContent {
  content: string
  typeId: number
  title: string
  userId: number
  topicId: number
  majorId: number
}

export interface IArticlePageQuery extends IBasePage {
  title?: string
  topicId?: number
  userId?: number
  typedId?: number
  categoryId?: number
  sortId?: number
  otherId?: number
}

export interface IArticleData extends IBasePage {
  data: IArticle[]
}

export interface IArticle {
  id: number
  watchCount: number
  content: string
  contentPreview: string
  commentCount: number
  title: string
  userId: number
  avatar: string
  nickname: string
  likeCount: number
  isLike: boolean
  topicId: number
  topicContent: string
  createTime: string
  majorName: string
}

export interface ITopicDetail {
  relationCount: number
  watchCount: number
  name: string
  id: number
}

export interface ITopicDetailData extends IBaseResult {
  data: ITopicDetail
}

export interface IArticleSearch {
  id: number
  title: string
}

export interface IArticleSearchData extends IBaseResult {
  data: {
    list: IArticleSearch[]
  }
}

export interface IAddComment {
  content: string
  userId: number
  articleId: number
  parentId: number
  rootId: number
  targetId?: number
}

export interface ICommentListData extends IBaseResult {
  data: {
    list: IComment[]
    totalCount: number
  }
}

export interface IComment {
  id: number
  content: string
  nickname: string
  userId: number
  likeCount: number
  isLike: boolean
  articleId: number
  parentId: number
  target: string
  targetContent: string
  avatar: string
  createTime: string
  commentCount: number
  children?: IComment[]
  rootId: number
}

export interface ICommentRequest extends IBasePage {
  articleId: number
  userId: number
  rootId?: number
}

export interface IFakeComment {
  id: number
  content: string
  nickname: string
  userId: number
  likeCount: number
  isLike: boolean
  articleId: number
  parentId: number
  target: string
  targetContent: string
  avatar: string
  createTime: string
  commentCount: number
  children?: IComment[]
  rootId: number
  isSecond?: boolean
}

export interface IArticleDetailData extends IBaseResult {
  data: {
    data: IArticleDetail
  }
}

export interface IArticleDetail {
  id: number
  content: string
  type: string
  majorId: number
  commentCount: number
  watchCount: number
  title: string
  topicId: number
  userId: number
  createTime: string
  topicContent: string
  avatar: string
  nickname: string
  isLike: boolean
  likeCount: number
}

export interface IArticleRelationData extends IBaseResult {
  data: {
    list: IArticleRelation[]
  }
}

export interface IArticleRelation {
  title: string
  id: number
  watchCount: number
  commentCount: number
}

export interface IReport {
  commentId?: number
  articleId?: number
  reason: string
}
export interface IReportArticleData extends IBaseResult {
  data: {
    records: IReportArticle[]
    totalCount: number
  }
}
export interface IReportCommentData extends IBaseResult {
  data: {
    records: IReportComment[]
    totalCount: number
  }
}

export interface IReportArticle {
  id: number
  watchCount: number
  content: string
  contentPreview: string
  commentCount: number
  title: string
  userId: number
  avatar: string
  nickname: string
  likeCount: number
  isLike: boolean
  topicId: number
  topicContent: string
  createTime: string
  reportCount: number
  reason: string[]
  reportId: number
}

export interface IReportComment {
  id: number
  avatar: string
  comment: string
  nickName: string
  reportCount: number
  reason: string[]
  updateTime: string
}
