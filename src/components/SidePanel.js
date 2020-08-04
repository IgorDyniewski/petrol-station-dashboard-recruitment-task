import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Redux
import { useSelector } from 'react-redux'

// Styled components
const Main = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    width: 500px;
    height: calc(100vh - 40px);
    background-color: white;
    border-radius: 20px;
    transition: transform 200ms ease-in;
    transform: ${(props) => (props.isOpen ? 'translateX(0px)' : 'translateX(-600px)')};
`

const SidePanel = (props) => {
    // Redux
    const activeNodeState = useSelector((state) => state.activeNodeState)

    // States
    const [isOpen, setIsOpen] = useState(activeNodeState === null ? false : true)

    // Updating data on active node change
    useEffect(() => {
        if (activeNodeState === null) setIsOpen(false)
        else setIsOpen(true)
    }, [activeNodeState])

    return <Main isOpen={isOpen}>{activeNodeState}</Main>
}

export default SidePanel
