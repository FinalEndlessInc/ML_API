
// Todo para editar ---------------------------------------------------------------------------------
const PaginaAgregar = document.querySelector("#apartado_editar");
const CargarBusqueda = PaginaAgregar.querySelector("#Cargar_busqueda");
const PlantillaStats = PaginaAgregar.querySelector(".PlantillaStats");
const ContenedorStats = PaginaAgregar.querySelector("#ContenedorStadisticas");
const ContenedorHabilidades = PaginaAgregar.querySelector("#ContenedorHabilidades");
const PlantillaHabilidad = PaginaAgregar.querySelector(".PlantillaHabilidad");
const HabilidadUlt = PaginaAgregar.querySelector("#habilidad_ult");
const ContenedorAtributos = PaginaAgregar.querySelector("#ContenedorAtributos");
const Libros = PaginaAgregar.getElementsByClassName("libros");
const Inputs = PaginaAgregar.querySelector("input");


const direccion = "http://localhost:3001/monstergram/";

const Nombre = PaginaAgregar.querySelector(".nombre");
const ID = PaginaAgregar.querySelector(".numero");
const Descripcion = PaginaAgregar.querySelector(".Descripcion");
const Elementos = PaginaAgregar.querySelector(".elementos");
const Rareza = PaginaAgregar.querySelector("#Rareza");
const Atributos = PaginaAgregar.querySelector(".atributos");
const elemento1 = PaginaAgregar.querySelector("#element1");
const elemento2 = PaginaAgregar.querySelector("#element2");
const reliquia1 = PaginaAgregar.querySelector("#reliquia1");
const reliquia2 = PaginaAgregar.querySelector("#reliquia2");
const talentos = PaginaAgregar.querySelector("#talentos");
const generacion = PaginaAgregar.querySelector("#Generacion");
var Nombre_antiguo;

const InputImagenPrincipal = PaginaAgregar.querySelector("#ImagenPrincipal");
const PreviewImagenPrincipal = PaginaAgregar.querySelector("#PreviewImagenPrincipal");

const InputImagenTeen = PaginaAgregar.querySelector("#ImagenTeen");
const PreviewImagenTeen = PaginaAgregar.querySelector("#PreviewImagenTeen");

const InputImagenBebe = PaginaAgregar.querySelector("#ImagenBebe");
const PreviewImagenBebe = PaginaAgregar.querySelector("#PreviewImagenBebe");

const InputImagenHuevo = PaginaAgregar.querySelector("#ImagenHuevo");
const PreviewImagenHuevo = PaginaAgregar.querySelector("#PreviewImagenHuevo");



function BuscarMonstruo(){
    const boton_input = document.querySelector("#input_buscar");
    console.log(boton_input.value);

    PlantillaStats.remove();
    PlantillaHabilidad.remove();
    HabilidadUlt.remove();
    Atributos.remove();


    if(boton_input.value == ""){
        alert("Selecciona un monstruo para continuar");
        return;
    }

    //Elementos.innerHTML = "";

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
            generacion.value = monstruo.generation;


            // Ver elementos

            elemento1.value = monstruo.elements[0];

            if(monstruo.elements.length == 1){    
                elemento2.value = "None";
            }else{
                elemento2.value = monstruo.elements[1];
            }

            // Ver atributos
            for(i = 0; i < monstruo.traits.length; i++){
                const clon_atributo = Atributos.cloneNode(true);
                ContenedorAtributos.appendChild(clon_atributo);

                clon_atributo.value = monstruo.traits[i];
            }

            // Ver reliquias

            reliquia1.value = monstruo.relics[0];

            if(monstruo.relics.length == 1){
                reliquia2.value = "None";
                talentos.value = "None";
            }else{
                if(monstruo.relics.length == 3){
                    reliquia2.value = monstruo.relics[1];
                    talentos.value = monstruo.relics[2];
                }else{
                    reliquia2.value = monstruo.relics[1];
                }
            }


            // Ver libros

            for(i = 0; i < Libros.length; i++){
                Libros[i].checked = false;
                for(j = 0; j < monstruo.books.length; j++){
                    if(Libros[i].value == monstruo.books[j]){
                        Libros[i].checked = true;
                    }
                }
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

                const HabilidadEfectos = clon_skills.querySelector(".EfectosHabilidad");
                const efectos = clon_skills.querySelector(".Efectos");
                efectos.remove()
                for(j = 0; j < monstruo.skillset[i].effects.length; j++){
                    const clon_efectos = efectos.cloneNode(true);
                    HabilidadEfectos.appendChild(clon_efectos);
                    clon_efectos.value = monstruo.skillset[i].effects[j];
                }
            }

            const ult_nombre = HabilidadUlt.querySelector("#ult_nombre");
            ult_nombre.value = monstruo.ult_ability.name;

            const ult_descripcion = HabilidadUlt.querySelector("#ult_descripcion");
            ult_descripcion.value = monstruo.ult_ability.ult_description;

            const ult_objetivo = HabilidadUlt.querySelector("#ult_objetivo");
            ult_objetivo.value = monstruo.ult_ability.target;

            const ult_efectos = HabilidadUlt.querySelector("#ult_efectos");
            const efectos = ult_efectos.querySelector(".ult_efectos_");
            efectos.remove();
            for(j = 0; j < monstruo.ult_ability.effects.length; j++){
                const clon_efectos = efectos.cloneNode(true);
                ult_efectos.appendChild(clon_efectos);
                clon_efectos.value = monstruo.ult_ability.effects[j];
            }

            ContenedorHabilidades.appendChild(HabilidadUlt);

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

            PreviewImagenPrincipal.src = monstruo.sprites.adult;
            PreviewImagenTeen.src = monstruo.sprites.teen;
            PreviewImagenHuevo.src = monstruo.sprites.egg;
            PreviewImagenBebe.src = monstruo.sprites.baby;
        }

        )
    });
}

const BotonCambiarMonstruo = CargarBusqueda.querySelector(".BotonFinal");

BotonCambiarMonstruo.addEventListener("click", function(){

    if(Nombre.value == ""){
        alert("No se ha seleccionado ningun monstruo");
        return;
    }

    const obj_elementos = [elemento1.value];
    if(elemento2.value != "None"){
        obj_elementos.push(elemento2.value);
    }

    const obj_libros = [];
    for(i = 0; i < Libros.length; i++){
        if(Libros[i].checked == true){
            obj_libros.push(Libros[i].value);
        }
    }

    const obj_atributos = [];
    const atributos = ContenedorAtributos.getElementsByClassName("atributos");
    for(i = 0; i < atributos.length; i++){
        obj_atributos.push(atributos[i].value);
    }

    const obj_reliquias = [reliquia1.value];
    if(reliquia2.value != "None"){obj_reliquias.push(reliquia2.value)}
    if(talentos.value != "None"){obj_reliquias.push(talentos.value)}

    const obj_stats = [];
    const stats = ContenedorStats.getElementsByClassName("RangoEstadisticas");
    for(i = 0; i < stats.length; i++){
        obj_stats.push({
            rank: i,
            life: stats[i].querySelector(".Life").value,
            power: stats[i].querySelector(".Power").value,
            speed: stats[i].querySelector(".Speed").value,
            stamina: stats[i].querySelector(".Stamina").value,
            gold: stats[i].querySelector(".Gold").value,
        });
    }
    
    const obj_skills = [];
    const skillsets = ContenedorHabilidades.getElementsByClassName("PlantillaHabilidad");
    for(i = 0; i < skillsets.length; i++){
        const efectos = skillsets[i].getElementsByClassName("Efectos");
        const arreglo_efectos = [];

        for(j = 0; j < efectos.length; j++){
            arreglo_efectos.push(efectos[j].value);
        }

        obj_skills.push({
            name: skillsets[i].querySelector(".ss_nombre").value,
            description: skillsets[i].querySelector(".ss_descripcion").value,
            ability_type: skillsets[i].querySelector(".ss_tipo").value,
            target: skillsets[i].querySelector(".ss_objetivo").value,
            effects: arreglo_efectos,
            accuracy: skillsets[i].querySelector(".ss_precision").value,
            damage: skillsets[i].querySelector(".ss_danio").value,
            stamina_cost: skillsets[i].querySelector(".ss_costo").value,
            cooldown: skillsets[i].querySelector(".ss_recuperacion").value
        });
    }

    const ult_efectos = HabilidadUlt.querySelector("#ult_efectos");
    const efectos = ult_efectos.getElementsByClassName("ult_efectos_");
    const obj_ult_efectos = [];

    for(i=0; i < efectos.length; i++){
        obj_ult_efectos.push(efectos[i].value);
    }

    const obj_ult = {
        name: HabilidadUlt.querySelector("#ult_nombre").value,
        ult_description: HabilidadUlt.querySelector("#ult_descripcion").value,
        target: HabilidadUlt.querySelector("#ult_objetivo").value,
        effects: obj_ult_efectos
    }

    const objeto_editar_monstruo = {
        old_name: Nombre_antiguo,
        new_name: Nombre.value,
        number: ID.value,
        elements: obj_elementos,
        rarity: Rareza.value,
        generation: generacion.value,
        description: Descripcion.value,
        books: obj_libros,
        egg: PreviewImagenHuevo.src,
        baby: PreviewImagenBebe.src,
        teen: PreviewImagenTeen.src,
        adult: PreviewImagenPrincipal.src,
        traits: obj_atributos,
        relics: obj_reliquias,
        stats: obj_stats,
        skillset: obj_skills,
        ult_ability: obj_ult
    }
    
    console.log(objeto_editar_monstruo);

    fetch(url_endpoint + "/EditarMonstruo", {
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
});

function AgregarHabilidad(){
    const clon_skills = PlantillaHabilidad.cloneNode(true);
    ContenedorHabilidades.appendChild(clon_skills);
}

const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
function limpiarCampos(){
    for(i = 0; i < inputs.length; i++){
        inputs[i].value = null;
    }
    for(i = 0; i < selects.length; i++){
        selects[i].value = null;
    }

}