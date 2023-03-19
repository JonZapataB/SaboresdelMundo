let menuVer = false;
//funcion que oculta o muestra el menu
function menuhamburguesa(){
    if(menuVer){
        document.getElementById("nav").classList = "";
        menuVer = false;
    }else{
        document.getElementById("nav").classList = "botonesbarra";
        menuVer = true;
    }
}
//ocultar menu una vez selecionas una opcion
function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVer = false;

}
