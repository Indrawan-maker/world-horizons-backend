import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import  { sendJSON }  from "./utils/utils.js"

const PORT = 8000



    const server = http.createServer( async (req, res) => {
        const destination = await getDataFromDB()

        if (req.url === '/api' && req.method === 'GET') {
            sendJSON(res, 200, destination)
        } else if(req.url.startsWith('/api/continent') && req.method === 'GET') {
            const continent = req.url.split("/").pop()

            const filteredData = destination.filter((destinationItem) => {
                return destinationItem.continent.toLowerCase() === continent.toLowerCase()
            })

            sendJSON(res, 200, filteredData)

        }
        else if(req.url.startsWith('/api/country') && req.method === 'GET') {
            const country = req.url.split('/').pop()
            console.log(country)
            const filteredCoountry = destination.filter((destinationItem) => {
                return destinationItem.country.toLowerCase() === country.toLowerCase()
            })
            sendJSON(res, 200, filteredCoountry)
        }
        else {
            sendJSON(res, 404, {
                error: "not found",
                message: "The request route does not exist"
            })
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))