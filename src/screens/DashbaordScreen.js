import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker } from 'react-map-gl'
import { CircularProgress } from '@material-ui/core'

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
const LoadingOverlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    pointer-events: ${(props) => (props.isOpen ? 'all' : 'none')};
`

const DashboardScreen = (props) => {
    // States
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [isLoading, setIsLoading] = useState(true)

    // Mapbox setup
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    })
    const onViewportChange = (nextViewPort) => {
        setViewport(nextViewPort)
    }

    useEffect(() => {
        // Did mount
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
                height={windowHeight}
                onViewportChange={(nextViewport) => onViewportChange(nextViewport)}
                mapStyle={mapBoxConstants.styleUrl}
                mapboxApiAccessToken={mapBoxConstants.mapboxApiAccessToken}
            >
                {/* <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                    <TestMarker>You are here</TestMarker>
                </Marker> */}
            </ReactMapGL>
            <LoadingOverlay isOpen={isLoading}>
                <CircularProgress style={{ color: '#5093FF' }} />
            </LoadingOverlay>
        </Main>
    )
}

export default DashboardScreen
