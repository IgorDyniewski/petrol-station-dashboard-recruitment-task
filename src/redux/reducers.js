import { combineReducers } from 'redux'

import mapViewPortState from './reducers/mapViewPortState'

const allReducers = combineReducers({
    mapViewPortState: mapViewPortState,
})

export default allReducers
