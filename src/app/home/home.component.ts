import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StockListComponent } from "../shared/stock-list/stock-list.component";
import { CreateStockReactiveComponent } from "../stock/create-stock-reactive/create-stock-reactive.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, StockListComponent, CreateStockReactiveComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
