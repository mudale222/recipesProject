import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true
  isLoading = false
  error: string = null;
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost: PlaceHolderDirective

  constructor(private authService: AuthService,
    private router: Router,
    private compFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    this.isLoading = true
    console.log(form.value)
    if (!form.value) {
      console.log("FORM NOT VALID!")
      return
    }

    let authObs = new Observable<AuthResponseData>();


    if (this.isLoginMode)
      authObs = this.authService.login(form.value.email, form.value.password)
    else
      authObs = this.authService.signUp(form.value.email, form.value.password)

    authObs.subscribe(authRes => {
      console.log("auth res: ", authRes)
      this.isLoading = false
      this.router.navigate(['/recipes'])
    }, error => {
      console.log('auth error: ', error)
      this.error = error
      this.isLoading = false
      // this.showErrorAlert(error)
      this.router.navigate(['/recipes'])
    })

    form.reset()
  }

  onHandeleError() {
    this.error = null
  }

  // private showErrorAlert(message: string) {
  //   const alertFactory = this.compFactoryResolver.resolveComponentFactory(AlertComponent)
  //   const hostViewContainerRef = this.alertHost.viewContainerRef
  //   hostViewContainerRef.clear()
  //   const compRef = hostViewContainerRef.createComponent(alertFactory)
  //   compRef.instance.message = message
  //   compRef.instance.close.subscribe(()=>{
  //     hostViewContainerRef.clear()
  //   })
  // }
}
