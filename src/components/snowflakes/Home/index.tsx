import * as React from 'react'
import * as DesignSystem from '~/components/designSystem'
import * as Recipes from '~/components/recipes'
import * as Entities from '~/entities'
import * as Libs from '~/libs'
import { Main } from '~/components/layouts/Main'

type Props = {
    isGetMe: boolean
    isLoadingArticles: boolean
    isLoadingTags: boolean
    tags: Entities.Tag[]
    articles: Entities.Article[]
    selectedTab: string
    hashTag: Entities.Tag | undefined
    onChangeTab: (tab: string) => () => void
    onClickFavorite: (slug: Entities.Article['slug']) => () => void
    onClickUnFavorite: (slug: Entities.Article['slug']) => () => void
    onClickTag: (tag: Entities.Tag) => () => void
}

export const Home = (props: Props) => (
    <Main isGetMe={props.isGetMe}>
        <div className="home-page">
            {!props.isGetMe && (
                <DesignSystem.Banner>
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </DesignSystem.Banner>
            )}

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {props.isGetMe && (
                                    <>
                                        <li className="nav-item">
                                            <DesignSystem.Link
                                                className="nav-link"
                                                href="/"
                                                isActive={
                                                    props.selectedTab ===
                                                    'Your Feed'
                                                }
                                                onClick={props.onChangeTab(
                                                    'Your Feed'
                                                )}
                                            >
                                                Your Feed
                                            </DesignSystem.Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <DesignSystem.Link
                                        className="nav-link"
                                        isActive={
                                            props.selectedTab === 'Global Feed'
                                        }
                                        href="/"
                                        onClick={props.onChangeTab(
                                            'Global Feed'
                                        )}
                                    >
                                        Global Feed
                                    </DesignSystem.Link>
                                </li>
                                {props.hashTag && (
                                    <li className="nav-item">
                                        <DesignSystem.Link
                                            className="nav-link"
                                            isActive={
                                                props.selectedTab ===
                                                props.hashTag
                                            }
                                            href="/"
                                            onClick={props.onChangeTab(
                                                'global'
                                            )}
                                        >
                                            <i className="ion-pound"></i>{' '}
                                            {props.hashTag}
                                        </DesignSystem.Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {props.isLoadingArticles ? (
                            <div className="article-preview">loading...</div>
                        ) : props.articles.length === 0 ? (
                            <div className="article-preview">
                                No articles are here... yet.
                            </div>
                        ) : (
                            props.articles.map(article => (
                                <div
                                    className="article-preview"
                                    key={article.slug}
                                >
                                    <div className="article-meta">
                                        <DesignSystem.Link
                                            href={`/profile/${article.author.username}`}
                                        >
                                            <img
                                                src={article.author.image}
                                                alt=""
                                            />
                                        </DesignSystem.Link>
                                        <div className="info">
                                            <DesignSystem.Link
                                                href={`/profile/${article.author.username}`}
                                                className="author"
                                            >
                                                {article.author.username}
                                            </DesignSystem.Link>
                                            <span className="date">
                                                {Libs.formatForArticle(
                                                    article.createdAt
                                                )}
                                            </span>
                                        </div>
                                        {article.favorited ? (
                                            <DesignSystem.Button
                                                size="sm"
                                                variant="primary"
                                                className="pull-xs-right"
                                                onClick={props.onClickUnFavorite(
                                                    article.slug
                                                )}
                                            >
                                                <i className="ion-heart"></i>{' '}
                                                {article.favoritesCount}
                                            </DesignSystem.Button>
                                        ) : (
                                            <DesignSystem.Button
                                                size="sm"
                                                variant="outline-primary"
                                                className="pull-xs-right"
                                                onClick={props.onClickFavorite(
                                                    article.slug
                                                )}
                                            >
                                                <i className="ion-heart"></i>{' '}
                                                {article.favoritesCount}
                                            </DesignSystem.Button>
                                        )}
                                    </div>
                                    <DesignSystem.Link
                                        href=""
                                        className="preview-link"
                                    >
                                        <h1>{article.title}</h1>
                                        <p>{article.description}</p>
                                        <span>Read more...</span>
                                        <ul className="tag-list">
                                            {article.tagList.map((tag, i) => (
                                                <li
                                                    className="tag-default tag-pill tag-outline"
                                                    key={i}
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </DesignSystem.Link>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            {props.isLoadingTags ? (
                                'Loading tags...'
                            ) : (
                                <div className="tag-list">
                                    {props.tags.map((tag, i) => (
                                        <DesignSystem.Tag
                                            href="/"
                                            onClick={props.onClickTag(tag)}
                                            key={i}
                                        >
                                            {tag}
                                        </DesignSystem.Tag>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Main>
)
