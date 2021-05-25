import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule)
    },
    {
        path: "shopping-list",
        loadChildren: () =>
            import("./shopping-list/shoppingList.module").then(
                m => m.ShoppingListModule
            )
    },
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    }
    // {
    //     path: 'users', component: UsersComponent, children: [
    //         { path: ':id/:name', component: UsersComponent }
    //     ]
    // },
    // {
    //     path: 'servers',
    //     // canActivate: [AuthGuardService],
    //     canActivateChild: [AuthGuardService],
    //     component: ServersComponent, children: [
    //         { path: ':id', component: ServerComponent, resolve: { server: ServerResolverService } },
    //         {
    //             path: ':id/edit', component: EditServerComponent,
    //             canDeactivate: [CanDectivaeGuardService]
    //         }
    //     ]
    // },
    // { path: 'not-found', component: ErrorPageComponent, data: { message: 'page not found!' } },
    // { path: '**', component: PageNotFoundComponent }//pathMatch:full
    // {path:'users'}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }/*, { useHash: true }*/)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}