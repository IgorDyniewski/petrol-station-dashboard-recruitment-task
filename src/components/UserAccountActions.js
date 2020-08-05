import React from 'react'
import styled, { keyframes } from 'styled-components'

// Styled components
const Main = styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    height: 170px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 30px;
    box-sizing: border-box;
    pointer-events: none;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`
const fadeInAnimation = keyframes`

    0% {
        transform: translateY(500px);
    }
    100% {
        transform: translateY(0px);
    }
`
const Button = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #5093ff;
    outline: 0;
    border: none;
    background-image: url('${(props) => props.url}');
    background-size: 22px; 
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: -8px 6px 33px -4px rgba(80, 147, 255, 0.4);
    margin-left: 20px;
    cursor: pointer;
    pointer-events: all;
    transition: transform 250ms cubic-bezier(0, 1.8, 0.92, 1.51);
    transform: scale(1) translateY(500px);
    animation: ${fadeInAnimation} 600ms forwards;
    animation-delay: ${(props) => props.start * 100 + 'ms'};
    animation-timing-function: cubic-bezier(0, 1.28, 1, 1);
    /* :hover {
        transform: scale(1.1) translateY(0px);
    } */
`
const LogOutButton = styled(Button)`
    background-color: #ff50a8;
    box-shadow: -8px 6px 33px -4px rgba(255, 80, 168, 0.4);
`
const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    /* border: 1px solid red; */
    pointer-events: all;
    margin-left: 15px;
    margin-right: 15px;
    @media (max-width: 552px) {
        display: none;
    }
    transform: translateY(500px);
    animation: ${fadeInAnimation} 600ms forwards;
    animation-delay: ${(props) => props.start * 100 + 'ms'};
    animation-timing-function: cubic-bezier(0, 1.28, 1, 1);
`
const SubTitle = styled.span`
    color: #5093ff;
    font-size: 13px;
    font-weight: 300;
`
const Title = styled.span`
    color: white;
    font-size: 18px;
    font-weight: 600;
`
const ProfilePhoto = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    outline: 0;
    border: none;
    background-image: url('/profile.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: -8px 6px 33px -4px rgba(80, 147, 255, 0.4);
    margin-left: 20px;
    cursor: pointer;
    pointer-events: all;
    transform: translateY(500px);
    animation: ${fadeInAnimation} 600ms forwards;
    animation-delay: ${(props) => props.start * 200 + 'ms'};
    animation-timing-function: cubic-bezier(0, 1.28, 1, 1);
`

const UserAccountActions = () => {
    return (
        <Main>
            <Content>
                <LogOutButton url={'/icons/logout.svg'} start={5} />
                <Button url={'/icons/menu.svg'} start={4} />
                <Button url={'/icons/account.svg'} start={3} />
                <TextWrapper start={2}>
                    <Title>Martin Bednarczyk</Title>
                    <SubTitle>Manager</SubTitle>
                </TextWrapper>
                <ProfilePhoto start={1} />
            </Content>
        </Main>
    )
}

export default UserAccountActions
