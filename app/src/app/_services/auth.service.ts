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
    return this.http.post('http://ec2-13-59-94-151.us-east-2.compute.amazonaws.com/api/auth', { email, password });
  }

  logout() {
    localStorage.removeItem('currentUser');
    location.replace('/login');
  }

  validateToken() {
    return this.http.get('http://ec2-13-59-94-151.us-east-2.compute.amazonaws.com/api/auth/validate');
  }

  register(user) {
    return this.http.post('http://ec2-13-59-94-151.us-east-2.compute.amazonaws.com/api/auth/register', user);
  }
}
