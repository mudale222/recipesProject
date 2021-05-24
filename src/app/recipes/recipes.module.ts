import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipeBookComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipeBookComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
    imports:[
        RouterModule,
        // CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    // exports: [
    //     RecipeBookComponent,
    //     RecipeItemComponent,
    //     RecipeDetailComponent,
    //     RecipeListComponent,
    //     RecipesStartComponent,
    //     RecipeEditComponent,
    // ]
})
export class RecipesModule {

}