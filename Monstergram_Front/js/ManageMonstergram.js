const PaginaEditar = document.querySelector("#apartado_editar");
const CargarBusqueda = document.querySelector("#Cargar_busqueda");
const PlantillaStats = document.querySelector(".PlantillaStats");
const ContenedorStats = document.querySelector("#ContenedorStadisticas");
const ContenedorHabilidades = document.querySelector("#ContenedorHabilidades");
const PlantillaHabilidad = document.querySelector(".PlantillaHabilidad");
const HabilidadUlt = document.querySelector("#habilidad_ult");


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
PlantillaHabilidad.remove();
HabilidadUlt.remove();

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


            // Ver elementos

            const elemento1 = querySelector("#element1");
            const elemento2 = querySelector("#element2");

            if(monstruo.elements.length == 1){
                elemento1.value = monstruo.elements[0];
                elemento2.value = "None";
            }else{
                elemento1.value = monstruo.elements[0];
                elemento2.value = monstruo.elements[1];
            }

            // Ver estadisticas
            for(i=0; i < 6; i++){
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

            //Ver habilidades
            for(i=0; i < monstruo.skillset.length; i++){
                const clon_skills = PlantillaHabilidad.cloneNode(true);
                ContenedorHabilidades.appendChild(clon_skills);

                const ss_nombre = clon_skills.querySelector(".ss_nombre");
                ss_nombre.value = monstruo.skillset[i].name;
    
                const ss_descripcion = clon_skills.querySelector(".ss_descripcion");
                ss_descripcion.value = monstruo.skillset[i].description;

                const ss_tipo = clon_skills.querySelector(".ss_tipo");
                ss_tipo.value = monstruo.skillset[i].ability_type;

                const ss_objetivo = clon_skills.querySelector(".ss_objetivo");
                ss_objetivo.value = monstruo.skillset[i].target;

                const ss_precision = clon_skills.querySelector(".ss_precision");
                ss_precision.value = monstruo.skillset[i].accuracy;

                const ss_danio = clon_skills.querySelector(".ss_danio");
                ss_danio.value = monstruo.skillset[i].damage;

                const ss_costo = clon_skills.querySelector(".ss_costo");
                ss_costo.value = monstruo.skillset[i].stamina_cost;

                const ss_recuperacion = clon_skills.querySelector(".ss_recuperacion");
                ss_recuperacion.value = monstruo.skillset[i].cooldown;
            }

            const ult_nombre = HabilidadUlt.querySelector("#ult_nombre");
            ult_nombre.value = monstruo.ult_ability.name;

            const ult_descripcion = HabilidadUlt.querySelector("#ult_descripcion");
            ult_descripcion.value = monstruo.ult_ability.name;

            const ult_objetivo = HabilidadUlt.querySelector("#ult_objetivo");
            ult_objetivo.value = monstruo.ult_ability.target;

            ContenedorHabilidades.appendChild(HabilidadUlt);


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