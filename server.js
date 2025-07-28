import http from "http"

const PORT = 8000

const server = http.createServer((req, res) => {
    res.end("this from server i create")
})

server.listen(PORT, console.log(`server running on port ${PORT}`))