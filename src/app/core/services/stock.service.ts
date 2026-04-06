import { Injectable } from '@angular/core';
import { StockRepository } from '../repositories/stock.repository';
import { map, Observable } from 'rxjs';
import { Exchange } from '../../model/exchange.model';
import { Stock } from '../../model/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private stockRepo: StockRepository) {}

  getStocks(): Observable<Stock[]> {
    return this.stockRepo.findAll();
  }

  getStockById(id: string): Observable<Stock> {
    return this.stockRepo.findById(id);
  }

  getFavoriteStocks(): Observable<Stock[]> {
    return this.stockRepo.findAll().pipe(map((stocks) => stocks.filter((s) => s.favorite)));
  }

  create(stock: Stock): Observable<Stock> {
    return this.stockRepo.create(stock);
  }

  update(id: string, stock: Stock): Observable<Stock> {
    return this.stockRepo.update(id, stock);
  }

  patch(id: string, partial: Partial<Stock>): Observable<Stock> {
    return this.stockRepo.patch(id, partial);
  }

  delete(id: string): Observable<void> {
    return this.stockRepo.remove(id);
  }

  getExchanges(): Observable<Exchange[]> {
    return this.stockRepo.findAllExchanges();
  }
}