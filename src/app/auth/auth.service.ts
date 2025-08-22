import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string, returnUrl: string = '/members') {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/api/auth/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.next(true);
        this.router.navigateByUrl(returnUrl);
      })
    );
  }

  register(username: string, password: string, roles: string[] = ['USER'], returnUrl: string = '/login') {
  return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, { username, password, roles }).pipe(
   tap(
      response => {
        if (response.message) {
          // success -> redirect with query param
          this.router.navigate([returnUrl], {
            queryParams: { registered: 'true', message: response.message }
          });
        }
      })
  );
}

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
  const token = localStorage.getItem(this.tokenKey);
  if (!token) return false;

  // Decode payload
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp * 1000; // exp is in seconds
  return Date.now() < expiry;

  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
  const token = localStorage.getItem(this.tokenKey);
  if (!token) return [];

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles: string[] = payload.roles || [];
    // Strip "ROLE_" prefix if present
    return roles.map(r => r.startsWith("ROLE_") ? r.substring(5) : r);
  } catch {
    return [];
  }
}

hasRole(role: string): boolean {
  return this.getRoles().includes(role);
}
}
