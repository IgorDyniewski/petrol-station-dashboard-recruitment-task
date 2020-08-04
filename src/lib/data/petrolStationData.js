// Lib
function timeOut(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const availablePetrolStations = [
    {
        id: 0,
        lat: 29.517814,
        lon: -95.885914,
        subTitle: 'US 59',
        name: 'Rosenberg Petrol Station',
        logoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Open_Source_Initiative_keyhole.svg/1024px-Open_Source_Initiative_keyhole.svg.png',
        availablePetrolTypes: ['B7', 'PB 98', 'PB 95', 'LPG'],
    },
    {
        id: 1,
        lat: 29.348663,
        lon: -95.016849,
        subTitle: 'TX 6',
        name: 'Hitchcock Petrol Station',
        logoUrl: 'https://image.flaticon.com/icons/svg/25/25719.svg',
        availablePetrolTypes: ['B7', 'PB 98', 'PB 95', 'LPG'],
    },
    {
        id: 2,
        lat: 30.316649,
        lon: -93.670274,
        subTitle: 'LA 12',
        name: 'Old River Road Petrol Station',
        logoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Open_Source_Initiative_keyhole.svg/1024px-Open_Source_Initiative_keyhole.svg.png',
        availablePetrolTypes: ['B7', 'PB 98', 'PB 95', 'LPG'],
    },
    {
        id: 3,
        lat: 29.986343,
        lon: -94.208519,
        subTitle: 'Smith Road',
        name: 'Cheek Petrol Station',
        logoUrl: 'https://image.flaticon.com/icons/svg/25/25719.svg',
        availablePetrolTypes: ['B7', 'PB 98', 'PB 95', 'LPG'],
    },
]

// Generating fake petrol stations locations
export const fetchPetrolStationsLocations = async () => {
    await timeOut(1000)
    return availablePetrolStations
}

// Generating fake petrol tanks levels
export const fetchPetrolTanksLevels = async (id) => {
    const timeOutVal = Math.floor(Math.random() * 8000) + 100 // Fake random api response time for checking tank levels
    await timeOut(timeOutVal)

    // Getting available petrol types for station
    const availablePetrolTypes = availablePetrolStations.filter((petrolStation) => petrolStation.id === id)[0]
        .availablePetrolTypes

    // Generating fake tank levels for each station
    let tankLevels = []
    availablePetrolTypes.forEach((petrolType) =>
        tankLevels.push({ type: petrolType, level: Math.floor(Math.random() * 100) + 1 })
    )
    return tankLevels
}

// Generating live fake live prices
export const fetchPrices = async (id) => {
    const timeOutVal = Math.floor(Math.random() * 2000) + 100 // Fake random api response time for checking tank levels
    await timeOut(timeOutVal)

    // Generating labels
    let labels = []
    const dateNow = new Date()
    for (let i = dateNow.getHours() - 12; i <= dateNow.getHours(); i++) {
        const hour = String(i)
        labels.push(hour.length === 1 ? `0${hour}:00` : `${hour}:00`)
    }

    // Generating datasets
    let dataSets = []
    const availablePetrolTypes = availablePetrolStations.filter((station) => station.id === id)[0].availablePetrolTypes

    const defaultDataset = {
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
    }

    availablePetrolTypes.forEach((type) => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generating random  border color
        const data = []
        for (let i = 0; i < 12; i++)
            data.push(
                parseFloat((Math.floor(Math.random() * 4) + 3 + (Math.floor(Math.random() * 100) + 0) / 100).toFixed(2))
            )
        dataSets.push({ ...defaultDataset, label: type, data: data, borderColor: `#${randomColor}` })
    })

    return { labels: labels, datasets: dataSets }
}
