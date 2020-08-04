// Lib
import mapBoxConstants from '../../lib/mapBoxConstants'

export default function (
    state = {
        latitude: parseFloat(mapBoxConstants.defaultLatitude),
        longitude: parseFloat(mapBoxConstants.defaultLongitude),
        zoom: 9,
    },
    action
) {
    switch (action.type) {
        case 'UPDATE_MAP_VIEWPORT_STATE':
            return action.payload
        // break
        default:
            return state
    }
}
