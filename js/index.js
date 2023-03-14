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

const comida={
    "desayuno":"Breakfast",
    "cena": "Dinner",
    "comida":"Lunch",
    "snack":"Snack",
    "horaTe":"teatime"
}

const tipoComida = {
    "pancake":"Pancake",
    "Desserts":"Desserts",
    "Drinks":"Drinks",
    "PlatoPrincipal":"Main course",
    "Salad":"Salad",
    "Sandwiches":"Sandwiches",
    "Soup":"Soup",
    "SideDish":"Side dish",
    "Started":"Starter",
    "Sweets":"Sweets",
    "Cereals":"Cereals"
}






function createBaseUrl(){
let url = new URL("https://api.edamam.com/api/recipes/v2")
url.searchParams.set("app_id","9e4c1756")
url.searchParams.set("app_key","b7160e542d15bf0f3fecd2623912cd8b")
return url
}


async function obtenerResultados(url){
  let recipes = await fetch(url.href)
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


  
async function mostrarComida(url){

  let recipes = await obtenerResultados(url);
  document.getElementById("platosRicos").innerHTML ="";
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
    document.getElementById("platosRicos").appendChild(article);
  });
 }


/*  */

document.getElementById("botonFiltrarPlatos").addEventListener("click", filtrar) 

function filtrar(){
  let url = createBaseUrl()
  url.searchParams.set("type","public")
  let pais = document.getElementById("paisplatos").value;
  url.searchParams.set("cuisineType",paises[pais] )
  let comidas = document.getElementById("comidaplatos").value;
  url.searchParams.set("mealType", comida[comidas] )
  let tipoComidas = document.getElementById("tipocomidaplatos").value;
  url.searchParams.append("dishType", tipoComida[tipoComidas] )
  let health = document.getElementById("healthplatos").value;
  if(healthy[health]!=""){
    url.searchParams.append("health", healthy[health] )
  }
  mostrarComida(url)
  console.log(url.href);
}

/* document.getElementById("paisplatos").addEventListener("change", filtrarPaises)

function filtrarPaises(){
  let pais = document.getElementById("paisplatos").value;
  url.searchParams.set("cuisineType",paises[pais] )
  if(url.searchParams.get("mealType")=== null)return
  if(url.searchParams.get("dishType")=== null)return
  if(url.searchParams.get("health")=== null)return
  
  mostrarComida(url);
  console.log(url.href);

}

*/
/* document.getElementById("comidaplatos").addEventListener("change", filtrar)

function filtrarComida(){
  let comidas = document.getElementById("comidaplatos").value;
  url.searchParams.set("mealType", comida[comidas] )
  if(url.searchParams.get("cuisineType")=== null)return
  if(url.searchParams.get("dishType")=== null)return
  if(url.searchParams.get("health")=== null)return

  mostrarComida(url);
  console.log(url.href);
}

document.getElementById("tipocomidaplatos").addEventListener("change", filtrarTipoComida)

function filtrarTipoComida(){
  let tipoComidas = document.getElementById("tipocomidaplatos").value;
  url.searchParams.append("dishType", tipoComida[tipoComidas] )
  if(url.searchParams.get("cuisineType")=== null)return
  if(url.searchParams.get("mealType")=== null)return
  if(url.searchParams.get("health")=== null)return

  mostrarComida(url);
  console.log(url.href);
}

document.getElementById("healthplatos").addEventListener("change", filtrarhealthComida)

function filtrarhealthComida(){
  let health = document.getElementById("healthplatos").value;
  if(healthy[health]!=""){
    url.searchParams.append("health", healthy[health] )
  }
  if(url.searchParams.get("cuisineType")=== null)return
  if(url.searchParams.get("mealType")=== null)return
  if(url.searchParams.get("dishType")=== null)return

  mostrarComida(url);
  console.log(url.href);
} */