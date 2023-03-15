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
        ingredients: food.recipe.ingredients.map(ingredient =>ingredient.text)
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
    let label2 = recipe.ingredients.join(", ");
    let formateingredients = `${label2}`;
    let linkReceta = recipe.linkReceta;
    let ingredientes = document.createElement("p");
    let titulo = document.createElement("h3");
    let imagenComida= document.createElement("img");
    let link = document.createElement("a");
    imagenComida.src = recipe.imagen
    titulo.innerText = formateLabel;
    ingredientes.innerText = formateingredients;
    article.appendChild(link);
    link.appendChild(titulo);
    link.appendChild(imagenComida);
    link.appendChild(ingredientes);
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