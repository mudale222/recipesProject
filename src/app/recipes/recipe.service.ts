import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipes.model";
import { Subject } from 'rxjs';

export class RecipeService {
    recipeClikedEventEmmiter = new Subject<Recipe>()
    recipeChanged = new Subject<Recipe[]>()
    // private recipes: Recipe[] = [
    //     new Recipe('hamburger', 'double burger with fries',
    //         'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7782449.jpg',
    //         [new Ingredient('burger', 2), new Ingredient('fries', 20)]
    //     )
    //     , new Recipe('pizza', 'pizza with papparoni and onions',
    //         'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F7782449.jpg',
    //         [new Ingredient('cheeze', 1), new Ingredient('papparoni', 20), new Ingredient('onions', 8)])
    // ]

    private recipes : Recipe[] = [] 

    getRecipes() {
        return this.recipes.slice()
    }
    getRecipe(index: number) {
        return this.recipes[index]
    }
    fireRecipeClickedEvent(recipe: Recipe) {
        this.recipeClikedEventEmmiter.next(recipe)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number,recipe:Recipe) {
        this.recipes[index] = recipe
        this.recipeChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1)
        this.recipeChanged.next(this.recipes.slice())
    }

    setRecipes(recipes:Recipe[]) {
        this.recipes = recipes
        this.recipeChanged.next(this.recipes.slice())
    }
}