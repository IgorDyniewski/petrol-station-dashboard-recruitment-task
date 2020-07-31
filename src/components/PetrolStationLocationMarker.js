import React from 'react'
import styled from 'styled-components'

// Styled components
const Main = styled.div`
    width: 200px;
    height: 100px;
    background-color: white;
`

const PetrolStationLocationMarker = (props) => {
    return <Main>{props.petrolStationData.name}</Main>
}

export default PetrolStationLocationMarker
