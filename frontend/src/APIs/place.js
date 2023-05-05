export const arrPlace = [
    'Fatehpur',
    'Kanpur',
    'Pratapgarh',
    'Varanashi',
    'Lucknow',
    'Allahabad'
]

export const placeToIdx = (place) => {
    return arrPlace.findIndex((cont) => cont.toLowerCase() === place.toLowerCase())
}

export const idxToPalce = (idx) => {
    return (arrPlace.filter((_, index) => index === Number(idx)))[0]
}