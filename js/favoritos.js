import {getRecipes as favGetRecipes,addRecipe as favAddRecipes,deleteRecipe as favDeleteRecipes,clearMenu as clearFavorite} from "../js/menu.js";

function listFavorite(){
    let listFav = document.getElementById("favoritosRicos");
    let recipes = favGetRecipes();
    
    recipes.forEach(recipe =>{

        let article = document.createElement("article");
        
        let ul = document.createElement("ul");
        ul.setAttribute("id","ingredientesLista");
        ul.classList.add("hidden");
        recipe.ingredients.forEach(ingredient =>{
            let ingredientes = document.createElement("li");
            ingredientes.innerText = ingredient;
            ul.appendChild(ingredientes);
        })

        let ul2 = document.createElement("ul");
        ul2.setAttribute("id","alergiasLista");
        ul2.classList.add("hidden");
        recipe.allergies.forEach(allergy=>{
            let alergias = document.createElement("li");
            alergias.innerText = allergy;
            ul2.appendChild(alergias);
        })
        let img = document.createElement("img");
        img.src = recipe.imagen;
        
        let recipeltem = document.createElement("h3");
        recipeltem.innerText = recipe.name;

        let linkReceta = recipe.linkReceta;
        let link = document.createElement("a");
        link.href = linkReceta;
        link.setAttribute("target","_blank");

        let botonIngredientes = document.createElement("button");
        botonIngredientes.innerText = "  Ingredientes";
        botonIngredientes.setAttribute("class","fa-solid fa-angle-down");
        botonIngredientes.addEventListener("click", () => {
          ul.classList.toggle("hidden");
        });

        let botonAlergias = document.createElement("button");
        botonAlergias.innerText = "  Alergias";
        botonAlergias.setAttribute("class","fa-solid fa-angle-down");
        botonAlergias.addEventListener("click", () => {
            ul2.classList.toggle("hidden");
        });

        let botonEliminar = document.createElement("button");
        botonEliminar.innerText = " ";
        botonEliminar.setAttribute("class","fa-solid fa-x");
        botonEliminar.addEventListener("click",()=> {
            favDeleteRecipes(recipe)
            article.remove();
        })

        
        article.appendChild(link);
        article.appendChild(botonIngredientes);
        article.appendChild(ul);
        article.appendChild(botonAlergias);
        article.appendChild(ul2);
        article.appendChild(botonEliminar);
        link.appendChild(recipeltem);
        link.appendChild(img);

        listFav.appendChild(article);
        
    });
}
listFavorite();

