import * as ReduxToolkit from '@reduxjs/toolkit'
import * as Api from '~/api'
import { reducer } from '~/store/reducer'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const extraArgument = {
    api: {
        me: {
            register: Api.register,
            login: Api.login,
            getMe: Api.getMe,
            updateMe: Api.updateMe
        },
        tag: { getTags: Api.getTags },
        article: {
            getArticles: Api.getArticles,
            getArticlesFeed: Api.getArticlesFeed,
            favorite: Api.favorite,
            unFavorite: Api.unFavorite,
            createArticles: Api.createArticle,
            getArticle: Api.getArticle,
            comments: {
                getComments: Api.getComments,
                addComment: Api.addComment,
                deleteComment: Api.deleteComment
            }
        },
        profile: {
            getProfile: Api.getProfile,
            follow: Api.follow,
            unFollow: Api.unFollow
        }
    }
}

type ExtraArgument = typeof extraArgument

export type AsyncThunkConfig<T = unknown> = {
    state: RootState
    dispatch: AppDispatch
    extra: ExtraArgument
    rejectValue: T
}

export const store = ReduxToolkit.configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ thunk: { extraArgument } })
})
