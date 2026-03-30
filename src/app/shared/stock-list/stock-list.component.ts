import { CommonModule } from '@angular/common';
import { Stock } from './../../model/stock';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { StockItemComponent } from '../../stock/stock-item/stock-item.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StockApi } from '../../model/stock-api.model';
import { StockService } from '../../core/services/stock.service';

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
  isFavoritePage = false;
  selectedStock: Stock | null = null;

  constructor(
    private stockService: StockService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isFavoritePage = url.length > 0 && url[0].path === 'favorites';
      this.loadStocks();
    });
  }

  loadStocks() {
    this.stockService.getStocks().subscribe({
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
    let tempStocks = [...this.allStocks];
    if (this.isFavoritePage) {
      tempStocks = tempStocks.filter(s => s.favorite === true || (s.favorite as any) === 'true');
    }

    if (!this.searchText) {
      this.filteredStocks = tempStocks;
    } else {
      const lowerText = this.searchText.toLowerCase();
      this.filteredStocks = tempStocks.filter(s =>
        s.name.toLowerCase().includes(lowerText) ||
        s.code.toLowerCase().includes(lowerText)
      );
    }
  }

  viewStockDetail(stock: Stock) {
    if (stock.id) {
      this.router.navigate(['/stock', stock.id]);
    }
  }

  openUpdateDialog(stock: Stock) {
    this.selectedStock = { ...stock } as Stock;
  }

  deleteStock(code: string) {
    const stock = this.allStocks.find(s => s.code === code);
    if (!stock || stock.id == undefined) return;

    if (confirm(`Are you sure you want to delete ${code}?`)) {
      this.stockService.delete(stock.id).subscribe({
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
      const oldStockData = this.allStocks.find(s => s.id === this.selectedStock!.id);

      if (oldStockData) {
        this.selectedStock.previousPrice = oldStockData.price;
      }

      this.stockService.update(this.selectedStock.id, this.selectedStock).subscribe({
        next: () => {
          this.toastr.success('Update successful');
          this.closeDialog();
          this.loadStocks();
        },
        error: () => this.toastr.error('Update failed!')
      });
    }
  }

  onToggleFavorite(stock: Stock) {
    if (!stock.id) return;

    const newFavStatus = !(stock.favorite === true || (stock.favorite as any) === 'true');

    this.stockService.patch(stock.id, { favorite: newFavStatus }).subscribe({
      next: () => {
        this.toastr.success(newFavStatus ? 'Added to Favorites' : 'Removed from Favorites');
        this.loadStocks();
      },
      error: () => this.toastr.error('Failed to update favorite status!')
    });
  }
}
