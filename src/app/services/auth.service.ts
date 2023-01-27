import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5299/api/User/";

  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  logout() {
    localStorage.clear();

    this.router.navigate(["login"]);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem("token", tokenValue);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    // !! will return true if there is a value for 'token'
    // else returns false
    return !!localStorage.getItem("token");
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("token")!;

    return jwtHelper.decodeToken(token);
  }

  getNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getEmailFromToken() {
    if (this.userPayload)
      return this.userPayload.email;
  }

}
