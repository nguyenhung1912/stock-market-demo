import { Injectable } from '@angular/core';
import { StockRepository } from '../repositories/stock.repository';
import { map, Observable } from 'rxjs';
import { StockApi } from '../../model/stock-api.model';
import { Stock } from '../../model/stock';
import { Exchange } from '../../model/exchange.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private stockRepo: StockRepository) {}

  getStocks(): Observable<StockApi[]> {
    return this.stockRepo.findAll();
  }

  getStockById(id: string): Observable<StockApi> {
    return this.stockRepo.findById(id);
  }

  getFavoriteStocks(): Observable<StockApi[]> {
    return this.stockRepo.findAll().pipe(map((stocks) => stocks.filter((s) => s.favorite)));
  }

  create(stock: Stock): Observable<StockApi> {
    return this.stockRepo.create(stock);
  }

  update(id: string, stock: Stock): Observable<StockApi> {
    return this.stockRepo.update(id, stock);
  }

  patch(id: string, partial: Partial<StockApi>): Observable<StockApi> {
    return this.stockRepo.patch(id, partial);
  }

  delete(id: string): Observable<void> {
    return this.stockRepo.remove(id);
  }

  getExchanges(): Observable<Exchange[]> {
    return this.stockRepo.findAllExchanges();
  }
}
