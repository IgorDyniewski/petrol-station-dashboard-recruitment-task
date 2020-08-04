import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Lib
import './index.css'

// Screens
import DashboardScreen from './screens/DashbaordScreen'

// Redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './redux/reducers'
const store = createStore(allReducers)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={DashboardScreen} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.unregister()
