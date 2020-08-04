export function updateMapViewPortState(nextViewport) {
    return {
        type: 'UPDATE_MAP_VIEWPORT_STATE',
        payload: nextViewport,
    }
}
