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
        ingredients: food.recipe.ingredients.map(ingredient =>ingredient.text)
      }
    })
    })
  console.log(recipes);
  return recipes;
}

async function mostrarBebida(url2){

  let recipes = await mostrarBebida(url2);
  document.getElementById("bebidasRicas").innerHTML ="";
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
    document.getElementById("bebidasRicas").appendChild(article);
  });
}

document.getElementById("botonFiltrarBebidas").addEventListener("click", filtrarBebidas) 

function filtrarBebidas(){
  let url2 = createBaseUrl()
  url2.searchParams.set("type","public")
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
/* let paisbebida = document.getElementById("paisbebidas").value;
let healthbebida = document.getElementById("healthbebida").value; */
/* let url2 = createBaseUrl()


document.getElementById("paisbebidas").addEventListener("change", filtrarPaisesPostre)

function filtrarPaisesPostre(){
  let paisbebida = document.getElementById("paisbebidas").value;
  url2.searchParams.set("cuisineType",paises[paisbebida] )
  if(url2.searchParams.get("health")=== null)return
  
  mostrarPostre(url2);
  console.log(url2.href);

}

document.getElementById("healthbebidas").addEventListener("change", filtrarhealthbebida)

function filtrarhealthbebida(){
  let healthbebida = document.getElementById("healthbebidas").value;
  if(healthy[healthbebida]!=""){
    url2.searchParams.append("health", healthy[healthbebida] )
  }
  if(url2.searchParams.get("cuisineType")=== null)return


  mostrarPostre(url2);
  console.log(url2.href);
} */