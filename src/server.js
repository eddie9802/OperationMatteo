var http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write("Here is some pie.");
    response.end();
}

http.createServer(onRequest).listen(6969);
console.log("Server is now running");