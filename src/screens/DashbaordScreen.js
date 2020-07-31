import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker } from 'react-map-gl'

// Lib
import mapBoxConstants from '../lib/mapBoxConstants'

// Styled components
const Main = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
`
const TestMarker = styled.div`
    width: 200px;
    height: 300px;
    background-color: white;
    :hover {
        background-color: red;
    }
`

const DashboardScreen = (props) => {
    // States
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [widnowHeight, setWindowHeight] = useState(window.innerHeight)

    // Mapbox setup
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    })
    const onViewportChange = (nextViewPort) => {
        setViewport(nextViewPort)
    }

    // Did mount
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        })

        // Will unmount
        return () => {
            window.removeEventListener('window-resize', () => {})
        }
    }, [])

    return (
        <Main>
            <ReactMapGL
                {...viewport}
                width={windowWidth}
                height={widnowHeight}
                onViewportChange={(nextViewport) => onViewportChange(nextViewport)}
                mapStyle={mapBoxConstants.styleUrl}
                mapboxApiAccessToken={mapBoxConstants.mapboxApiAccessToken}
            >
                <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                    <TestMarker>You are here</TestMarker>
                </Marker>
            </ReactMapGL>
        </Main>
    )
}

export default DashboardScreen
