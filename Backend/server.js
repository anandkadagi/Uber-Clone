const http = require('http')
const app = require('./app')
const {initialize}=require('./socket')
const port = process.env.PORT || 3000
const server = http.createServer(app)
initialize(server)
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})