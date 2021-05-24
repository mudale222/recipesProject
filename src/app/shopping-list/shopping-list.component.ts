import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingredient[] = [];
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.shoppingListService.getIndridients();
    this.subscription =
      this.shoppingListService.shoppingListUpadeEventEmitter.subscribe(
        (newIngridients: Ingredient[]) => {
          this.ingridients = newIngridients;
        }
      );
    this.shoppingListService.ingridientChanged.subscribe(
      (newIngridients: Ingredient[]) => {
        this.ingridients = newIngridients;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index)
  }
  // addIngridient(ingredient: Ingredient) {
  // this.ingridients.push(ingredient)
  // }
}
