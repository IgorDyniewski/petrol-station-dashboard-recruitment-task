import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Components
import { WidgetTitle, TitleWrapper, RefreshButton } from './SidePanel'
import { CircularProgress } from '@material-ui/core'
import { Line } from 'react-chartjs-2'

// Lub
import { fetchPrices } from '../lib/data/petrolStationData'

// Styled components
const Main = styled.div`
    position: relative;
    width: 100%;
    /* border: 1px solid red; */
`
const Wrapper = styled.div`
    width: 100%;
    margin-top: 20px;
    height: 300px;
    /* border: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SideBarLivePricesWidget = (props) => {
    const id = props.id

    // States
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({})

    // Fetching price data
    const fetchAndUpdatePrices = async () => {
        setIsLoading(true)
        const data = await fetchPrices(id)
        setData(data)
        setIsLoading(false)
    }

    // Did mount
    useEffect(() => {
        fetchAndUpdatePrices()
        // eslint-disable-next-line
    }, [id])

    return (
        <Main>
            <TitleWrapper>
                <WidgetTitle>Live price</WidgetTitle>
                <RefreshButton onClick={() => fetchAndUpdatePrices()} />
            </TitleWrapper>
            <Wrapper>
                {isLoading ? (
                    <CircularProgress size={30} style={{ color: '#5093ff' }} />
                ) : (
                    <>
                        <Line data={data} options={{ maintainAspectRatio: false }} />
                    </>
                )}
            </Wrapper>
        </Main>
    )
}

export default SideBarLivePricesWidget
