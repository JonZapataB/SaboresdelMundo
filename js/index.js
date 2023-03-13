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


let pais = document.getElementById("pais").value;
let health = document.getElementById("health").value;
let comidas = document.getElementById("comidas").value;
let tipoComidas = document.getElementById("tipoComidas").value;
let url = createBaseUrl()
url.searchParams.set("type","public")
url.searchParams.append("health",healthy[health])
url.searchParams.append("cuisineType",paises[pais])
url.searchParams.append("mealType",comida[comidas])
url.searchParams.append("dishType",tipoComida[tipoComidas])



function createBaseUrl(){
let url = new URL("https://api.edamam.com/api/recipes/v2")
url.searchParams.set("app_id","9e4c1756")
url.searchParams.set("app_key","b7160e542d15bf0f3fecd2623912cd8b")
return url
}


fetch(createBaseUrl + url)
  .then(response => response.json())
  .then(data => {
    const foods = data.MRData.hits;
    foods.forEach(food => {
      crearFood(food);
    });
    crearCarousel();

  })
  .catch(error => {
    console.log(error);
  });

  function crearFood(food){
        let nombre = food.label
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        ul.appendChild(li);
        document.getElementById("body").appendChild(ul);
  }
