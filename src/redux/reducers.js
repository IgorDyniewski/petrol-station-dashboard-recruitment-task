import { combineReducers } from 'redux'

import mapViewPortState from './reducers/mapViewPortState'
import activeNodeState from './reducers/activeNodeState'

const allReducers = combineReducers({
    mapViewPortState: mapViewPortState,
    activeNodeState: activeNodeState,
})

export default allReducers
