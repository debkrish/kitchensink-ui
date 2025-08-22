import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { Members } from './members/members';
import { Login } from './auth/login/login';
import { NotFound } from './not-found/not-found';
import { Register } from './register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'members', 
    component: Members, 
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' } // example role-based access
  },
  {path: 'unauthorized', loadComponent: () => import('./unauthorized/unauthorized').then(m => m.Unauthorized) },
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: '**', component: NotFound }
];
