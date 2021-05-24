import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() eventAddIngredient = new EventEmitter<Ingredient>();
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm
  subs: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subs = this.shoppingListService.startEditing.subscribe((index: number) => {
      this.editedItemIndex = index
      this.editMode = true
      this.editedItem = this.shoppingListService.getIngridient(index)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm) {//(ingredient: Ingredient) {
    // const ingName = this.nameInputRef.nativeElement.value
    // const ingAmount = this.amountInputRef.nativeElement.value
    // this.eventAddIngredient.emit(newIng)
    // this.shoppingListService.addIngredient(ingredient)
    // this.eventAddIngredient.emit(ingridient)
    const value = form.value
    const itemToAdd = new Ingredient(value.name, value.amount)
    if (this.editMode)
      this.shoppingListService.updateIngridient(this.editedItemIndex, itemToAdd)
    else
      this.shoppingListService.addIngredient(itemToAdd)
    // this.editMode = false
    // form.reset()
    this.onClear()
  }

  onClear() {
    this.editMode = false
    this.slForm.reset()
  }

  onDelete() {
    this.shoppingListService.deleteIngridient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
