import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import { sendJSONResponse, filteredDestination } from "./utils/utils.js"


const PORT = 8000


const server = http.createServer(async (req, res) => {
    const destination = await getDataFromDB()
    /*
    Challenge:
    1. Complete the two lines of code below.
        hint.md for help!
*/

    const urlObj = new URL(req.url, `http://${req.headers.host}`)// Use the URL constructor and pass in the relative and base urls.
    console.log(urlObj)
    console.log(urlObj.pathname)
    console.log(urlObj.search)

    console.log(urlObj.pathname + urlObj.search)

    const queryObj = Object.fromEntries(urlObj.searchParams)// Use the fromEntries() method on the Object class .
    // What do you need to pass in? 
    console.log(queryObj)
    
    
    
    if (urlObj.pathname === '/api' && req.method === 'GET') {
        let filteredDestination = destination
        console.log(queryObj)
        console.log(urlObj.pathname + urlObj.search)
        
        sendJSONResponse(res, 200, filteredDestination)

    } else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
        const continent = req.url.split("/").pop()
        const filteredData = filteredDestination(destination, 'continent', continent)
        sendJSONResponse(res, 200, filteredData)

    }
    else if (req.url.startsWith('/api/country') && req.method === 'GET') {
        const country = req.url.split('/').pop()
        console.log(country)
        const filteredData = filteredDestination(destination, 'country', country)
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