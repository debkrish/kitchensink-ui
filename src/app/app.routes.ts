import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { Members } from './members/members';
import { Login } from './auth/login/login';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'members', component: Members, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: '**', component: NotFound }
];
