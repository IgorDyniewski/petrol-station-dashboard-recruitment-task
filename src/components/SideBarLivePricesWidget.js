import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Components
import { WidgetTitle } from './SidePanel'
import { CircularProgress } from '@material-ui/core'
import { Line } from 'react-chartjs-2'

// Lub
import { fetchPrices } from '../lib/data/petrolStationData'

const exData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
}

// Styled components
const Main = styled.div`
    position: relative;
    width: 100%;
    /* border: 1px solid red; */
`
const Wrapper = styled.div`
    width: 100%;
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
    const [data, setData] = useState({ ...exData })

    // Did mount
    useEffect(() => {
        // Fetching price data
        const fetchAndUpdatePrices = async () => {
            const data = await fetchPrices(id)
            setData(data)
            setIsLoading(false)
        }
        fetchAndUpdatePrices()
        // eslint-disable-next-line
    }, [])

    return (
        <Main>
            <WidgetTitle>Live prices</WidgetTitle>
            <Wrapper>
                {isLoading ? (
                    <CircularProgress size={30} style={{ color: '#5093ff' }} />
                ) : (
                    <>
                        <Line data={data} />
                    </>
                )}
            </Wrapper>
        </Main>
    )
}

export default SideBarLivePricesWidget
