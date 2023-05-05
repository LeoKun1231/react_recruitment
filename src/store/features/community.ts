/*
 * @Author: hqk
 * @Date: 2023-03-05 15:44:31
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-24 22:29:54
 * @Description:
 */
import {
  publishArticle,
  getRandomTopicList,
  getArticleList,
  doLike,
  cancelLike,
  cancelRequest,
  getTopicDetail,
  getSearchResult,
  addComment,
  getCommentList,
  getMoreCommentList,
  getArticleDetailById,
  getArticleRelationById,
  addArticleWatchCount,
  deleteArticleById,
  deleteCommentById
} from '@/services'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IAddComment,
  IArticle,
  IArticleDetailData,
  IArticlePageQuery,
  IArticleRelationData,
  IArticleSearch,
  IComment,
  ICommentRequest,
  IFakeComment,
  ILike,
  ITopic,
  ITopicContent,
  ITopicDetail
} from '@/types/home/community'
import { IBasePage } from '@/types/base'
import { cloneDeep } from 'lodash'
import { useAppCreateAsyncThunk } from '@/hooks/useAppRedux'

interface IArticleReturn {
  articleList: IArticle[]
  totalCount: number
}
interface IRandomTopicReturn {
  randomTopicList: ITopic[]
}

interface IRadioSelect {
  categoryId: number
  otherId: number
  typedId: number
}

interface IState extends IBasePage, IRandomTopicReturn {
  articlePageSize: number
  articleCurrentPage: number
  articleTotalCount: number
  articleList: IArticle[]
  isArticleLoading: boolean
  isRandomTopicLoading: boolean
  topicDetail: ITopicDetail
  radios: IRadioSelect
  searchResults: IArticleSearch[]
  commentList: IComment[]
  commentCount: number
  commentPageSize: number
  commentCurrentPage: number
  isCommentLoading: boolean
  isCommentChildrenLoading: boolean
  fakeCount: number
}

export const getRandomTopicListAction = useAppCreateAsyncThunk('community/getRandomTopicList', async (payload, { dispatch }) => {
  dispatch(changeIsRandomTopicLoading(true))
  const res = await getRandomTopicList()
  dispatch(saveRandomTopicListAction({ randomTopicList: res.data.records }))
  dispatch(changeIsRandomTopicLoading(false))
  return res.data.records
})

export const getArticleSearchResultAction = useAppCreateAsyncThunk(
  'community/getArticleSearchResult',
  async (payload: string, { dispatch }) => {
    const res = await getSearchResult(payload)
    dispatch(saveArticleSearchResult(res.data.list))
    return res.data.list
  }
)

export const saveLikeAction = useAppCreateAsyncThunk('community/saveLike', async (payload: ILike) => {
  const res = await doLike(payload)
  return res
})
export const saveCancelLikeAction = useAppCreateAsyncThunk('community/cancelLike', async (payload: ILike) => {
  const res = await cancelLike(payload)
  return res
})

export const getArticleListAction = useAppCreateAsyncThunk(
  'community/getArticleList',
  async (payload: Partial<IArticlePageQuery>, { dispatch, getState }) => {
    cancelRequest('/common/article/list')
    const state = getState()
    dispatch(changeIsArticleLoadingAction(true))
    const res = await getArticleList({
      ...payload,
      currentPage: state.community.articleCurrentPage,
      pageSize: state.community.articlePageSize,
      userId: state.login.loginUser.id
    })

    dispatch(saveArticleAction({ articleList: res.data.records, totalCount: res.data.totalCount }))
    dispatch(changeIsArticleLoadingAction(false))
    return res.data.records
  }
)

export const publishArticleAction = useAppCreateAsyncThunk('community/addArticle', async (payload: ITopicContent) => {
  const res = await publishArticle(payload)
  return res
})

export const getTopicDetailAction = useAppCreateAsyncThunk('community/getTopicDetail', async (payload: number, { dispatch }) => {
  const res = await getTopicDetail(payload)
  dispatch(saveTopicDetailAction(res.data))
  return res.data
})

export const addCommentAction = useAppCreateAsyncThunk('community/addComment', async (payload: IAddComment) => {
  const res = await addComment(payload)
  return res
})

export const getCommentListAction = useAppCreateAsyncThunk(
  'community/getCommentList',
  async (payload: Pick<ICommentRequest, 'articleId' | 'userId'>, { dispatch, getState }): Promise<IComment[]> => {
    dispatch(changeIsCommentLoadingAction(true))
    const state = getState()
    const res = await getCommentList({
      ...payload,
      currentPage: state.community.commentCurrentPage,
      pageSize: state.community.commentPageSize
    })
    const arr = res.data.list
    arr.forEach((item) => {
      if (item.children && item.children.length > 1) {
        item.children.forEach((iten) => {
          const comment = item.children?.find((comment) => comment.id == iten.parentId)
          if (comment?.content) {
            iten.targetContent = comment.content
          }
        })
      }
    })
    dispatch(saveCommentListAction(arr))
    dispatch(saveCommentListCountAction(res.data.totalCount))
    dispatch(changeIsCommentLoadingAction(false))
    return arr
  }
)

export const getMoreCommentAction = useAppCreateAsyncThunk(
  'community/getMoreComment',
  async (payload: Pick<ICommentRequest, 'articleId' | 'rootId' | 'userId'>, { dispatch }) => {
    dispatch(changeIsCommentChildrenLoading(true))
    const res = await getMoreCommentList(payload)
    const arr = res.data.list
    console.log(arr)
    arr.forEach((item) => {
      const comment = arr.find((comment) => comment.id == item.parentId)
      if (comment?.content) {
        item.targetContent = comment.content
      }
    })
    dispatch(changeCommentListAction({ rootId: payload.rootId!, list: arr }))
    dispatch(changeIsCommentChildrenLoading(false))
  }
)

export const getArticleDetailAction = useAppCreateAsyncThunk(
  'community/getArticleDetail',
  async (payload: number): Promise<IArticleDetailData> => {
    const res = await getArticleDetailById(payload)
    return res
  }
)

export const getArticleRelationAction = useAppCreateAsyncThunk(
  'community/getArticleRelation',
  async (payload: number): Promise<IArticleRelationData> => {
    const res = await getArticleRelationById(payload)
    return res
  }
)

export const addWatchCountAction = useAppCreateAsyncThunk('community/addWatchCount', async (payload: number) => {
  await addArticleWatchCount(payload)
})

export const deleteArticleByIdAction = useAppCreateAsyncThunk('common/deleteArticle', async (payload: number, { getState, dispatch }) => {
  const {
    community: { articleList }
  } = getState()
  const res = await deleteArticleById(payload)
  if (res.code == 200) {
    const arr = articleList.filter((item) => item.id != payload)
    dispatch(saveArticleListAction(arr))
  }
  return res
})

export const deleteCommentByIdAction = useAppCreateAsyncThunk('common/deleteComment', async (payload: number, { getState, dispatch }) => {
  const {
    community: { commentList }
  } = getState()

  const res = await deleteCommentById(payload)

  const newArr = cloneDeep(commentList)
  if (res.code == 200) {
    const arr: IComment[] = []
    for (const item of newArr) {
      if (item.id != payload) {
        if (item.children && item.children.length > 0) {
          item.children = item.children.filter((iten: any) => iten.id != payload)
          item.commentCount -= 1
        }
        arr.push(item)
      }
    }
    dispatch(saveCommentListWithoutFakeAction(arr))
    dispatch(saveCommentListCountAction(arr.length))
  }
  return res
})

const initialState = {
  randomTopicList: [],
  articleList: [],
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
  articlePageSize: 10,
  articleCurrentPage: 1,
  articleTotalCount: 0,
  isArticleLoading: true,
  isRandomTopicLoading: true,
  topicDetail: {
    name: '',
    relationCount: 0,
    watchCount: 0,
    id: -1
  },
  radios: {
    categoryId: 0,
    otherId: 0,
    typedId: 0
  },
  searchResults: [],
  commentList: [],
  commentCount: 0,
  commentCurrentPage: 1,
  commentPageSize: 3,
  isCommentLoading: false,
  isCommentChildrenLoading: false,
  fakeCount: 0
} as IState

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    saveRandomTopicListAction(state, { payload }: PayloadAction<IRandomTopicReturn>) {
      state.randomTopicList = payload.randomTopicList
    },
    saveArticleAction(state, { payload }: PayloadAction<IArticleReturn>) {
      if (state.articleCurrentPage == 1) {
        state.articleList = [...payload.articleList]
      } else {
        state.articleList = [...state.articleList, ...payload.articleList]
      }
      state.articleCurrentPage = state.articleCurrentPage + 1
      state.articleTotalCount = payload.totalCount
    },
    resetArticleSearchOptionsAction(state) {
      state.articleList = []
      state.articleCurrentPage = 1
      state.articlePageSize = 10
      state.radios = { categoryId: 0, otherId: 0, typedId: 0 }
    },
    changeIsArticleLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.isArticleLoading = payload
    },
    changeIsRandomTopicLoading(state, { payload }: PayloadAction<boolean>) {
      state.isRandomTopicLoading = payload
    },
    saveTopicDetailAction(state, { payload }: PayloadAction<ITopicDetail>) {
      state.topicDetail = payload
    },
    saveRadioSelectAction(state, { payload }: PayloadAction<IRadioSelect>) {
      state.radios = payload
    },
    saveArticleSearchResult(state, { payload }: PayloadAction<IArticleSearch[]>) {
      state.searchResults = payload
    },
    saveCommentListAction(state, { payload }: PayloadAction<IComment[]>) {
      //重置
      if (payload.length == 0) {
        state.commentList = []
        state.commentCurrentPage = 1
        state.fakeCount = 0
      } else {
        if (state.fakeCount != 0) {
          state.commentList = [...state.commentList.slice(0, state.commentList.length - state.fakeCount), ...payload]
          state.fakeCount = 0
        } else {
          state.commentList = [...state.commentList, ...payload]
        }
        state.commentCurrentPage = state.commentCurrentPage + 1
      }
    },
    saveCommentListCountAction(state, { payload }: PayloadAction<number>) {
      state.commentCount = payload
    },
    resetCommentPage(state) {
      state.commentCurrentPage = 1
      state.commentPageSize = 3
    },
    changeCommentListAction(state, { payload }: PayloadAction<{ rootId: number; list: IComment[] }>) {
      const arr = [...state.commentList]
      arr.forEach((item) => {
        if (item.id == payload.rootId) {
          item.children = payload.list
        }
      })
      state.commentList = arr
    },
    addCommentByNoRefreshAction(state, { payload }: PayloadAction<IFakeComment>) {
      const arr = cloneDeep(state.commentList)
      if (payload.parentId == 0) {
        arr.push(payload)
        state.commentList = arr
        state.commentCount = state.commentCount + 1
        state.fakeCount = state.fakeCount + 1
      }
      console.log(arr, payload.rootId)
      arr.forEach((item) => {
        if (item.id == payload.rootId) {
          console.log(payload.rootId)
          item.children?.push(payload)
          item.commentCount = item.commentCount + 1
        }
      })
      console.log(arr)
      state.commentList = arr
    },
    changeIsCommentLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.isCommentLoading = payload
    },
    changeIsCommentChildrenLoading(state, { payload }: PayloadAction<boolean>) {
      state.isCommentChildrenLoading = payload
    },
    saveArticleListAction(state, { payload }: PayloadAction<IArticle[]>) {
      state.articleList = payload
    },
    saveCommentListWithoutFakeAction(state, { payload }: PayloadAction<IComment[]>) {
      state.commentList = payload
    },
    clearCommunityAction(state) {
      state.randomTopicList = []
      state.articleList = []
      state.currentPage = 1
      state.pageSize = 10
      state.articlePageSize = 10
      state.articleCurrentPage = 1
      state.articleTotalCount = 0
      state.isArticleLoading = true
      state.isRandomTopicLoading = true
      state.topicDetail = {} as ITopicDetail
      state.radios = {
        categoryId: 0,
        otherId: 0,
        typedId: 0
      }
      state.searchResults = []
      state.commentList = []
      state.commentCount = 0
      state.commentCurrentPage = 1
      state.commentPageSize = 3
      state.isCommentLoading = false
      state.isCommentChildrenLoading = false
      state.fakeCount = 0
    }
  }
})

export const {
  saveRandomTopicListAction,
  saveArticleAction,
  resetArticleSearchOptionsAction,
  changeIsArticleLoadingAction,
  changeIsRandomTopicLoading,
  saveTopicDetailAction,
  saveRadioSelectAction,
  saveArticleSearchResult,
  saveCommentListAction,
  saveCommentListCountAction,
  changeCommentListAction,
  addCommentByNoRefreshAction,
  changeIsCommentLoadingAction,
  changeIsCommentChildrenLoading,
  saveArticleListAction,
  saveCommentListWithoutFakeAction,
  clearCommunityAction
} = communitySlice.actions
export default communitySlice.reducer
