export function updateMapViewPortState(nextViewport) {
    return {
        type: 'UPDATE_MAP_VIEWPORT_STATE',
        payload: nextViewport,
    }
}
export function updateActiveNode(nodeId) {
    return {
        type: 'UPDATE_ACTIVE_NODE_ID',
        payload: nodeId,
    }
}
