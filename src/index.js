import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Lib
import './index.css'

// Screens
import DashboardScreen from './screens/DashbaordScreen'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={DashboardScreen} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.unregister()
