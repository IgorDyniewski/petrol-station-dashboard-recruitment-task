import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker } from 'react-map-gl'
import { CircularProgress } from '@material-ui/core'

// Lib
import mapBoxConstants from '../lib/mapBoxConstants'
import { fetchPetrolStationsLocations } from '../lib/data/petrolStationData'

// Components
import PetrolStationLocationMarker from '../components/PetrolStationLocationMarker'

// Styled components
const Main = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
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
    transition: opacity 300ms ease-in;
`

const DashboardScreen = (props) => {
    // States
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [isLoading, setIsLoading] = useState(true)
    const [petrolStationsLocations, setPetrolStationsLocations] = useState([])

    // Mapbox setup
    const [viewport, setViewport] = useState({
        latitude: 29.76102,
        longitude: -95.362778,
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

        // Fetching data
        const fetchInItData = async () => {
            const data = await fetchPetrolStationsLocations()
            setPetrolStationsLocations(data)
            setIsLoading(false)
        }
        fetchInItData()

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
                {petrolStationsLocations.length > 0 &&
                    petrolStationsLocations.map((station, key) => (
                        <Marker
                            latitude={station.lat}
                            longitude={station.lon}
                            offsetLeft={-20}
                            offsetTop={-10}
                            key={key}
                        >
                            <PetrolStationLocationMarker petrolStationData={station} />
                        </Marker>
                    ))}
            </ReactMapGL>
            <LoadingOverlay isOpen={isLoading}>
                <CircularProgress style={{ color: 'white' }} />
            </LoadingOverlay>
        </Main>
    )
}

export default DashboardScreen
