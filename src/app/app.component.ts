import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularProjectShopping';
  linkClicked: string = 'recipes'

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin()
  }

  headerClicked(linkClicked: string) {
    this.linkClicked = linkClicked
  }
}
