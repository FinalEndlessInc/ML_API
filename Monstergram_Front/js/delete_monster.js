function BorrarMonstruo(){
    const nombre = document.querySelector("#input_buscar");
    const objeto_borrar = {
        name: nombre.value
    }
    if(confirm("Are you sure you want to delete this monster?")){
        fetch(url_endpoint + "/BorrarMonstruo", {
            method: "DELETE",
            body: JSON.stringify(objeto_borrar)
        }).then(recurso => { recurso.json().then(respuesta => {
            if(recurso.statusCode == 404){
                alert(respuesta.message);
                return;
            }

            alert(respuesta.message);
        })})
    }
}