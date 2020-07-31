import React from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'

// Constants
export const markerWidth = 330
export const markerHeight = 140

// Styled components
const Main = styled.div`
    width: ${markerWidth}px;
    /* height: ${markerHeight}px; */
    border-radius: 8px;
    background-color: white;
    position: relative;
    box-shadow: -8px 6px 33px -4px rgba(0, 0, 0, 0.32);
    overflow: hidden;
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

const PetrolStationLocationMarker = (props) => {
    const data = props.petrolStationData
    return (
        <Main>
            <TopContainer>
                <LinearProgress
                    style={{ width: '100%', position: 'absolute', top: '0px', left: '0px', color: '#5093ff' }}
                />
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
            <Triangle />
        </Main>
    )
}

export default PetrolStationLocationMarker
