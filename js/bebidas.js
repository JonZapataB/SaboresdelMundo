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
        ingredients: food.recipe.ingredients.map(ingredient =>ingredient.text)
      }
    })
    })
  console.log(recipes);
  return recipes;
}

async function mostrarBebida(url2){

  let recipes = await obtenerPostre(url2);
  document.getElementById("bebidasRicas").innerHTML ="";
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
    imagenComida.src = recipe.imagen;
    titulo.innerText = formateLabel;
    ingredientes.innerText = formateingredients;
    article.appendChild(link);
    link.appendChild(titulo);
    link.appendChild(imagenComida);
    link.appendChild(ingredientes);
    link.href = linkReceta;
    link.setAttribute("target","_blank");
    
    document.getElementById("bebidasRicas").appendChild(article);
  });
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