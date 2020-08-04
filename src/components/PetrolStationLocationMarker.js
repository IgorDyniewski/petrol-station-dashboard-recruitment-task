import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useHistory } from 'react-router-dom'
import { FlyToInterpolator } from 'react-map-gl'

// Lib
import { fetchPetrolTanksLevels } from '../lib/data/petrolStationData'
import mapBoxConstants from '../lib/mapBoxConstants'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Constants
export const markerWidth = 330
export const markerHeight = 100

// Styled components
const Main = styled.div`
    cursor: pointer;
    width: ${markerWidth}px;
    height: ${(props) =>
        props.amountOfRows === 0 ? markerHeight + 'px' : 20 + markerHeight + 20 * props.amountOfRows + 'px'};
    border-radius: 8px;
    background-color: white;
    position: relative;
    box-shadow: -8px 6px 33px -4px rgba(0, 0, 0, 0.32);
    transition: height 200ms ease-in, transform 200ms ease-in;
    transform: ${(props) =>
        props.amountOfRows === 0 ? 'translateY(0px)' : 'translateY(calc(' + props.amountOfRows * -20 + 'px - 20px))'};
`
const Triangle = styled.div`
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid white;
    position: absolute;
    bottom: -11px;
    left: ${markerWidth / 2 - 6}px;
`
const TopContainer = styled.div`
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    /* border: 1px solid red; */
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`
const LogoWrapper = styled.div`
    width: 40px;
    height: 40px;
    background-image: url("${(props) => props.url}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    box-sizing: border-box;
    margin-right: 5px;
`
const TextWrapper = styled.div`
    height: 100%;
    flex: 2;
    /* border: 3px solid pink; */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px;
`
const ButtonsWrapper = styled.div`
    height: 100%;
    box-sizing: border-box;
    /* border: 1px solid black; */
    display: flex;
    align-items: center;
`
const OpenItemButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    outline: 0;
    background-color: #5093ff;
    border: none;
    box-shadow: -8px 6px 33px -4px rgba(80, 147, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover {
        background-color: #447cd8;
    }
    transition: background-color 100ms ease-in;
`
const OpenItemButtonIcon = styled.img`
    width: 12px;
    height: 12px;
`
const RefreshButton = styled.button`
    width: 20px;
    height: 20px;
    background-image: url('/icons/refresh.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: transparent;
    border: none;
    margin-right: 14px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 100ms ease-in;
    :focus {
        outline: 0;
    }
    :hover {
        opacity: 1;
    }
`
const SubTitle = styled.span`
    color: #5093ff;
    font-size: 13px;
    font-weight: 600;
`
const Title = styled.span`
    color: black;
    font-size: 16px;
    font-weight: 600;
`
const FakeProgressWrapper = styled.div`
    pointer-events: none;
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
    border-radius: 8px;
    height: 100%;
    width: 100%;
`
const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
`
const LevelRowAnimation = keyframes`
    0%  {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100%  {
        opacity: 100%;
    }
`
const LevelRow = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    animation: ${LevelRowAnimation} 400ms;
`
const LevelText = styled.span`
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    width: 50px;
    margin-right: 10px;
    display: box;
    word-wrap: nowrap;
    /* border: 1px solid black; */
`
const LevelBarMain = styled.div`
    height: 4px;
    width: 100%;
    background-color: #d9d9d9;
`
const AnimationLevelBarInner = keyframes`
 0%{
     width: 0%;
 }
 100% {
     width: 100%;
 }
`
const LevelBarInner = styled.div`
    height: 100%;
    width: ${(props) => props.level + '%'};
`
const LevelBarInnerColor = styled.div`
    width: 100%;
    height: 100%;
    background-color: #5093ff;
    animation: ${AnimationLevelBarInner} 800ms;
`

const PetrolStationLocationMarker = (props) => {
    const data = props.petrolStationData

    // Redux
    const dispatch = useDispatch()
    const mapViewPortState = useSelector((state) => state.mapViewPortState)

    // React router
    const history = useHistory()

    // Refs
    const nodeRef = useRef(null)

    // States
    const [tankLevels, setTankLevels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [nodeHeight, setNodeHeight] = useState(null)

    // Did mount
    useEffect(() => {
        // Setting node height after it renders
        setNodeHeight(nodeRef.current.clientHeight)

        // Fetching tank levels
        const fetchTankLevels = async () => {
            const tankLevels = await fetchPetrolTanksLevels(data.id)
            setIsLoading(false)
            setTankLevels(tankLevels)
        }
        fetchTankLevels()
        // eslint-disable-next-line
    }, [])

    // On click move to location
    const onNodeClick = () => {
        dispatch({
            type: 'UPDATE_MAP_VIEWPORT_STATE',
            payload: {
                ...mapViewPortState,
                latitude: data.lat,
                longitude: data.lon,
                transitionDuration: mapBoxConstants.animationDuration,
                zoom: mapBoxConstants.activeNodeZoom,
                transitionInterpolator: new FlyToInterpolator(),
            },
        })
        history.push({
            pathname: '/',
            search: `?lat=${data.lat}&lon=${data.lon}&zoom=${9}`,
        })
    }

    return (
        <Main amountOfRows={tankLevels.length} ref={nodeRef} nodeHeight={nodeHeight} onClick={() => onNodeClick()}>
            <TopContainer>
                {isLoading && (
                    <FakeProgressWrapper>
                        <LinearProgress
                            style={{ width: '100%', top: '0px', left: '0px', backgroundColor: '#5093ff' }}
                        />
                    </FakeProgressWrapper>
                )}
                <LogoWrapper url={data.logoUrl} />
                <TextWrapper>
                    <SubTitle>{data.subTitle}</SubTitle>
                    <Title>{data.name}</Title>
                </TextWrapper>
                <ButtonsWrapper>
                    <RefreshButton />
                    <OpenItemButton>
                        <OpenItemButtonIcon src={'/icons/arrow.svg'} alt="arrow icon" />
                    </OpenItemButton>
                </ButtonsWrapper>
            </TopContainer>
            <BottomContainer>
                {tankLevels.map((tankLevel, index) => (
                    <LevelRow key={index}>
                        <LevelText>{tankLevel.type}</LevelText>
                        <LevelBarMain>
                            <LevelBarInner level={tankLevel.level}>
                                <LevelBarInnerColor />
                            </LevelBarInner>
                        </LevelBarMain>
                    </LevelRow>
                ))}
            </BottomContainer>
            <Triangle />
        </Main>
    )
}

export default PetrolStationLocationMarker
