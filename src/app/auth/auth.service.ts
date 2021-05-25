import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment'

export interface AuthResponseData {
  kind: string,
  email: string,
  idToken: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // user = new Subject<User>()
  user = new BehaviorSubject<User>(null)
  private timerRef
  constructor(private http: HttpClient,
    private router: Router) { }

  key: string = environment.firebaseApiKey

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.key,
        { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(resData => {
        // const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
        // const user = new User(resData.email, resData.localId, resData.idToken, expDate)
        // this.user.next(user)
        this.handleAuthentication(resData.expiresIn, resData.localId, resData.idToken, +resData.expiresIn)
      }))

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expDate)
    this.user.next(user)
    this.autoLogOut(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.key,
      { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.expiresIn, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData)
      return
    const newUser = new User(userData.email, userData.id,
      userData._token, new Date(userData._tokenExpirationDate))

    if (newUser.token) {
      const expDur = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogOut(expDur)
      this.user.next(newUser)
    }
  }

  autoLogOut(expirationDuration: number) {
    this.timerRef = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.timerRef)
      clearTimeout(this.timerRef)
    // this.router.navigate(['/auth'])
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an unknow error'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already exist!'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email DOESN'T exist!"
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Correct password blat!'
        break;
      default:
        errorMessage = 'UNKNOWN'
        break;

    }
    return throwError(errorMessage)
  }

}
