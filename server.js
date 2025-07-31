import http from "node:http"
import { getDataFromDB } from "./database/db.js"

const PORT = 8000


/*
Challenge:
    1. Store our data in a const ‘destinations’.
    2. When a GET request is received to the ‘/api' endpoint, send our JSON stringified data.
    Think: What changes will you need to make to get this to work?
*/

    
    const server = http.createServer( async (req, res) => {
        if (req.url === '/api' && req.method === 'GET') {
            try{
                const destination = JSON.stringify(await getDataFromDB())
                res.end(destination)
                console.log(destination)
            }
            catch (err) {
                console.log(err)
            }
        }
    })

server.listen(PORT, console.log(`server running on port ${PORT}`))