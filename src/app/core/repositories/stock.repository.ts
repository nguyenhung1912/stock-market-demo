import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StockApi } from '../../model/stock-api.model';
import { Exchange } from '../../model/exchange.model';
import { Stock } from '../../model/stock';

@Injectable({ providedIn: 'root' })
export class StockRepository {
    private stockUrl = `${environment.apiBaseUrl}/stocks`;
    private exchangeUrl = `${environment.apiBaseUrl}/exchanges`;

    constructor(private http: HttpClient) {}

    findAll(): Observable<StockApi[]> {
        return this.http.get<StockApi[]>(this.stockUrl);
    }

    findById(id: string): Observable<StockApi> {
        return this.http.get<StockApi>(`${this.stockUrl}/${id}`);
    }

    create(stock: Stock): Observable<StockApi> {
        return this.http.post<StockApi>(this.stockUrl, stock);
    }

    update(id: string, stock: Stock): Observable<StockApi> {
        return this.http.put<StockApi>(`${this.stockUrl}/${id}`, stock);
    }

    patch(id: string, partial: Partial<StockApi>): Observable<StockApi> {
        return this.http.patch<StockApi>(`${this.stockUrl}/${id}`, partial);
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${this.stockUrl}/${id}`);
    }

    findAllExchanges(): Observable<Exchange[]> {
        return this.http.get<Exchange[]>(this.exchangeUrl);
    }
}