import http from "node:http"
import { getDataFromDB } from "./database/db.js"

const PORT = 8000


    
    const server = http.createServer( async (req, res) => {
        if (req.url === '/api' && req.method === 'GET') {
                const destination = JSON.stringify(await getDataFromDB())
                res.setHeader("Content-Type", "application/json")
                res.statusCode = 200
                res.end(destination)
                console.log(destination)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.statusCode = 404
            res.end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))