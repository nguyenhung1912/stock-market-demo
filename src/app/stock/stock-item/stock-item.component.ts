import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stock-item',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})
export class StockItemComponent {
  @Input() stock!: Stock;
  @Output() view = new EventEmitter<Stock>();
  @Output() update = new EventEmitter<Stock>();
  @Output() delete = new EventEmitter<string>();
}
