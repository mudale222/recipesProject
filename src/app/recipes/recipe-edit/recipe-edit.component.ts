import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  recipeForm: FormGroup
  // recipes: Recipe[]

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm()
    this.route.params.subscribe((params: Params) => {
      console.log(params)
      this.id = +params['id']
      this.editMode = params['id'] != null ? true : false
      this.initForm()
    })

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required])
        //, Validators.pattern("/^[1-9]+[0-9]*$/")])   /^[1-9]\d*$/
      })
    )
  }

  private initForm() {
    let name = '', imagePath = '', description = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const currentRecipe = this.recipeService.getRecipe(this.id)
      name = currentRecipe.name
      imagePath = currentRecipe.imagePath
      description = currentRecipe.description
      if (currentRecipe['ingredients']) {
        for (let ingredient of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required])//, Validators.pattern("/^[1-9]+[0-9]*$/")])
            })
          )
        }
      } else {

      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    console.log(this.recipeForm)
    // const recipe = new Recipe(
    //   this.recipeForm['name'],
    //   this.recipeForm['description'],
    //   this.recipeForm['imagePath'],
    //   this.recipeForm['ingredients']
    // )
    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    else
      this.recipeService.addRecipe(this.recipeForm.value)
    this.onCancelOrSaveClicked()
  }

  onCancelOrSaveClicked() {
    // this.router.navigate([linkClicked]);
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
