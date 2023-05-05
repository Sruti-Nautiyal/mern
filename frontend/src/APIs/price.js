export const arrPriceRanges = [
    "0-10000",
    "10000-20000",
    "20000-30000",
    "30000-50000",
    "50000-100000"
]

export const priceRangeToIndex = (priceRange) => {
    const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

    return index
}