const ApartadoInfoGeneral = document.querySelector("#ApartadoInfoGeneral");
const ApartadoLore = document.querySelector("#ApartadoLore");
const ApartadoHabilidades = document.querySelector("#ApartadoHabilidades");

const Info_Monstruo = document.querySelector("#InfoMonstruo");

const Cnt_Botones_sprites = document.querySelector("#VerSprites");
const Btns_Imagenes = document.getElementsByClassName("Btn_Imagenes");

const Rango = document.querySelector(".Rank");
const estrellas = document.getElementsByClassName("stars");
const PlantillaStats = document.querySelector(".PlantillaStats");
const Life = PlantillaStats.querySelector(".Life");
const Power = PlantillaStats.querySelector(".Power");
const Speed = PlantillaStats.querySelector(".Speed");
const Stamina = PlantillaStats.querySelector(".Stamina");

const Ctn_Atributos = document.querySelector(".Ctn_Atributos");
const Atributo = Ctn_Atributos.querySelector(".Atributo");
Atributo.remove();

const Ctn_Reliquias = document.querySelector(".Ctn_Reliquias");
const Reliquia = Ctn_Reliquias.querySelector(".Reliquia");
Reliquia.remove();

const Descripcion = document.querySelector("#Descripcion");

const Ctn_Libros = document.querySelector("#Cnt_Libros");
const Libro = Ctn_Libros.querySelector(".Libro");
Libro.remove();

const Ctn_Habilidades = document.querySelector("#ContenedorHabilidades");
const PlantillaHabilidad = Ctn_Habilidades.querySelector(".PlantillaHabilidad");
PlantillaHabilidad.remove();

const ult = Ctn_Habilidades.querySelector("#ult");

const btn_verArchivo = document.querySelector("#Btn_VerArchivoJSON");

// Obteniendo Nombre del monstruo ha buscar
const monstruo_nombre = sessionStorage.getItem("monstruo_buscar");

const ImagenPrincipal = document.querySelector("#ImagenPrincipal");
console.log(monstruo_nombre);

fetch(direccion + monstruo_nombre).then(recurso => {
    recurso.json().then( monstruo =>{
        if(recurso.status == 404){
            alert("Monster not found or doesn't exist");
            window.location = "index.html";
            return;
        }

        Info_Monstruo.innerHTML = monstruo.number + ". " + monstruo.name;

        Btns_Imagenes[0].addEventListener("click", ()=>{
            CambiarImagen(ImagenPrincipal, monstruo.sprites.adult)
        });
        
        Btns_Imagenes[1].addEventListener("click", () => {
            CambiarImagen(ImagenPrincipal, monstruo.sprites.baby);
        });

        Btns_Imagenes[2].addEventListener("click", ()=>{
            CambiarImagen(ImagenPrincipal, monstruo.sprites.egg)
        });

        CambiarImagen(ImagenPrincipal, monstruo.sprites.adult);

        Rango.innerHTML = "Rango 0";

        Life.innerHTML = "Life: " + monstruo.stats[0].life;
        Power.innerHTML = "Power: " + monstruo.stats[0].power;
        Speed.innerHTML = "Speed: " + monstruo.stats[0].speed;
        Stamina.innerHTML = "Stamina: " + monstruo.stats[0].stamina;

        for(i=0; i < estrellas.length; i++){
            const i_ = i;
            var rango_seleccionado = 0;
            estrellas[i].addEventListener("click", () => {
                for(j=0; j< estrellas.length; j++){
                    estrellas[j].style.filter = "brightness(10%)"
                }
                if(rango_seleccionado == i_+1){
                    Rango.innerHTML = "Rank 0";

                    Life.innerHTML = "Life: " + monstruo.stats[0].life;
                    Power.innerHTML = "Power: " + monstruo.stats[0].power;
                    Speed.innerHTML = "Speed: " + monstruo.stats[0].speed;
                    Stamina.innerHTML = "Stamina: " + monstruo.stats[0].stamina;
                    rango_seleccionado = 0;
                    return;
                }
                rango_seleccionado = i_ + 1;
                Rango.innerHTML = "Rank " + rango_seleccionado;

                Life.innerHTML = "Life: " + monstruo.stats[rango_seleccionado].life;
                Power.innerHTML = "Power: " + monstruo.stats[rango_seleccionado].power;
                Speed.innerHTML = "Speed: " + monstruo.stats[rango_seleccionado].speed;
                Stamina.innerHTML = "Stamina: " + monstruo.stats[rango_seleccionado].stamina;

                for(j=0; j < rango_seleccionado; j++){
                    estrellas[j].style.filter = "brightness(100%)";
                }

            });
        }

        for(i = 0; i < monstruo.traits.length; i++){
            const clon_atributo = Atributo.cloneNode(true);
            Ctn_Atributos.appendChild(clon_atributo);

            clon_atributo.innerHTML = monstruo.traits[i];
        }

        for(i = 0; i < monstruo.relics.length; i++){
            const clon_reliquia = Reliquia.cloneNode(true);
            Ctn_Reliquias.appendChild(clon_reliquia);

            clon_reliquia.innerHTML = monstruo.relics[i];
        }

        Descripcion.innerHTML = monstruo.description;

        for(i=0; i < monstruo.books.length; i++){
            const clon_libro = Libro.cloneNode(true);
            Ctn_Libros.appendChild(clon_libro);

            clon_libro.innerHTML = monstruo.books[i];
        }

        for(i=0; i< monstruo.skillset.length; i++){
            const clon_skill = PlantillaHabilidad.cloneNode(true);
            Ctn_Habilidades.appendChild(clon_skill);

            const ss_nombre = clon_skill.querySelector(".ss_nombre");
            ss_nombre.innerHTML = monstruo.skillset[i].name;

            const ss_descripcion = clon_skill.querySelector(".ss_descripcion");
            ss_descripcion.innerHTML = monstruo.skillset[i].description;

            const ss_tipo = clon_skill.querySelector(".ss_tipo");
            ss_tipo.innerHTML = monstruo.skillset[i].ability_type;

            const ss_objetivo = clon_skill.querySelector(".ss_objetivo");
            ss_objetivo.innerHTML = "Target: " + monstruo.skillset[i].target;

            const ctn_efectos_ss = clon_skill.querySelector(".ctn_ss_efectos");
            const ss_efecto = ctn_efectos_ss.querySelector(".ss_efecto");
            ss_efecto.remove();
            for(j=0; j < monstruo.skillset[i].effects.length; j++){
                const clon_efecto = ss_efecto.cloneNode(true);
                ctn_efectos_ss.appendChild(clon_efecto);
                clon_efecto.innerHTML = monstruo.skillset[i].effects[j];
            }

            const ss_precision = clon_skill.querySelector(".ss_precision");
            ss_precision.innerHTML = "Accuracy: " + monstruo.skillset[i].accuracy + "%";

            const ss_danio = clon_skill.querySelector(".ss_danio");
            ss_danio.innerHTML = "Damage: " + monstruo.skillset[i].damage + "%";

            const ss_stamina = clon_skill.querySelector(".ss_stamina");
            ss_stamina.innerHTML = "Cost: " + monstruo.skillset[i].stamina_cost;

            const ss_recuperacion = clon_skill.querySelector(".ss_recuperacion");
            ss_recuperacion.innerHTML = monstruo.skillset[i].cooldown + " cooldown";

        }

        const ult_nombre = ult.querySelector(".ult_nombre");
        ult_nombre.innerHTML = monstruo.ult_ability.name;

        const ult_descripcion = ult.querySelector(".ult_descripcion");
        ult_descripcion.innerHTML = monstruo.ult_ability.ult_description;

        const ult_target = ult.querySelector(".ult_target");
        ult_target.innerHTML = "Target: " + monstruo.ult_ability.target;
        
        const ctn_efectos_ult = ult.querySelector(".cont_ult_efectos");
        const ult_efecto = ctn_efectos_ult.querySelector(".ult_efecto");
        ult_efecto.remove();

        for(i=0; i < monstruo.ult_ability.effects.length; i++){
            const clon_efecto = ult_efecto.cloneNode(true);
            ctn_efectos_ult.appendChild(clon_efecto);

            clon_efecto.innerHTML = monstruo.ult_ability.effects[i];
        }

        btn_verArchivo.addEventListener("click", () => {
            window.location = direccion + monstruo.name;
        });
    });
});

function CambiarImagen(ImagenPreview, Src_Imagen){
    ImagenPreview.style.backgroundImage = "url('" + Src_Imagen + "')";
}

const BTN_InfoGeneral = document.querySelector(".Pst_1");
const BTN_Lore = document.querySelector(".Pst_2");
const BTN_Habilidades = document.querySelector(".Pst_3");

BTN_InfoGeneral.addEventListener("click", () => {
    ApartadoInfoGeneral.style.display = "block";
    ApartadoLore.style.display = "none";
    ApartadoHabilidades.style.display = "none";
});

BTN_Lore.addEventListener("click", () => {
    ApartadoInfoGeneral.style.display = "none";
    ApartadoLore.style.display = "block";
    ApartadoHabilidades.style.display = "none";
});

BTN_Habilidades.addEventListener("click", () => {
    ApartadoInfoGeneral.style.display = "none";
    ApartadoLore.style.display = "none";
    ApartadoHabilidades.style.display = "block";
});