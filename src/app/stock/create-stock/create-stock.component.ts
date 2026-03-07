import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Stock } from '../../model/stock';

@Component({
  selector: 'create-stock',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.css',
})
export class CreateStock {
  public stock!: Stock;
  public confirmed = false;
  public exchanges = ['AMEX', 'NASDAQ', 'NYSE'];
  public stockList: Stock[] = [];

  constructor() {
    this.stock = new Stock('', '', 0, 0, false, 'NASDAQ');
  }

  createStock(stockForm: NgForm) {
    if (stockForm.valid && this.confirmed) {
      this.stockList.push(
        new Stock(
          this.stock.name,
          this.stock.code,
          this.stock.price,
          this.stock.previousPrice,
          this.stock.favorite,
          this.stock.exchange,
        ),
      );
      stockForm.resetForm({
        exchange: 'NASDAQ'
      });
      this.stock = new Stock('', '', 0, 0, false, 'NASDAQ');
      this.confirmed = false;
    }
  }
}
