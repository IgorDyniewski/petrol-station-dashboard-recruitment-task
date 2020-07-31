// Lib
function timeOut(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const availablePetrolStations = [
    {
        id: 1,
        lat: 29.517814,
        lon: -95.885914,
        subTitle: 'US 59',
        name: 'Rosenberg Petrol Station',
        logoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Open_Source_Initiative_keyhole.svg/1024px-Open_Source_Initiative_keyhole.svg.png',
    },
    {
        id: 2,
        lat: 29.348663,
        lon: -95.016849,
        subTitle: 'TX 6',
        name: 'Hitchcock Petrol Station',
        logoUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Open_Source_Initiative_keyhole.svg/1024px-Open_Source_Initiative_keyhole.svg.png',
    },
]

// Generating fake petrol stations locations
export const fetchPetrolStationsLocations = async () => {
    await timeOut(2000)
    return availablePetrolStations
}
