import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
 if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const expectedRole = route.data?.['role']; // optional per route
  if (expectedRole && !this.auth.hasRole(expectedRole)) {
    this.router.navigate(['/unauthorized']); // redirect if role mismatch
    return false;
  }

  return true;
}
}
