import * as React from 'react'
import * as DesignSystem from '~/components/designSystem'
import * as Recipes from '~/components/recipes'
import * as Entities from '~/entities'
import { Main } from '~/components/layouts/Main'

type Props = {
    username: Entities.Me['username']
    isGetMe: boolean
    isLoadingProfile: boolean
    isLoadingArticles: boolean
    profile: Entities.Profile
    articles: Entities.Article[]
    selectedTab: 'My Articles' | 'Favorited Articles'
    onClickFollow: () => void
    onClickUnFollow: () => void
    onChangeTab: (tab: 'My Articles' | 'Favorited Articles') => () => void
    onClickFavorite: (slug: Entities.Article['slug']) => () => void
    onClickUnFavorite: (slug: Entities.Article['slug']) => () => void
}

export const Profile = (props: Props) => (
    <Main isGetMe={props.isGetMe} username={props.username}>
        {!props.isLoadingProfile && (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img
                                    src={props.profile.image}
                                    className="user-img"
                                />
                                <h4>{props.profile.username}</h4>
                                <p>{props.profile.bio}</p>
                                {props.profile.following ? (
                                    <Recipes.UnFollowButton
                                        username={props.profile.username}
                                        onClickUnFollow={props.onClickUnFollow}
                                    />
                                ) : (
                                    <Recipes.FollowButton
                                        username={props.profile.username}
                                        onClickFollow={props.onClickFollow}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <DesignSystem.Link
                                            isActive={
                                                props.selectedTab ===
                                                'My Articles'
                                            }
                                            className="nav-link"
                                            href={`/profile/${props.profile.username}`}
                                            onClick={props.onChangeTab(
                                                'My Articles'
                                            )}
                                        >
                                            My Articles
                                        </DesignSystem.Link>
                                    </li>
                                    <li className="nav-item">
                                        <DesignSystem.Link
                                            isActive={
                                                props.selectedTab ===
                                                'Favorited Articles'
                                            }
                                            className="nav-link"
                                            href={`/profile/${props.profile.username}/favorites`}
                                            onClick={props.onChangeTab(
                                                'Favorited Articles'
                                            )}
                                        >
                                            Favorited Articles
                                        </DesignSystem.Link>
                                    </li>
                                </ul>
                            </div>

                            {props.isLoadingArticles ? (
                                <div className="article-preview">
                                    loading...
                                </div>
                            ) : props.articles.length === 0 ? (
                                <div className="article-preview">
                                    No articles are here... yet.
                                </div>
                            ) : (
                                <Recipes.ArticleList
                                    articles={props.articles}
                                    onClickFavorite={props.onClickFavorite}
                                    onClickUnFavorite={props.onClickUnFavorite}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Main>
)
