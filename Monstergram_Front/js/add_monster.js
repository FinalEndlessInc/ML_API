// Todo para editar ---------------------------------------------------------------------------------
const PaginaAgregar = document.querySelector("#Agregar_Monstruo");;
const PlantillaStats = PaginaAgregar.querySelector(".PlantillaStats");
const ContenedorStats = PaginaAgregar.querySelector("#ContenedorStadisticas");
const ContenedorHabilidades = PaginaAgregar.querySelector("#ContenedorHabilidades");
const PlantillaHabilidad = PaginaAgregar.querySelector(".PlantillaHabilidad");
const HabilidadUlt = PaginaAgregar.querySelector("#habilidad_ult");
const ContenedorAtributos = PaginaAgregar.querySelector("#ContenedorAtributos");
const Libros = PaginaAgregar.getElementsByClassName("libros");


const direccion = "http://localhost:3001/monstergram/";

const Nombre = PaginaAgregar.querySelector(".nombre");
const ID = PaginaAgregar.querySelector(".numero");
const Descripcion = PaginaAgregar.querySelector(".Descripcion");
const Elementos = PaginaAgregar.querySelector(".elementos");
const Rareza = PaginaAgregar.querySelector("#Rareza");

const Atributos = ContenedorAtributos.querySelector(".atributos");
const Btn_QuitarAtributos = ContenedorAtributos.querySelector(".quitar_atributo");

const elemento1 = PaginaAgregar.querySelector("#element1");
const elemento2 = PaginaAgregar.querySelector("#element2");
const reliquia1 = PaginaAgregar.querySelector("#reliquia1");
const reliquia2 = PaginaAgregar.querySelector("#reliquia2");
const talentos = PaginaAgregar.querySelector("#talentos");
const generacion = PaginaAgregar.querySelector("#Generacion");

const InputImagenPrincipal = PaginaAgregar.querySelector("#ImagenPrincipal");
const PreviewImagenPrincipal = PaginaAgregar.querySelector("#PreviewImagenPrincipal");

const InputImagenTeen = PaginaAgregar.querySelector("#ImagenTeen");
const PreviewImagenTeen = PaginaAgregar.querySelector("#PreviewImagenTeen");

const InputImagenBebe = PaginaAgregar.querySelector("#ImagenBebe");
const PreviewImagenBebe = PaginaAgregar.querySelector("#PreviewImagenBebe");

const InputImagenHuevo = PaginaAgregar.querySelector("#ImagenHuevo");
const PreviewImagenHuevo = PaginaAgregar.querySelector("#PreviewImagenHuevo");

const Cont_EfectosHabilidad = PaginaAgregar.querySelector(".EfectosHabilidad");
const ss_efectos = Cont_EfectosHabilidad.querySelector(".Efectos");
const btn_quitarEfectos_ss = Cont_EfectosHabilidad.querySelector(".Btn_QuitarEfecto_ss");

const Cont_EfectosUlt = PaginaAgregar.querySelector("#ult_efectos");
const ult_efectos = Cont_EfectosUlt.querySelector(".ult_efectos_");
const btn_quitarEfecto_ult = Cont_EfectosUlt.querySelector(".Btn_QuitarEfecto_ult"); 

ss_efectos.remove();
ult_efectos.remove();
btn_quitarEfectos_ss.remove();
btn_quitarEfecto_ult.remove();

PlantillaStats.remove();
PlantillaHabilidad.remove();
AgregarEstadisticas();


function AgregarAtributo(){
    const ver_atributos = ContenedorAtributos.getElementsByClassName("atributos");

    if(ver_atributos.length == 5){
        return;
    }

    const clon_atributo = Atributos.cloneNode(true);
    const clon_btn_quitar = Btn_QuitarAtributos.cloneNode(true);

    ContenedorAtributos.appendChild(clon_atributo);
    ContenedorAtributos.appendChild(clon_btn_quitar);

    clon_atributo.value = "";

    clon_btn_quitar.addEventListener("click", function(){
        clon_atributo.remove();
        clon_btn_quitar.remove();
    });

}


function AgregarEstadisticas(){
    for(i=0; i < 6; i++){
        const clon_stats = PlantillaStats.cloneNode(true);
        ContenedorStats.appendChild(clon_stats);

        const Rango = clon_stats.querySelector(".Rango");
        Rango.innerHTML = "Rank " + i;
    }
}

function AgregarHabilidad(){
    const clon_skills = PlantillaHabilidad.cloneNode(true);
    ContenedorHabilidades.appendChild(clon_skills);
    clon_skills.querySelector(".ss_nombre").value = "";
    clon_skills.querySelector(".ss_descripcion").value = "";
    clon_skills.querySelector(".ss_objetivo").value = "";  
    //clon_skills.querySelector(".Efectos").value = "";
    clon_skills.querySelector(".ss_precision").value = 0;
    clon_skills.querySelector(".ss_danio").value = 0;
    clon_skills.querySelector(".ss_costo").value = 0;
    clon_skills.querySelector(".ss_recuperacion").value = 0;

    const ContenedorEfectos = clon_skills.querySelector(".EfectosHabilidad");
    const btn_AgregarEfecto_ss = clon_skills.querySelector(".Btn_AgregarEfecto_ss");

    btn_AgregarEfecto_ss.addEventListener("click", function(){
        const clon_ss_efecto = ss_efectos.cloneNode(true);
        const clon_ss_quitar_btn = btn_quitarEfectos_ss.cloneNode(true);
        ContenedorEfectos.appendChild(clon_ss_efecto);
        ContenedorEfectos.appendChild(clon_ss_quitar_btn);
        clon_ss_efecto.value = "";
        clon_ss_quitar_btn.addEventListener("click", function(){
            clon_ss_efecto.remove();
            clon_ss_quitar_btn.remove();
        });
    });

    const btn_quitar = clon_skills.querySelector(".Btn_QuitarHabilidad");
    btn_quitar.addEventListener("click", function(){
        clon_skills.remove();
    });
}

/*function AgregarEfectos(){
    const clon_efectos = ss_efectos.cloneNode(true);
    Cont_EfectosHabilidad.appendChild(clon_efectos);
    clon_efectos.value = "";
}*/

function AgregarEfectosUlt(){
    const clon_efectos_ult = ult_efectos.cloneNode(true);
    const clon_btn_quitar = btn_quitarEfecto_ult.cloneNode(true);

    Cont_EfectosUlt.appendChild(clon_efectos_ult);
    Cont_EfectosUlt.appendChild(clon_btn_quitar);

    clon_efectos_ult.value = "";
    clon_btn_quitar.addEventListener("click", function(){
        clon_efectos_ult.remove();
        clon_btn_quitar.remove();
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


function AgregarMonstruo(){

    if(Nombre.value == "" || ID == null){
        alert("Name and ID is mandatory");
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

    var obj_sprites = {};

    if(PreviewImagenTeen.src == undefined || PreviewImagenTeen.src == "undefined" || PreviewImagenTeen.src == ""){
        obj_sprites = {
            egg: PreviewImagenHuevo.src,
            baby: PreviewImagenBebe.src,
            adult: PreviewImagenPrincipal.src
        }
    }else{
        obj_sprites = {
            egg: PreviewImagenHuevo.src,
            baby: PreviewImagenBebe.src,
            teen: PreviewImagenTeen.src,
            adult: PreviewImagenPrincipal.src
        }
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

    const objeto_agregar_monstruo = {
        name: Nombre.value,
        number: ID.value,
        elements: obj_elementos,
        rarity: Rareza.value,
        generation: generacion.value,
        description: Descripcion.value,
        books: obj_libros,
        sprites: obj_sprites,
        traits: obj_atributos,
        relics: obj_reliquias,
        stats: obj_stats,
        skillset: obj_skills,
        ult_ability: obj_ult
    }
    
    console.log(objeto_agregar_monstruo);

    fetch(url_endpoint + "/AgregarMonstruo", {
        method: "POST",
        body: JSON.stringify(objeto_agregar_monstruo)
    }).then(recurso => recurso.json().then(respuesta => {
        if(recurso.status == 404){
            alert(respuesta.message);
        }else{
            alert(respuesta.message);
            window.location.reload();
        }
    }));
};



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