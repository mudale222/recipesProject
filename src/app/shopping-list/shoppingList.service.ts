import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  shoppingListUpadeEventEmitter = new Subject<Ingredient[]>()
  ingridientChanged = new Subject<Ingredient[]>()
  startEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 4),
  ];
  getIndridients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.shoppingListUpadeEventEmitter.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.shoppingListUpadeEventEmitter.next(this.ingredients.slice());
  }

  getIngridient(index:number) {
    return this.ingredients[index]
  }

  updateIngridient(index:number, newIngridient:Ingredient) {
    this.ingredients[index] = newIngridient
    this.ingridientChanged.next(this.ingredients.slice())
  }

  deleteIngridient(index:number) {
    this.ingredients.splice(index,1)
    this.ingridientChanged.next(this.ingredients.slice())
  }
}
