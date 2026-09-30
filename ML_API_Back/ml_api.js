const http = require("node:http");
const fs = require("node:fs");

const puerto = 3001;

var arregloMonstruos = [];

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    /*if(request.url == "/"){
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html; charset=utf-8");

        response.end("<h1>Si jaló, tú</h1>");
    }else{
        response.statusCode = 404;

        response.setHeader("Content-Type", "text/html; charset=utf-8");

        response.end("<h1>Que pedo, un error</h1>");
    }*/
});

server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});