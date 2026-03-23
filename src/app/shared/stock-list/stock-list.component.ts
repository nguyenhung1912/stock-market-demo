import { CommonModule } from '@angular/common';
import { Stock } from './../../model/stock';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { StockItemComponent } from '../../stock/stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';
import { HttpStockService, StockApi } from '../../stock/http-stock.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private httpStockService: HttpStockService, private toastr: ToastrService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
   this.loadStocks();
  }

  loadStocks(){
    this.httpStockService.getStocks().subscribe({
      next: (data: StockApi[]) => {
        this.allStocks = data.map(s => 
          new Stock(s.name, s.code, s.price, s.previousPrice, s.favorite, s.exchange, s.id)
        );
        this.filterData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.toastr.error('Cannot connect to the API. Please check the JSON Server!');
        console.error(err);
      }
    })
  }

  onSearch() {
    this.filterData();
  }

  filterData() {
    if (!this.searchText) {
      this.filteredStocks = [...this.allStocks];
    } else {
      const lowerText = this.searchText.toLowerCase();
      this.filteredStocks = this.allStocks.filter(s =>
        s.name.toLowerCase().includes(lowerText) ||
        s.code.toLowerCase().includes(lowerText)
      );
    }
  }

  openViewDialog(stock: Stock) {
    if (stock.id){
      this.router.navigate(['/stock', stock.id]);
    }
  }

  openUpdateDialog(stock: Stock) {
    this.selectedStock = { ...stock } as Stock;
    this.dialogMode = 'update';
  }

  deleteStock(code: string) {
    const stock = this.allStocks.find(s => s.code === code);
    if (!stock || stock.id == undefined) return;

    if (confirm(`Are you sure you want to delete ${code}?`)) {
      this.httpStockService.deleteStock(stock.id).subscribe({
        next: () => {
          this.toastr.success(`Deleted ${code}`);
          this.loadStocks();
        },
        error: () => this.toastr.error('Delete failed!')
      });
    }
  }

  closeDialog() {
    this.selectedStock = null;
  }

  saveUpdate() {
    if (this.selectedStock && this.selectedStock.id !== undefined) {
      this.httpStockService.updateStock(this.selectedStock.id, this.selectedStock).subscribe({
        next: () => {
          this.toastr.success('Update successful');
          this.closeDialog();
          this.loadStocks();
        },
        error: () => this.toastr.error('Update failed!')
      });
    }
  }
}
