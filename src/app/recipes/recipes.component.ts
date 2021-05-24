import { Component, Input, OnInit } from '@angular/core';
// import { Recipe } from './recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService],
})
export class RecipeBookComponent implements OnInit {
  // selectedRecipe: Recipe;

  constructor(/*private recipeService: RecipeService*/) {}

  // recipeClicked(recipe) {
  //   console.log("recipe clicked: " + JSON.stringify(recipe))
  // }

  ngOnInit(): void {
    // this.recipeService.recipeClikedEventEmmiter.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
      // console.log(recipe)
    // });
  }
}
