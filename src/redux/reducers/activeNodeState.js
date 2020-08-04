export default function (state = null, action) {
    switch (action.type) {
        case 'UPDATE_ACTIVE_NODE_STATE':
            return action.payload
        // break
        default:
            return state
    }
}
