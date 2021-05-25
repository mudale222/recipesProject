import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutingModule } from './app-routing-module';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shoppingList.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective,
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    // RecipesModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    // HttpModule
  ],
  providers: [ShoppingListService, RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
