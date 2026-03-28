import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private initialStocks: Stock[] = [
    new Stock('Test Stock Company', 'TSC', 85, 80, false, 'NASDAQ'),
    new Stock('Second Stock Company', 'SSC', 10, 20, false, 'NSE'),
    new Stock('Last Stock Company', 'LSC', 876, 765, false, 'NYSE')
  ]

  private stockSubject = new BehaviorSubject<Stock[]>(this.initialStocks);

  public stock$: Observable<Stock[]> = this.stockSubject.asObservable();

  getStocks(): Observable<Stock[]> {
    return this.stock$;
  }

  createStock(stock: Stock) {
    const current = this.stockSubject.getValue();
    this.stockSubject.next([stock, ...current]);
  }

  updateStock(updatedStock: Stock) {
    const current = this.stockSubject.getValue();
    const index = current.findIndex(s => s.id == updatedStock.id);
    if (index !== -1) {
      current[index] = updatedStock;
      this.stockSubject.next([...current]);
    }
  }

  deleteStock(code: string) {
    const current = this.stockSubject.getValue();
    const filtered = current.filter(s => s.code !== code);
    this.stockSubject.next([...filtered]);
  }
}
