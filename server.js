const http = require('http');
const fs = require('fs')

const server = http.createServer((requestObj, responseObj) => {
    // console.log(requestObj.url, requestObj.method)

    // set header content type
    responseObj.setHeader("Content-Type", 'text/html')

    let path = './views/'
    switch (requestObj.url) {
        case '/':
            path += 'index.html'
            responseObj.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            responseObj.statusCode = 200;
            break;
        case '/about-me':
            responseObj.statusCode = 301;
            responseObj.setHeader('location', '/about')
            responseObj.end()
            break;
        default:
            path += '404.html'
            responseObj.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            responseObj.end()
        } else {
            // responseObj.write(data)
            // if you only send one thing you can send it directly in the end method
            responseObj.end(data)
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
}); // default value is local host