import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token!: string | null;

  constructor() { }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {    
    this.token = localStorage.getItem('token');    
    return this.token;
  }

}