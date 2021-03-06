import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import { Home } from '~/pages/Home'
import { Register } from '~/pages/Register'
import { Login } from '~/pages/Login'
import { Setting } from '~/pages/Setting'
import { Profile } from '~/pages/Profile'
import { Editor } from '~/pages/Editor'
import { Article } from '~/pages/Article'
import { AuthRoute } from '~/routes/AuthRoute'

export const Route = () => (
    <ReactRouter.HashRouter>
        <AuthRoute>
            <ReactRouter.Switch>
                <ReactRouter.Route path="/article/:slug" component={Article} />
                <ReactRouter.Route
                    path="/profile/:username"
                    component={Profile}
                />
                <ReactRouter.Route path="/editor" component={Editor} />
                <ReactRouter.Route path="/settings" component={Setting} />
                <ReactRouter.Route path="/register" component={Register} />
                <ReactRouter.Route path="/login" component={Login} />
                <ReactRouter.Route exact path="/" component={Home} />
            </ReactRouter.Switch>
        </AuthRoute>
    </ReactRouter.HashRouter>
)
