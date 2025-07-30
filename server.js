import http from "node:http"

const PORT = 8000

const server = http.createServer((req, res) => {
    if(req.url === '/api') {
        res.end("I'm an api nano da") 
        return
    } 
    res.end("this is a wrong url")
})

server.listen(PORT, console.log(`server running on port ${PORT}`))