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
let url2 = new URL("https://api.edamam.com/api/recipes/v2")
url2.searchParams.set("app_id","9e4c1756")
url2.searchParams.set("app_key","b7160e542d15bf0f3fecd2623912cd8b")
return url2
}

async function obtenerPostre(url2){
  let recipes = await fetch(url2.href)
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

async function mostrarBebida(url2){

  mostrarLoading();
  let recipes = await obtenerPostre(url2);
  document.getElementById("bebidasRicas").innerHTML ="";
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
    botonIngredientes.setAttribute("class","fa-solid fa-angle-down");
    botonIngredientes.addEventListener("click", () => {
      ul.classList.toggle("hidden");
  });
    let botonAlergias = document.createElement("button");
    botonAlergias.setAttribute("class","fa-solid fa-angle-down");
    botonAlergias.addEventListener("click", () => {
        ul2.classList.toggle("hidden");
    });
    let guardar = document.createElement("p");
    imagenComida.src = recipe.imagen;
    guardar.addEventListener("click",()=> addRecipe(recipe));
    titulo.innerText = formateLabel;
    guardar.setAttribute("class", "fa-solid fa-heart");
    guardar.setAttribute("id","corazon");
    guardar.innerText = " ";
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
    
    document.getElementById("bebidasRicas").appendChild(article);
  });
  finalLoading();
}


document.getElementById("botonFiltrarBebidas").addEventListener("click", filtrarBebidas) 

function filtrarBebidas(){
  let url2 = createBaseUrl()
  url2.searchParams.set("type","public")
  url2.searchParams.set("random","true")
  url2.searchParams.set("dishType","Drinks")
  let paisbebida = document.getElementById("paisbebidas").value;
  url2.searchParams.set("cuisineType",paises[paisbebida] )
  let healthbebida = document.getElementById("healthbebidas").value;
  if(healthy[healthbebida]!=""){
    url2.searchParams.append("health", healthy[healthbebida] )
  }
  mostrarBebida(url2)
  console.log(url2.href);
}

function mostrarLoading(){
  let imagenSection = document.createElement("section");
  imagenSection.id = "cargarImagen";
  let imagen = document.createElement("img");
  imagen.src = "../image/giphy.gif";
  imagenSection.appendChild(imagen);
  document.getElementById("gif").appendChild(imagenSection);
}

function finalLoading(){
  let imagen = document.getElementById("cargarImagen");
  imagen.remove();
}

import { getRecipes,addRecipe,deleteRecipe } from "./menu.js"