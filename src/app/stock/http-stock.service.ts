import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from '../model/stock';

export interface Exchange {
    id: string;
    code: string;
    name?: string;
    country: string;
    timezone: string;
    currency: string;
}

export interface StockApi {
    id?: string;
    name: string;
    code: string;
    price: number;
    previousPrice: number;
    exchange: string;
    favorite: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpStockService {
    private apiUrl = 'http://localhost:3000/stocks';
    private exchangeApiUrl = 'http://localhost:3000/exchanges';

    constructor(private http: HttpClient) {}

    // GET
    getStocks(): Observable<StockApi[]> {
        return this.http.get<StockApi[]>(this.apiUrl);
    }

    // GET By ID
    getStockById(id: string ): Observable<StockApi> {
        return this.http.get<StockApi>(`${this.apiUrl}/${id}`);
    }

    // POST
    createStock(stock: Stock): Observable<StockApi> {
        return this.http.post<StockApi>(this.apiUrl, stock);
    }

    // PUT
    updateStock(id: string , stock: Stock): Observable<StockApi>{
        return this.http.put<StockApi>(`${this.apiUrl}/${id}`, stock);
    }

    // PATCH
    patchStock(id: string , partial: Partial<StockApi>): Observable<StockApi>{
        return this.http.patch<StockApi>(`${this.apiUrl}/${id}`, partial);
    }

    // DELETE
    deleteStock(id: string ): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getExchanges(): Observable<Exchange[]>{
        return this.http.get<Exchange[]>(this.exchangeApiUrl);
    }
}
