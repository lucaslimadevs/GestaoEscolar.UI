import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RegisterUserCommand } from '../Models/comands/register-user-command';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.urlApi}/api/Auth/login`, { email, password });
  }

  register(user: RegisterUserCommand) {
    return this.http.post(`${environment.urlApi}/api/Auth/RegisterUser`, user);
  }

  buscarUsuarios() {
    return this.http.get(`${environment.urlApi}/api/Auth/Usuarios`);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null && !this.isTokenExpired();
  }

  saveTokenInfo(data: any) {
    localStorage.setItem('token', data.accessToken);
    const expiresIn = Number(data.expiresIn);    
    const expirationDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('expirationDate', expirationDate.toString());
  }

  private isTokenExpired(): boolean {
    const expirationDate = Number(localStorage.getItem('expirationDate'));      

    if (!expirationDate) {
      return true;
    }
    const expiration = new Date(Number(expirationDate));
    return expiration.getTime() <= new Date().getTime();
  }
}
