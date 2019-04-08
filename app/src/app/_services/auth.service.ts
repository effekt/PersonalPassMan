import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }

  login(email, password) {
    return this.http.post('http://localhost/api/auth', { email, password });
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.replace('/login');
  }

  validateToken() {
    return this.http.get('http://localhost/api/auth/validate');
  }

  register(user) {
    return this.http.post('http://localhost/api/auth/register', user);
  }
}
