import {getRecipes as favGetRecipes,addRecipes as favAddRecipes,deleteRecipe as favDeleteRecipes,clearMenu as clearFavorite} from "./modules.js";

function listFavorite(){
    let listFav = document.getElementById("listafavotiros");
    let recipes = favGetRecipes();
    let ul = document.createElement("ul");
    recipes.forEach(recipe =>{
        let img = document.createElement("img");
        img.src = recipe.image;
        
        let recipeltem = document.createElement("li");
        recipeltem.innerText = recipe.name;

        recipeltem.appendChild(img);
        ul.appendChild(recipeltem);
    });
    listFav.appendChild(ul)
}
listFavorite();