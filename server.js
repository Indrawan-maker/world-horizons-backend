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
    console.log(queryObj)
    

    if (urlObj.pathname === '/api' && req.method === 'GET') {


        let filteredData = getDataByQueryParams(destination, queryObj)



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