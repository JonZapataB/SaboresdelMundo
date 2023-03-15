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
        linkReceta: food.recipe.url,
        ingredients: food.recipe.ingredientLines
      }
    })
  })
  /* console.log(recipes); */
  return recipes;
}


  
async function mostrarComida(url){

  let recipes = await obtenerResultados(url);
  document.getElementById("platosRicos").innerHTML ="";
  recipes.forEach(recipe =>{
    let article = document.createElement("article");
    let label = recipe.name;
    let formateLabel = `${label}`;
    let linkReceta = recipe.linkReceta; 
    let ul = document.createElement("ul");
    recipe.ingredients.forEach(ingredient=>{
      let ingredientes = document.createElement("li");
      ingredientes.innerText = ingredient;
      ul.appendChild(ingredientes);
    })
    let titulo = document.createElement("h3");
    let imagenComida= document.createElement("img");
    let link = document.createElement("a");
    imagenComida.src = recipe.imagen
    titulo.innerText = formateLabel;
    article.appendChild(link);
    article.appendChild(ul);
    link.appendChild(titulo);
    link.appendChild(imagenComida);
    
    link.href = linkReceta;
    link.setAttribute("target","_blank");
    document.getElementById("platosRicos").appendChild(article);
  });
 }


/*  */

document.getElementById("botonFiltrarPlatos").addEventListener("click", filtrar) 

function filtrar(){
  let url = createBaseUrl()
  url.searchParams.set("type","public")
  url.searchParams.set("random","true");
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
