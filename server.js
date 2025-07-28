import http from "node:http"

const PORT = 8000

const server = http.createServer((req, res) => {
    res.write("This is a form data\n")
    res.write("This is a Auth data\n")
    res.write("Hello world\n")
    res.end("this from server i create" ,"utf8", () => console.log("response end"))
})

server.listen(PORT, console.log(`server running on port ${PORT}`))