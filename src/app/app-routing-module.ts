import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  
    { path: 'auth', component: AuthComponent }
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
        RouterModule.forRoot(appRoutes/*, { useHash: true }*/)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}