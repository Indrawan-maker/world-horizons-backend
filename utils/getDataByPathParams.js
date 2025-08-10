
export const getDataByPathParams = (destination, destinationType, value) => {
    const resultDestination = destination.filter((destinationObj => {
        return destinationObj[destinationType].toLowerCase() === value.toLowerCase()
    }))
    return resultDestination
}
