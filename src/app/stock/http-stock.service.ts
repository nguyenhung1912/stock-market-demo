import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../model/stock';

export interface StockApi {
    id?: number;
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

    constructor(private http: HttpClient) {}

    // GET
    getStocks(): Observable<StockApi[]> {
        return this.http.get<StockApi[]>(this.apiUrl);
    }

    // GET By ID
    getStockById(id: number): Observable<StockApi> {
        return this.http.get<StockApi>(`${this.apiUrl}/${id}`);
    }

    // POST
    createStock(stock: Stock): Observable<StockApi> {
        return this.http.post<StockApi>(this.apiUrl, stock);
    }

    // PUT
    updateStock(id: number, stock: Stock): Observable<StockApi>{
        return this.http.put<StockApi>(`${this.apiUrl}/${id}`, stock);
    }

    // PATCH
    patchStock(id: number, partial: Partial<StockApi>): Observable<StockApi>{
        return this.http.patch<StockApi>(`${this.apiUrl}/${id}`, partial);
    }

    // DELETE
    deleteStock(id: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
