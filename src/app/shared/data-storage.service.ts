import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // authKey: string

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {
    // this.authService.user.subscribe(user => this.authKey = user.token)
  }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://ng-course-recipe-book-f49e3-default-rtdb.firebaseio.com/recipes.json',
      recipes//,      {        params: new HttpParams().set('auth', this.authKey)      }
    ).subscribe(res => {
      console.log("Save data response: ", res)
    })
  }

  // fetchRecipes() {
  //   this.authService.user.pipe(take(1), exhaustMap(user => {
  //     return this.http.get('https://ng-course-recipe-book-f49e3-default-rtdb.firebaseio.com/recipes.json',
  //       {
  //         params: new HttpParams().set('auth', user.token)
  //       }
  //     )
  //   })).pipe(map((recipes: Recipe[]) => {
  //     console.log(recipes)
  //     return recipes.map(recipe => {
  //       return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
  //     })
  //   }), tap(res => {
  //     this.recipeService.setRecipes(res)
  //   }))
  // }
  fetchRecipes() {

    return this.http.get<Recipe[]>(
      'https://ng-course-recipe-book-f49e3-default-rtdb.firebaseio.com/recipes.json',
      // {
      //   params: new HttpParams().set('auth', user.token)
      // }
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
