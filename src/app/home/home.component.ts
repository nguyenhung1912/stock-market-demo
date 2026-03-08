import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StockItemComponent } from '../stock/stock-item/stock-item.component';
import { CreateStock } from '../stock/create-stock/create-stock.component';
import { Stock } from '../model/stock';
import { StockListComponent } from "../shared/stock-list/stock-list.component";
import { CreateStockReactiveComponent } from "../stock/create-stock-reactive/create-stock-reactive.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, StockListComponent, CreateStockReactiveComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public myStocks: Stock[] = [
    new Stock('Test Stock Company', 'TSC', 85, 80, false, 'NASDAQ'),
    new Stock('Second Stock Company', 'SSC', 10, 20, false, 'NSE'),
    new Stock('Last Stock Company', 'LSC', 876, 765, false, 'NYSE')
  ]

  onStockCreated(newStock: Stock) {
    this.myStocks.unshift(newStock);
  }
}
