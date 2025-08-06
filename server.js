import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import  { sendJSONResponse, filteredDestination }  from "./utils/utils.js"


const PORT = 8000


const server = http.createServer( async (req, res) => {
    const destination = await getDataFromDB()
    const urlObj = req.header.host

    console.log(urlObj)

        if(req.url === '/api' && req.method === 'GET') {
            sendJSONResponse(res, 200, destination)

        } else if(req.url.startsWith('/api/continent') && req.method === 'GET') {
            const continent = req.url.split("/").pop()
            const filteredData = filteredDestination(destination, 'continent', continent)
            sendJSONResponse(res, 200, filteredData)

        }
        else if(req.url.startsWith('/api/country') && req.method === 'GET') {
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