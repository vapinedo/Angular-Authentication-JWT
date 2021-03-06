import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  login(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
