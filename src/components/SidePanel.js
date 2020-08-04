import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Lib
import { availablePetrolStations } from '../lib/data/petrolStationData'

// Redux
import { useSelector, useDispatch } from 'react-redux'

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
    overflow: hidden;
`
const HeaderWrapper = styled.div`
    width: 100%;
    position: absolute;
    /* border: 1px solid red; */
    padding: 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
`
const SubTitle = styled.span`
    color: #5093ff;
    font-size: 16px;
    font-weight: 600;
`
const Title = styled.span`
    color: black;
    font-size: 20px;
    font-weight: 600;
`
const LogoWrapper = styled.div`
    width: 60px;
    height: 60px;
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
        </Main>
    )
}

export default SidePanel
