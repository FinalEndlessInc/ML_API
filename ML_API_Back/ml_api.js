const http = require("node:http");
const fs = require("node:fs");

const puerto = 3001;
const direccion = "http://localhost:" + puerto

// Traer info de monstruos del directorio y agregarlos a un arreglo

var arregloMonstruos = [];
const nombreArchivosMonstruos = fs.readdirSync("./json/monstergram");

for(i=0; i < nombreArchivosMonstruos.length; i++){
    arregloMonstruos.push(JSON.parse(fs.readFileSync("./json/monstergram/" + nombreArchivosMonstruos[i]).toString()));
}

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    
    switch(request.method){

        // GET -----------------------------------------------------------------------------------------------------
        case "GET":
            if(request.url == "/"){
                response.statusCode = 200;
                response.setHeader("Content-Type", "text/html; charset=utf-8");

                var arreglo_endpoints = [];
                for(i=0; i < nombreArchivosMonstruos.length; i++){
                    arreglo_endpoints.push(direccion + "/monstergram/"+ arregloMonstruos[i].name);
                }
                for(i=0; i < nombreArchivosMonstruos.length; i++){
                    arreglo_endpoints.push(direccion + "/monstergram/" + arregloMonstruos[i].number);
                }

                var lista_html = "<ul>";
                for(i=0; i<arreglo_endpoints.length; i++){
                    lista_html += "<li>" + arreglo_endpoints[i] + "</li>";
                }
                lista_html += "</ul>";

                response.end("<h1>Si jaló, tú</h1>" + lista_html);
            
            }else{
                var monstruoEncontrado = false;
                for(i=0; i < arregloMonstruos.length; i++){
                    const monstruo_actual = arregloMonstruos[i];
                    var nombre_monstruo_actual = "";
                    if(monstruo_actual.name.includes(" ")){
                        nombre_monstruo_actual = monstruo_actual.name.replace(" ", "-");
                    }else{
                        nombre_monstruo_actual = monstruo_actual.name
                    }
                    
                    console.log(nombre_monstruo_actual + " " + request.url.replace("%20", "-"))
                    if(request.url.toLowerCase().replace("%20", "-") == "/monstergram/" + nombre_monstruo_actual.toLowerCase() || request.url.toLowerCase() == "/monstergram/" + monstruo_actual.number){
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify(monstruo_actual));
                        monstruoEncontrado = true;
                        break;
                    }

                }
            if(monstruoEncontrado == false){
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "text/html; charset=utf-8");

                    response.end("<h1>Eh, no se encontró a ese monstruo</h1>");    
                }
        }

        break;

        // POST -------------------------------------------------------------------------------------------------------------
        case "POST":

        break;

        // PUT --------------------------------------------------------------------------------------------------------------
        case "PUT":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {
                const objeto_monstruo_editar = JSON.parse(informacion);
                console.log(objeto_monstruo_editar);
            });
        break;

        case "DELETE":
        break;

        case "OPTIONS":
            response.writeHead(204);
            response.end();
        break;
    }

    
});

server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});