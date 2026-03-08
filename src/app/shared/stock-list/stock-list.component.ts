import { CommonModule } from '@angular/common';
import { Stock } from './../../model/stock';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { StockItemComponent } from '../../stock/stock-item/stock-item.component';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItemComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css',
})
export class StockListComponent {
    @Input() stocks: Stock[] = [];
}
