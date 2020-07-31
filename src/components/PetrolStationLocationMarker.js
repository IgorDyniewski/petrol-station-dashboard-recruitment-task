import React from 'react'
import styled from 'styled-components'

// Constants
export const markerWidth = 270
export const markerHeight = 150

// Styled components
const Main = styled.div`
    width: ${markerWidth}px;
    height: ${markerHeight}px;
    border-radius: 8px;
    background-color: white;
`

const PetrolStationLocationMarker = (props) => {
    return <Main></Main>
}

export default PetrolStationLocationMarker
