import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipes.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() isRecipesActive = new EventEmitter<string>()
  constructor(private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  private sub: Subscription
  isAuthenticated = false

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
    this.onFetchData()
  }

  headerlinkClicked(linkClicked: string) {
    // this.isRecipesActive.emit(linkClicked)
    // this.router.navigate([linkClicked]);
  }

  onSaveData() {
    this.dataStorageService.storeRecipe()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe((data: Recipe[]) => {
      console.log(data)
    })
  }

  onLogOut() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe()
  }
}
