import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Exchange } from '../../model/exchange.model';
import { Stock } from '../../model/stock.model';

@Injectable({ providedIn: 'root' })
export class StockRepository {
    private stockUrl = `${environment.apiBaseUrl}/stocks`;
    private exchangeUrl = `${environment.apiBaseUrl}/exchanges`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.stockUrl).pipe(
            map(stocks => stocks.map(stock => ({
                ...stock,
                favorite: stock.favorite === true || String(stock.favorite) === 'true'
            })))
        )
    }

    findById(id: string): Observable<Stock> {
        return this.http.get<Stock>(`${this.stockUrl}/${id}`);
    }

    create(stock: Stock): Observable<Stock> {
        return this.http.post<Stock>(this.stockUrl, stock);
    }

    update(id: string, stock: Stock): Observable<Stock> {
        return this.http.put<Stock>(`${this.stockUrl}/${id}`, stock);
    }

    patch(id: string, partial: Partial<Stock>): Observable<Stock> {
        return this.http.patch<Stock>(`${this.stockUrl}/${id}`, partial);
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.stockUrl}/${id}`);
    }

    findAllExchanges(): Observable<Exchange[]> {
        return this.http.get<Exchange[]>(this.exchangeUrl);
    }
}