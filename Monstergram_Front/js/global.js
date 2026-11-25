const url_endpoint = "http://localhost:3001";
const direccion = "http://localhost:3001/monstergram/";

const logo_boton = document.querySelector("#LogoPagina");
const BTN_Buscar = document.querySelector("#BotonBuscar");

const ListaDespegable = document.getElementById("ListaEdicion");
ListaDespegable.style.display = "none";

logo_boton.addEventListener("click", ()=>{
    window.location = "index.html";
});

function DesplegarLista(){
    
    if(ListaDespegable.style.display == "none"){
        ListaDespegable.style.display = "flex";
        return;
    }
    

    if(ListaDespegable.style.display == "flex"){
        ListaDespegable.style.display = "none";
    }
};

BTN_Buscar.addEventListener("click", ()=>{
    const buscar = document.querySelector("#InputBuscarMonstruo");

    fetch(direccion + buscar.value).then(recurso => {
        recurso.json().then( monstruo =>{
            if(recurso.status == 404){
                alert(monstruo.message);
                return;
            }
            sessionStorage.setItem("monstruo_buscar", monstruo.name);
            window.location = "view.html";
        });
    });
});