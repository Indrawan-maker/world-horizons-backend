import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import  { sendJSONResponse, sendJSONRequest }  from "./utils/utils.js"

const PORT = 8000



    const server = http.createServer( async (req, res) => {
        const destination = await getDataFromDB()

        if (sendJSONRequest(req, '/api', 'GET')) {
            sendJSONResponse(res, 200, destination)
        } else if(sendJSONRequest(req, startsWith('/api/continent'), 'GET')) {
            const continent = req.url.split("/").pop()

            const filteredData = destination.filter((destinationItem) => {
                return destinationItem.continent.toLowerCase() === continent.toLowerCase()
            })

            sendJSONResponse(res, 200, filteredData)

        }
        else if(sendJSONRequest(req, startsWith('/api/country'), 'GET')) {
            const country = req.url.split('/').pop()
            console.log(country)
            const filteredCoountry = destination.filter((destinationItem) => {
                return destinationItem.country.toLowerCase() === country.toLowerCase()
            })
            sendJSONResponse(res, 200, filteredCoountry)
        }
        else {
            sendJSONResponse(res, 404, {
                error: "not found",
                message: "The request route does not exist"
            })
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))