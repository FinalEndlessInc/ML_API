const PaginaEditar = document.querySelector("#apartado_editar");
const CargarBusqueda = document.querySelector("#Cargar_busqueda");
const PlantillaStats = document.querySelector(".PlantillaStats");
const ContenedorStats = document.querySelector("#ContenedorStadisticas");

const direccion = "http://localhost:3001/monstergram/";

const Nombre = PaginaEditar.querySelector(".nombre");
const ID = PaginaEditar.querySelector(".numero");
const Descripcion = PaginaEditar.querySelector(".Descripcion");
const Elementos = PaginaEditar.querySelector(".elementos");
const Rareza = PaginaEditar.querySelector("#Rareza");
var Nombre_antiguo;

const InputImagenPrincipal = PaginaEditar.querySelector("#ImagenPrincipal");
const PreviewImagenPrincipal = PaginaEditar.querySelector("#PreviewImagenPrincipal");

const InputImagenTeen = PaginaEditar.querySelector("#ImagenTeen");
const PreviewImagenTeen = PaginaEditar.querySelector("#PreviewImagenTeen");

const InputImagenBebe = PaginaEditar.querySelector("#ImagenBebe");
const PreviewImagenBebe = PaginaEditar.querySelector("#PreviewImagenBebe");

const InputImagenHuevo = PaginaEditar.querySelector("#ImagenHuevo");
const PreviewImagenHuevo = PaginaEditar.querySelector("#PreviewImagenHuevo");

PlantillaStats.remove();

function BuscarMonstruo(){
    const boton_input = document.querySelector("input");

    if(boton_input.value == ""){
        alert("Selecciona un monstruo para continuar");
        return;
    }

    Elementos.innerHTML = "";

    fetch(direccion + boton_input.value).then(recurso => {
        recurso.json().then( monstruo => {
            if(recurso.status == 404){
                alert(monstruo.message);
                CargarBusqueda.style.display = "none";
                return;
            }
        
            console.log(monstruo);
            CargarBusqueda.style.display = "block";
            
            Nombre.value = monstruo.name;
            Nombre_antiguo = monstruo.name;
            ID.value = monstruo.number;
            Descripcion.value = monstruo.description;
            Rareza.value = monstruo.rarity;
            for(i = 0; i < monstruo.elements.length; i++){
                Elementos.innerHTML += " " + monstruo.elements[i];
            }
            for(i=0; i < 6; i++){
                const seleccionarRango = "rank" + [i];
                const clon_stats = PlantillaStats.cloneNode(true);
                ContenedorStats.appendChild(clon_stats);

                const Rango = clon_stats.querySelector(".Rango");
                Rango.innerHTML = "Rank " + monstruo.stats[i].rank;

                const Life = clon_stats.querySelector(".Life");
                Life.value = monstruo.stats[i].life;

                const Power = clon_stats.querySelector(".Power");
                Power.value = monstruo.stats[i].power;

                const Speed = clon_stats.querySelector(".Speed");
                Speed.value = monstruo.stats[i].speed;

                const Stamina = clon_stats.querySelector(".Stamina");
                Stamina.value = monstruo.stats[i].stamina;

                const Gold = clon_stats.querySelector(".Gold");
                Gold.value = monstruo.stats[i].gold;
            }
            PreviewImagenPrincipal.src = monstruo.sprites.adult;
            PreviewImagenTeen.src = monstruo.sprites.teen;
            PreviewImagenHuevo.src = monstruo.sprites.egg;
            PreviewImagenBebe.src = monstruo.sprites.baby;
        }

        )
    });
}

InputImagenPrincipal.addEventListener("change", function(){
    const archivo = InputImagenPrincipal.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        PreviewImagenPrincipal.src = reader.result;
    }
});

InputImagenTeen.addEventListener("change", function(){
    const archivo = InputImagenTeen.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        PreviewImagenTeen.src = reader.result;
    }
});

InputImagenBebe.addEventListener("change", function(){
    const archivo = InputImagenBebe.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        PreviewImagenBebe.src = reader.result;
    }
});

InputImagenHuevo.addEventListener("change", function(){
    const archivo = InputImagenHuevo.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function(){
        PreviewImagenHuevo.src = reader.result;
    }
});

function CambiarMonstruo(){

    if(Nombre.value == ""){
        alert("No se ha seleccionado ningun monstruo");
        return;
    }

    const objeto_editar_monstruo = {
        old_name: Nombre_antiguo,
        new_name: Nombre.value,
        number: ID.value,
        description: Descripcion.value,
        egg: PreviewImagenHuevo.src,
        baby: PreviewImagenBebe.src,
        teen: PreviewImagenTeen.src,
        adult: PreviewImagenPrincipal.src
    }
    
    fetch(url_endpoint + "/EditarImagenes", {
        method: "PUT",
        body: JSON.stringify(objeto_editar_monstruo)
    }).then(recurso => recurso.json().then(respuesta => {
        if(recurso.status == 404){
            alert(respuesta.message);
        }else{
            alert(respuesta.message);
            window.location.reload()
        }
    }));
}