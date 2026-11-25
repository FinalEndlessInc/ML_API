const PlantillaTarjeta = document.querySelector(".TarjetaMonstruo");
const ContenedorTarjetas = document.querySelector("#ConjuntoMonstruos");

PlantillaTarjeta.remove();

fetch(url_endpoint + "/MonstruosRandom").then(recurso => recurso.json()).then( monstruos => {
    console.log(monstruos);
    for(i = 0; i < monstruos.length; i++){
        const clon_tarjeta = PlantillaTarjeta.cloneNode(true);
        ContenedorTarjetas.appendChild(clon_tarjeta);

        const TarjetaNombre = clon_tarjeta.querySelector(".NombreTarjetaMonstruo");
        TarjetaNombre.innerHTML = monstruos[i].number + ". " + monstruos[i].name;

        clon_tarjeta.style.backgroundImage = "url("+ monstruos[i].sprite +")";

        const Elemento = clon_tarjeta.querySelector(".ElementosMonstruo");

        if(monstruos[i].elements.length == 2){
            console.log("Elemento doble detectado");
            const clon_elementos = Elemento.cloneNode(true);
            const Cont_abajo = clon_tarjeta.querySelector(".ApartadoAbajo");

            Cont_abajo.appendChild(clon_elementos);
            AgregarElemento(clon_elementos, monstruos[i].elements[1]);
        }

        AgregarElemento(Elemento, monstruos[i].elements[0]);
    }
});

function AgregarElemento(objeto_ha_cambiar, elemento){
    console.log("Entramos a la funcion");
    console.log(objeto_ha_cambiar);
    switch(elemento){
        case "Fire":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-fire.webp')";
        break;
        case "Nature":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-nature.webp')";
        break;
        case "Water":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-water.webp')";
        break;
        case "Thunder":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-thunder.webp')";
        break;
        case "Earth":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-earth.webp')";
        break;
        case "Light":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-light.webp')";
        break;
        case "Dark":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-dark.webp')";
        break;
        case "Magic":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-magic.webp')";
        break;
        case "Metal":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-metal.webp')";
        break;
        case "Special":
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-legendary.webp')";
        break;
        
        default:
            objeto_ha_cambiar.style.backgroundImage = "url('./img/Ic-fire.webp')";
        break;
    }
}

/*const ApartadoMonstruoPrueba = document.querySelector("#apartado_monstruo_prueba");
const EditarMonstruo = document.querySelector("#editar_monstruo");

const direccion = "http://localhost:3001/monstergram/";

function BuscarMonstruo(){
    const boton_input = document.querySelector("input");

    fetch(direccion + boton_input.value).then(recurso => recurso.json()).then( monstruo => {
        ApartadoMonstruoPrueba.style.display = "block";

        const nombre_monstruo = ApartadoMonstruoPrueba.querySelector(".nombre");
        nombre_monstruo.innerHTML = "Nombre: " + monstruo.name;
    });
}*/

