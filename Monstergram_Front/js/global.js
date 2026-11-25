const url_endpoint = "http://localhost:3001";

const logo_boton = document.querySelector("#LogoPagina");

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