import http from "node:http"
import { getDataFromDB } from "./database/db.js"

const PORT = 8000



    const server = http.createServer( async (req, res) => {
        const destination = await getDataFromDB()

        if (req.url === '/api' && req.method === 'GET') {
                res.setHeader("Content-Type", "application/json")
                res.statusCode = 200
                res.end(destination)
        } else if(req.url.startsWith('/api/continent') && req.method === 'GET') {
            const continent = req.url.split("/").pop()

            const filteredData = destination.filter((datas) => {
                return datas.continent.toLowerCase() === continent.toLowerCase()
            })

            console.log(JSON.stringify(filteredData))
            res.setHeader("Content-Type", "application/json")
            res.statusCode = 200
            res.end(JSON.stringify(filteredData))

        }else {
            res.setHeader("Content-Type", "application/json")
            res.statusCode = 404
            res.end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))