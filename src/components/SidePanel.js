import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Components / Widgets
import TankLevels from './SideBarTankLevelsWidget'
import LivePrices from './SideBarLivePricesWidget'

// Lib
import { availablePetrolStations } from '../lib/data/petrolStationData'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Exports for media tags
export const mobileScreenWidth = 1020

// Styled components
const Main = styled.div`
    position: fixed;
    top: 40px;
    left: 40px;
    width: 540px;
    height: calc(100vh - 80px);
    background-color: white;
    border-radius: 12px;
    transition: transform 200ms ease-in;
    transform: ${(props) => (props.isOpen ? 'translateX(0px)' : 'translateX(-600px)')};
    box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
    overflow: hidden;
    z-index: 10;

    @media (max-width: ${mobileScreenWidth}px) {
        width: 100vw;
        left: 0px;
        top: auto;
        bottom: 0px;
        height: calc(100vh - 80px);
        border-radius: 0px;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        transition: transform 400ms ease-in;
        transform: ${(props) => (props.isOpen ? 'translateY(0px)' : 'translateY(100vh)')};
    }
`
const HeaderWrapper = styled.div`
    width: 100%;
    position: absolute;
    /* border: 1px solid red; */
    padding: 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    @media (max-width: 650px) {
        padding: 16px;
    }
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid #ebebeb;

    /* Might use later */
    /* @supports (backdrop-filter: blur(20px)) {
        background-color: transparent;
        backdrop-filter: blur(15px) brightness(95%);
    } */
`
const SubTitle = styled.span`
    color: #5093ff;
    font-size: 16px;
    font-weight: 600;
    @media (max-width: 650px) {
        font-size: 13px;
    }
`
const Title = styled.span`
    color: black;
    font-size: 20px;
    font-weight: 600;
    @media (max-width: 650px) {
        font-size: 16px;
    }
`
const LogoWrapper = styled.div`
    width: 50px;
    height: 50px;
    background-image: url("${(props) => props.url}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    box-sizing: border-box;
    margin-right: 10px;
    @media (max-width: 650px) {
        width: 40px;
        height: 40px;
    }
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
const CloseButton = styled.div`
    width: 60px;
    height: 60px;
    /* border: 1px solid pink; */
    background-image: url('/icons/close.svg');
    background-position: center;
    background-size: contain 0.6;
    background-repeat: no-repeat;
    opacity: 0.2;
    transition: opacity 200ms ease-in;
    cursor: pointer;
    :hover {
        opacity: 0.5;
    }
`
const ContentWrapper = styled.div`
    width: 100%;
    /* border: 2px solid black; */
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-left: 25px;
    padding-right: 25px;
    box-sizing: border-box;
`

// Components for widgets
export const WidgetTitle = styled.span`
    color: black;
    font-size: 20px;
    font-weight: 600;
    margin-top: 15px;
    position: relative;
    display: block;
    @media (max-width: 650px) {
        font-size: 16px;
    }
`

const SidePanel = (props) => {
    // Redux
    const activeNodeState = useSelector((state) => state.activeNodeState)
    const dispatch = useDispatch()

    // States
    const [isOpen, setIsOpen] = useState(activeNodeState === null ? false : true)
    const [petrolStationData, setPetrolStationData] = useState(availablePetrolStations[0])

    // Updating data on active node change
    useEffect(() => {
        if (activeNodeState === null) {
            setIsOpen(false)
            return
        }

        // Setting up side panel
        setIsOpen(true)
        setPetrolStationData(availablePetrolStations[activeNodeState])

        // eslint-disable-next-line
    }, [activeNodeState])

    // Closing panel
    const onClosePanel = () => {
        setIsOpen(false)
        // Updating redux data
        dispatch({
            type: 'UPDATE_ACTIVE_NODE_STATE',
            payload: null,
        })
    }

    return (
        <Main isOpen={isOpen}>
            <HeaderWrapper>
                <LogoWrapper url={petrolStationData.logoUrl} />
                <TextWrapper>
                    <Title>{petrolStationData.name}</Title>
                    <SubTitle>{petrolStationData.subTitle}</SubTitle>
                </TextWrapper>
                <CloseButton onClick={() => onClosePanel()} />
            </HeaderWrapper>
            <ContentWrapper>
                <div style={{ height: '110px' }} />
                <TankLevels id={petrolStationData.id} />
                <LivePrices id={petrolStationData.id} />
            </ContentWrapper>
        </Main>
    )
}

export default SidePanel
