
export const sendJSONResponse = (res, statusCode, data) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.end(JSON.stringify(data))
}


export const filteredDestination = (destination, destinationType, value) => {
    const resultDestination = destination.filter((destinationObj => {
        return destinationObj[destinationType].toLowerCase() === value.toLowerCase()
    }))
    return resultDestination
}

