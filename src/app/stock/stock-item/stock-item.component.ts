import { Component, Input } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})
export class StockItemComponent {
  @Input() stock!: Stock;

  toggleFavorite(event: any) {
    this.stock.favorite = !this.stock.favorite;
  }
}
