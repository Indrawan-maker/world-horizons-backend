import http from "node:http"
import { getDataFromDB } from "./database/db.js"

const PORT = 8000


    
    const server = http.createServer( async (req, res) => {
        if (req.url === '/api' && req.method === 'GET') {
            try{
                const destination = JSON.stringify(await getDataFromDB())
                res.setHeader("Content-Type", "application/json")
                res.end(destination)
                console.log(destination)
            }
            catch (err) {
                console.log(err)
            }
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))