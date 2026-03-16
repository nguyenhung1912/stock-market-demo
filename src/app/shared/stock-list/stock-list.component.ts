import { CommonModule } from '@angular/common';
import { Stock } from './../../model/stock';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { StockItemComponent } from '../../stock/stock-item/stock-item.component';
import { StockService } from '../../stock/stock.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItemComponent, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css',
})
export class StockListComponent implements OnInit {
  allStocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  searchText: string = '';

  selectedStock: Stock | null = null;
  dialogMode: 'view' | 'update' = 'view';

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStocks().subscribe((data) => {
      this.allStocks = data;
      this.filterData();
    })
  }

  onSearch() {
    this.filterData();
  }

  filterData() {
    if (!this.searchText) {
      this.filteredStocks = this.allStocks;
    } else {
      const lowerText = this.searchText.toLowerCase();
      this.filteredStocks = this.allStocks.filter(s =>
        s.name.toLowerCase().includes(lowerText) ||
        s.code.toLowerCase().includes(lowerText)
      );
    }
  }

  openViewDialog(stock: Stock) {
    this.selectedStock = stock;
    this.dialogMode = 'view';
  }

  openUpdateDialog(stock: Stock) {
    this.selectedStock = { ...stock } as Stock;
    this.dialogMode = 'update';
  }

  deleteStock(code: string) {
    if (confirm(`Are you sure you want to delete ${code}?`)) {
      this.stockService.deleteStock(code);
    }
  }

  closeDialog() {
    this.selectedStock = null;
  }

  saveUpdate() {
    if (this.selectedStock) {
      this.stockService.updateStock(this.selectedStock);
      this.closeDialog();
    }
  }
}
