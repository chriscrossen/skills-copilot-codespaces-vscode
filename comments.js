// Create web server
// http://localhost:8080/comments/

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(function(request, response) {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var pathname = url_parts.pathname;

    console.log(pathname);

    if (pathname == '/comments') {
        if (request.method == 'POST') {
            var body = '';
            request.on('data', function(data) {
                body += data;
            });
            request.on('end', function() {
                var post = qs.parse(body);
                console.log(post);
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end('Add comment: ' + post.comment);
            });
        }
        else if (request.method == 'GET') {
            fs.readFile('comments.html', function(err, data) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            });
        }
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found');
    }
});

server.listen(8080);
console.log('Server is running at http://localhost:8080/comments/');