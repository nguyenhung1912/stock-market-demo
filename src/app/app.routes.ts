import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { StockListComponent } from './shared/stock-list/stock-list.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'stocks', component: StockListComponent, canActivate: [authGuard] },
  { path: 'favorites', component: StockListComponent, canActivate: [authGuard] },
  { path: 'create', component: CreateStockReactiveComponent, canActivate: [authGuard] },
  { path: 'stock/:id', component: StockDetailsComponent, canActivate: [authGuard] },
  
  { path: '**', redirectTo: 'stocks' }
];