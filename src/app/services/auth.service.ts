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
    return !!localStorage.getItem('token');
  }
}
