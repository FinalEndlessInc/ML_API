const http = require("node:http");
const fs = require("node:fs");
const { randomInt } = require("node:crypto");

const puerto = 3001;
const direccion = "http://localhost:" + puerto



var nombreArchivosMonstruos;
var arregloMonstruos = [];

function TraerArchivos(){
    var Monstruos = [];
    nombreArchivosMonstruos = fs.readdirSync("./json/monstergram");
    for(i=0; i < nombreArchivosMonstruos.length; i++){
        Monstruos.push(JSON.parse(fs.readFileSync("./json/monstergram/" + nombreArchivosMonstruos[i]).toString()));
    }
    arregloMonstruos = Monstruos;
}


const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    
    switch(request.method){

        // GET -----------------------------------------------------------------------------------------------------
        case "GET":
            // Traer info de monstruos del directorio y agregarlos a un arreglo
            
            TraerArchivos();

            switch(request.url){
                case "/":
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
                break;
                
                case "/Monstergram":
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(arregloMonstruos));
                break;

                case "/MonstruoRandom":
                    TraerArchivos();

                    const monstruo = arregloMonstruos[randomInt(0,arregloMonstruos.length)];

                    const monstruo_ha_mandar = {
                        name: monstruo.name,
                        number: monstruo.number
                    }

                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(monstruo_ha_mandar));
                break;

                case "/MonstruosRandom":
                    TraerArchivos();

                    var primer_random = randomInt(0, arregloMonstruos.length);
                    var monstruos_ha_mandar = [{
                        name: arregloMonstruos[primer_random].name,
                        number: arregloMonstruos[primer_random].number,
                        sprite: arregloMonstruos[primer_random].sprites.adult,
                        rarity: arregloMonstruos[primer_random].rarity,
                        elements: arregloMonstruos[primer_random].elements
                    }];


                    
                    while(monstruos_ha_mandar.length != 6){
                        const monstruo_random = arregloMonstruos[randomInt(0,arregloMonstruos.length)];
                        var monstruo_repetido = false;

                        // Verificador que no se repitan
                        for(j = 0; j < monstruos_ha_mandar.length; j++){
                            //console.log(monstruo_random.name + " /" + monstruos_ha_mandar[j].name);
                            if(monstruo_random.name == monstruos_ha_mandar[j].name){
                                monstruo_repetido = true;
                                //console.log("Monstruo Repetido - Saliendo...");
                                break;
                            }
                        }
                        if(monstruo_repetido != true){
                            //console.log("Monstruo no es repetido, agregando...");

                            monstruos_ha_mandar.push({
                                    name: monstruo_random.name,
                                    number: monstruo_random.number,
                                    sprite: monstruo_random.sprites.adult,
                                    rarity: monstruo_random.rarity,
                                    elements: monstruo_random.elements
                            });
                        }
                    }
                    /*for(i =0; i < monstruos_ha_mandar.length; i++){
                        console.log(monstruos_ha_mandar[i].name);
                    }*/
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify(monstruos_ha_mandar));
                break;
                default:
                    var monstruoEncontrado = false;
                    for(i=0; i < arregloMonstruos.length; i++){
                        const monstruo_actual = arregloMonstruos[i];
                        var nombre_monstruo_actual = "";
                        if(monstruo_actual.name.includes(" ")){
                            nombre_monstruo_actual = monstruo_actual.name.replace(" ", "-");
                        }else{
                            nombre_monstruo_actual = monstruo_actual.name
                        }
                        
                        //console.log(nombre_monstruo_actual + " " + request.url.replace("%20", "-"))
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
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            message: "No he podido encontrar a ese monstruo"
                        }));    
                    }
                break;
            }
            
        break;

        

        // POST -------------------------------------------------------------------------------------------------------------
        case "POST":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {
                switch(request.url){
                    case "/AgregarMonstruo":
                        const monstruo_nuevo = JSON.parse(informacion);
                        


                        const monstruo_ha_agregar = {
                            name: monstruo_nuevo.name,
                            number: monstruo_nuevo.number,
                            elements: monstruo_nuevo.elements,
                            rarity: monstruo_nuevo.rarity,
                            generation: monstruo_nuevo.generation,
                            description: monstruo_nuevo.description,
                            books: monstruo_nuevo.books,
                            sprites: monstruo_nuevo.sprites,
                            traits: monstruo_nuevo.traits,
                            relics: monstruo_nuevo.relics,
                            stats: monstruo_nuevo.stats,
                            skillset: monstruo_nuevo.skillset,
                            ult_ability: monstruo_nuevo.ult_ability
                        }
                        //console.log(monstruo_ha_agregar);

                        fs.writeFile("./json/monstergram/" + monstruo_ha_agregar.name.toLowerCase().replace(" ", "-") + ".json", JSON.stringify(monstruo_ha_agregar), err => {
                        if(err){
                            console.log(err);
                            response.statusCode = 400;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                message: "Something went wrong"
                            }));
                            
                        }
                        else{
                            response.statusCode = 201;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                message: "Monster added succesfully"
                            }));
                        }
                    });

                    break;
                }
            })

        break;

        // PUT --------------------------------------------------------------------------------------------------------------
        case "PUT":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {
                TraerArchivos();
                const objeto_monstruo_editar = JSON.parse(informacion);
                
                // Cambiar el archivo del monstruo
                if(request.url == "/EditarMonstruo"){
                    console.log(objeto_monstruo_editar);
                    var monstruo_encontrado = false;
                    var monstruo_ha_editar;

                    // Buscando si el monstruo coincide con alguno de los que ya están registrados
                    for(i = 0; i < arregloMonstruos.length; i++){
                        console.log(objeto_monstruo_editar.old_name);
                        console.log(arregloMonstruos[i].name);
                        if(objeto_monstruo_editar.old_name == arregloMonstruos[i].name){
                            monstruo_ha_editar = arregloMonstruos[i];
                            monstruo_encontrado = true;
                            break;
                        }
                    }

                    // Error si no
                    if(monstruoEncontrado == false){
                        console.log("No se encontró a ese monstruo");
                        response.statusCode = 404;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            message: "Couldn't find that monster"
                        }));
                        return;
                    }

                    // Todo lo demas
                    console.log("Encontramos al monstruo a editar");
                    //console.log(monstruo_ha_editar);

                    // Cambiando cada valor
                    monstruo_ha_editar.name = objeto_monstruo_editar.new_name;
                    monstruo_ha_editar.number = objeto_monstruo_editar.number;
                    monstruo_ha_editar.elements = objeto_monstruo_editar.elements;
                    monstruo_ha_editar.rarity = objeto_monstruo_editar.rarity;
                    monstruo_ha_editar.generation = objeto_monstruo_editar.generation;
                    monstruo_ha_editar.description = objeto_monstruo_editar.description;
                    monstruo_ha_editar.books = objeto_monstruo_editar.books;

                    monstruo_ha_editar.sprites = objeto_monstruo_editar.sprites;

                    monstruo_ha_editar.traits = objeto_monstruo_editar.traits;
                    monstruo_ha_editar.relics = objeto_monstruo_editar.relics;
                    monstruo_ha_editar.stats = objeto_monstruo_editar.stats;
                    monstruo_ha_editar.skillset = objeto_monstruo_editar.skillset;
                    monstruo_ha_editar.ult_ability = objeto_monstruo_editar.ult_ability; 

                    //console.log(monstruo_ha_editar);
                    fs.writeFile("./json/monstergram/" + monstruo_ha_editar.name.toLowerCase().replace(" ", "-") + ".json", JSON.stringify(monstruo_ha_editar), err => {
                        if(err){
                            console.log(err);
                            response.statusCode = 400;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                message: "Something went wrong"
                            }));
                            
                        }
                        else{
                            response.statusCode = 200;
                            response.setHeader("Content-Type", "application/json");
                            response.end(JSON.stringify({
                                message: "Monster info updated"
                            }));
                        }
                    });
                }

            });

            
            
        break;

        case "DELETE":
            var informacion = "";
            request.on("data", info => {
               informacion += info 
            });
            request.on("end", () => {
                TraerArchivos();
                const objeto_monstruo_borrar = JSON.parse(informacion);
                console.log(objeto_monstruo_borrar);
                var monstruo_encontrado = false;

                for(i = 0; i < arregloMonstruos.length; i++){
                    console.log(objeto_monstruo_borrar.name);
                    console.log(arregloMonstruos[i].name);
                    if(objeto_monstruo_borrar.name.toLowerCase() == arregloMonstruos[i].name.toLowerCase()){
                        monstruo_encontrado = true;
                        break;
                    }
                }

                if(monstruoEncontrado == false){
                    response.statusCode = 404;
                    response.setHeader("Content-Type", "application/json");
                    response.end(JSON.stringify({
                        message: "Monster was not found or doesn't exist"
                    }));
                    return;
                }

                fs.unlink("./json/monstergram/" + objeto_monstruo_borrar.name.toLowerCase().replace(" ", "-") + ".json", err =>{
                    if(err){
                        console.log(err);
                        response.statusCode = 400;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            message: "Something went wrong"
                        }));
                    }else{
                        response.statusCode = 200;
                        response.setHeader("Content-Type", "application/json");
                        response.end(JSON.stringify({
                            message: "Monster deleted"
                        }));
                    }
                });
            });
            
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