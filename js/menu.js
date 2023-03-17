
export function getRecipes(){
    let recipes = localStorage.getItem("recipes");
    if(recipes === null){
        return [];
    }
    return JSON.parse(recipes);
    
}

 export function saveRecipes(recipes){
    let recipesJSON = JSON.stringify(recipes);
    localStorage.setItem("recipes",recipesJSON);
}

 export function  addRecipe(recipe){
    let recipes = getRecipes();
    console.log(recipe);
    if(inList(recipe,recipes) !== -1){
        return;
    }
    recipes.push(recipe);
    saveRecipes(recipes);
    
}

function inList(recipe,recipes){
    let index = recipes.findIndex(Element => Element.name ===recipe.name);
    return index;
}

 export function deleteRecipe(recipe){
    let recipes = getRecipes();
    let index = inList(recipe,recipes);
    if(index === -1){
        return;
    }
    recipes.splice(index,1);
    saveRecipes(recipes); 
}

export function clearMenu(){
    localStorage.clear();
}