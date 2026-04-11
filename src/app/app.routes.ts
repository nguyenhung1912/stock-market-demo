import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { StockListComponent } from './shared/stock-list/stock-list.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent ,canActivate: [guestGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

  { path: 'stocks', component: StockListComponent, canActivate: [authGuard] },
  { path: 'favorites', component: StockListComponent, canActivate: [authGuard] },
  { path: 'create', component: CreateStockReactiveComponent, canActivate: [authGuard] },
  { path: 'stock/:id', component: StockDetailsComponent, canActivate: [authGuard] },
  
  { path: '**', redirectTo: 'stocks' },

  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];