
export const sendJSONResponse = (res, statusCode, data) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Acces-Control-Allow-Origin', '*')
    res.setHeader('Acces-Control-Allow-Method', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(data))
}
