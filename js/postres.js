const paises={
    "America": "American",
    "Asia": "Asian",
    "Inglesa": "British",
    "Japonesa":"Japanese",
    "Francesa":"French",
    "India":"Indian",
    "Italiana":"Italian",
    "Mediterranea":"Mediterranean",
    "Mexicana":"Mexican",
    "China":"Chinese"
}

const healthy ={
    "Normal":"",
    "vegetariana":"vegetarian",
    "vegana":"vegan"
}


function createBaseUrl(){
let url1 = new URL("https://api.edamam.com/api/recipes/v2")
url1.searchParams.set("app_id","9e4c1756")
url1.searchParams.set("app_key","b7160e542d15bf0f3fecd2623912cd8b")
return url1
}

async function obtenerPostre(url1){
  let recipes = await fetch(url1.href)
  .then(response => response.json())
  .then(data => {
    return  data.hits.map(food =>{
      return{
        name: food.recipe.label,
        imagen: food.recipe.image,
        linkReceta: food.recipe.url,
        ingredients: food.recipe.ingredientLines,
        allergies: food.recipe.cautions
      }
    })
    })
  console.log(recipes);
  return recipes;
}

async function mostrarPostre(url1){

  let recipes = await obtenerPostre(url1);
  document.getElementById("postresRicos").innerHTML ="";
  recipes.forEach(recipe =>{
    let article = document.createElement("article");
    let label = recipe.name;
    let formateLabel = `${label}`;
    let linkReceta = recipe.linkReceta;
    let ul = document.createElement("ul");
    ul.setAttribute("id","ingredientesLista");
    ul.classList.add("hidden");
    recipe.ingredients.forEach(ingredient=>{
      let ingredientes = document.createElement("li");
      ingredientes.innerText = ingredient;
      ul.appendChild(ingredientes);
    })
    let ul2 = document.createElement("ul");
    ul2.setAttribute("id","AlergiasLista");
    ul2.classList.add("hidden");
    recipe.allergies.forEach(allergy=>{
      let alergias = document.createElement("li");
      alergias.innerText = allergy;
      ul2.appendChild(alergias);
    })
    let titulo = document.createElement("h3");
    let imagenComida= document.createElement("img");
    let link = document.createElement("a");
    let botonIngredientes = document.createElement("button");
    botonIngredientes.addEventListener("click", () => {
      ul.classList.toggle("hidden");
    });
    let botonAlergias = document.createElement("button");
    botonAlergias.addEventListener("click", () => {
        ul2.classList.toggle("hidden");
    });
    let guardar = document.createElement("p");
    imagenComida.src = recipe.imagen
    guardar.addEventListener("click",()=> addRecipe(recipe));
    titulo.innerText = formateLabel;
    guardar.setAttribute("class", "fa-regular fa-heart");
    guardar.innerText = " Guardar";
    botonIngredientes.innerText = "Ingredientes";
    botonAlergias.innerText = "Alergias";
    article.appendChild(link);
    article.appendChild(botonIngredientes);
    article.appendChild(ul);
    article.appendChild(botonAlergias);
    article.appendChild(ul2);
    link.appendChild(titulo);
    article.appendChild(guardar);
    link.appendChild(imagenComida);
    link.href = linkReceta;
    link.setAttribute("target","_blank");
    
    document.getElementById("postresRicos").appendChild(article);
  });
}

document.getElementById("botonFiltrarPostres").addEventListener("click", filtrarPostre) 

function filtrarPostre(){
  let url1 = createBaseUrl()
  url1.searchParams.set("type","public")
  url1.searchParams.set("random","true")
  url1.searchParams.set("dishType","Desserts")
  url1.searchParams.set("dishType","Sweets")
  url1.searchParams.set("dishType","pancake")
  let paisPostres = document.getElementById("paispostres").value;
  url1.searchParams.set("cuisineType",paises[paisPostres] )
  let healthPostre = document.getElementById("healthpostres").value;
  if(healthy[healthPostre]!=""){
    url1.searchParams.append("health", healthy[healthPostre] )
  }
  mostrarPostre(url1)
  console.log(url1.href);
}

import { getRecipes,addRecipe,deleteRecipe } from "./menu.js"