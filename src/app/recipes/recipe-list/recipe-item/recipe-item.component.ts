import { Component, Input, OnInit } from '@angular/core';
// import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  // @Output() recipeClicked = new EventEmitter<void>()

  constructor() { }
  @Input() index: number

  // fireEventRecipeClicked() {
  //   // this.recipeClicked.emit()
  //   this.recipeService.fireRecipeClickedEvent(this.recipe)
  // }

  ngOnInit(): void {
  }

}
