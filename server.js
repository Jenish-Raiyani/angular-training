const app = require('http');
const exAppModule = require('./src/apis/app')

const server = app.createServer(exAppModule);

server.listen(3000)
