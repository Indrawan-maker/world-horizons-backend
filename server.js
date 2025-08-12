import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import { sendJSONResponse } from "./utils/sendJSONResponse.js"
import { getDataByQueryParams } from "./utils/getDataByQueryParams.js"
import { getDataByPathParams } from "./utils/getDataByPathParams.js"


const PORT = 8000


const server = http.createServer(async (req, res) => {


    const destination = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)


    const queryObj = Object.fromEntries(urlObj.searchParams)
    console.log(urlObj)
    console.log(queryObj)
    
    //   1. Update filteredData so it holds only the objects the client wants 
    //  based on query params. If the client doesn’t use any query params, 
    //  serve all of the data.
    //  The query params we are accepting are:
    //  'country', 'continent', and 'is_open_to_public'.

    //  Keep our code tidy by doing the the filtering in a util function.
    
    if (urlObj.pathname === '/api' && req.method === 'GET') {


        let filteredData = destination
        const {continent, country} = queryObj

        if(continent) {
            filteredData = destination.filter(desObj => 
                desObj.continent.toLowerCase() === continent.toLowerCase()
            )
        }

        if(country) {
            filteredData = destination.filter(desObj => {
                desObj.country.toLowerCase() === country.toLowerCase()
            })
        }
        getDataByQueryParams(filteredData, )

        console.log(continent)
        console.log(country)


        sendJSONResponse(res, 200, filteredData)

    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split("/").pop()
        const filteredData = getDataByPathParams(destination, 'continent', continent)
        sendJSONResponse(res, 200, filteredData)

    }
    else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop()
        console.log(country)
        const filteredData = getDataByPathParams(destination, 'country', country)
        sendJSONResponse(res, 200, filteredData)
    }
    else {
        sendJSONResponse(res, 404, {
            error: "not found",
            message: "The request route does not exist"
        })
    }
})

server.listen(PORT, console.log(`server running on port ${PORT}`))