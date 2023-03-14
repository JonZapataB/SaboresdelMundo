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
    "Normal":"a",
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
    "Started":"Started",
    "Sweets":"Sweets"
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
        imagen: food.recipe.image
      }
    })
    })
  console.log(recipes);
  return recipes;
}


  
async function mostrarComida(url){

  let recipes = await obtenerResultados(url);
  let article = document.createElement("article");
  recipes.forEach(recipe =>{
    let label = recipe.name;
    let formateLabel = `${label}`;
    let titulo = document.createElement("h3");
    let imagenComida= document.createElement("img");
    imagenComida.src = recipe.imagen
    titulo.innerText = formateLabel;
    article.appendChild(titulo)
    article.appendChild(imagenComida);
  });
  document.getElementById("platosRicos").appendChild(article);
  return article;
 }

 /* let pais = document.getElementById("botonpais").value;
let health = document.getElementById("health").value;
let comidas = document.getElementById("comidas").value;
let tipoComidas = document.getElementById("tipoComidas").value; */
let url = createBaseUrl()
url.searchParams.set("type","public")
url.searchParams.append("health","vegan"/* healthy[health] */)
url.searchParams.append("cuisineType","American"/* paises[pais] */)
url.searchParams.append("mealType","Dinner"/* comida[comidas] */)
url.searchParams.append("dishType","Main course"/* tipoComida[tipoComidas] */)
mostrarComida(url);
/*   function crearFood(food){
        let nombre = food.label
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        ul.appendChild(li);
        document.getElementById("body").appendChild(ul);
        let ul2=mostrarComida(food.recipes);
        document.getElementById("body").appendChild(ul2);
   
     }     */