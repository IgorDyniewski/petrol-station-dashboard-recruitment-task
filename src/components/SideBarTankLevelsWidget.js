import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// Components
import { WidgetTitle } from './SidePanel'
import { CircularProgress } from '@material-ui/core'

// Lib
import { fetchPetrolTanksLevels } from '../lib/data/petrolStationData'

// Styled components
const Main = styled.div`
    position: relative;
    width: 100%;
    /* border: 1px solid red; */
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
    height: 5px;
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
    background-color: ${(props) => (props.level > 50 ? '#65C65D' : props.level > 20 ? '#5093ff' : '#FF5050')};
    animation: ${AnimationLevelBarInner} 800ms;
`
const TankLevelsWrapper = styled.div`
    width: 100%;
    height: 140px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SideBarTankLevelsWidget = (props) => {
    const id = props.id
    // States
    const [tankLevels, setTankLevels] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Did mount
    useEffect(() => {
        // Fetching tank levels
        const fetchTankLevels = async () => {
            setIsLoading(true)
            const tankLevels = await fetchPetrolTanksLevels(id)
            setIsLoading(false)
            setTankLevels(tankLevels)
        }
        fetchTankLevels()
    }, [id])

    return (
        <Main>
            <WidgetTitle>Tank levels</WidgetTitle>
            <TankLevelsWrapper>
                {isLoading ? (
                    <CircularProgress size={30} style={{ color: '#5093ff' }} />
                ) : (
                    <>
                        {tankLevels.map((tankLevel, index) => (
                            <LevelRow key={index}>
                                <LevelText>{tankLevel.type}</LevelText>
                                <LevelBarMain>
                                    <LevelBarInner level={tankLevel.level}>
                                        <LevelBarInnerColor level={tankLevel.level} />
                                    </LevelBarInner>
                                </LevelBarMain>
                            </LevelRow>
                        ))}
                    </>
                )}
            </TankLevelsWrapper>
        </Main>
    )
}

export default SideBarTankLevelsWidget
