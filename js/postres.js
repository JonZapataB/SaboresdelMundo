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
    let ingredientes = document.createElement("p");
    let titulo = document.createElement("h3");
    let imagenComida= document.createElement("img");
    imagenComida.src = recipe.imagen
    titulo.innerText = formateLabel;
    ingredientes.innerText = formateingredients
    article.appendChild(titulo)
    article.appendChild(imagenComida);
    article.appendChild(ingredientes);
    document.getElementById("postresRicos").appendChild(article);
  });
}

/* let paispostre = document.getElementById("paispostres").value;
let healthpostre = document.getElementById("healthpostre").value; */
let url1 = createBaseUrl()
url1.searchParams.set("type","public")
url1.searchParams.set("dishType","Desserts")
url1.searchParams.set("dishType","Sweets")
url1.searchParams.set("dishType","pancake")

document.getElementById("paispostres").addEventListener("change", filtrarPaisesPostre)

function filtrarPaisesPostre(){
  let paispostre = document.getElementById("paispostres").value;
  url1.searchParams.set("cuisineType",paises[paispostre] )
  if(url1.searchParams.get("health")=== null)return
  
  mostrarPostre(url1);
  console.log(url1.href);

}

document.getElementById("healthpostres").addEventListener("change", filtrarhealthPostre)

function filtrarhealthPostre(){
  let healthpostre = document.getElementById("healthpostres").value;
  if(healthy[healthpostre]!=""){
    url1.searchParams.append("health", healthy[healthpostre] )
  }
  if(url1.searchParams.get("cuisineType")=== null)return


  mostrarPostre(url1);
  console.log(url1.href);
}