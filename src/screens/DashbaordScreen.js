import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMapGL, { Marker } from 'react-map-gl'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'

// Lib
import mapBoxConstants from '../lib/mapBoxConstants'
import { fetchPetrolStationsLocations } from '../lib/data/petrolStationData'
import { markerHeight, markerWidth } from '../components/PetrolStationLocationMarker'

// Components
import PetrolStationLocationMarker from '../components/PetrolStationLocationMarker'
import SidePanel from '../components/SidePanel'

// Redux
import { useSelector, useDispatch } from 'react-redux'

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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth + 520)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [isLoading, setIsLoading] = useState(true)
    const [petrolStationsLocations, setPetrolStationsLocations] = useState([])

    // Redux
    const mapViewPortState = useSelector((state) => state.mapViewPortState)

    const dispatch = useDispatch()

    // React router
    const history = useHistory()

    // Parsing query params
    const { lat, lon, zoom } = queryString.parse(props.location.search)

    // Map box setup
    const onViewportChange = (nextViewPort) => {
        // Updating map state
        dispatch({
            type: 'UPDATE_MAP_VIEWPORT_STATE',
            payload: { ...nextViewPort },
        })

        // Closing side panel
        dispatch({
            type: 'UPDATE_ACTIVE_NODE_STATE',
            payload: null,
            // payload: 0,
        })

        // Updating location
        history.push({
            pathname: '/',
            search: `?lat=${nextViewPort.latitude}&lon=${nextViewPort.longitude}&zoom=${nextViewPort.zoom}`,
        })
    }

    useEffect(() => {
        // Did mount
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth + 520)
            setWindowHeight(window.innerHeight)
        })

        // Setting proper location from query params
        dispatch({
            type: 'UPDATE_MAP_VIEWPORT_STATE',
            payload: {
                latitude: parseFloat(lat) ? parseFloat(lat) : parseFloat(mapBoxConstants.defaultLatitude),
                longitude: parseFloat(lon) ? parseFloat(lon) : parseFloat(mapBoxConstants.defaultLongitude),
                zoom: parseFloat(zoom) ? parseFloat(zoom) : parseFloat(mapBoxConstants.defaultZoom),
            },
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
        // eslint-disable-next-line
    }, [])

    return (
        <Main>
            <ReactMapGL
                {...mapViewPortState}
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
                            offsetLeft={-markerWidth / 2}
                            offsetTop={-markerHeight - 12}
                            key={key}
                        >
                            <PetrolStationLocationMarker petrolStationData={station} />
                        </Marker>
                    ))}
            </ReactMapGL>
            <LoadingOverlay isOpen={isLoading}>
                <CircularProgress style={{ color: 'white' }} />
            </LoadingOverlay>
            <SidePanel />
            50
        </Main>
    )
}

export default DashboardScreen
