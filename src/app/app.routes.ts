import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { CreateStockReactiveComponent } from './stock/create-stock-reactive/create-stock-reactive.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';
import { StockListComponent } from './shared/stock-list/stock-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full', },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'stocks', component: StockListComponent, },
  { path: 'favorites', component: StockListComponent },
  { path: 'stocks/create', component: CreateStockReactiveComponent, },
  { path: 'stock/:id', component: StockDetailsComponent, },
  { path: '**', redirectTo: '/stocks' }
];  
