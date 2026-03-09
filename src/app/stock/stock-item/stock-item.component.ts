import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})
export class StockItemComponent {
  @Input() stock!: Stock;
  @Output() view = new EventEmitter<Stock>();
  @Output() update = new EventEmitter<Stock>();
  @Output() delete = new EventEmitter<string>();

  toggleFavorite(event: any) {
    this.stock.favorite = !this.stock.favorite;
  }
}
