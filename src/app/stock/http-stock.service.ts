import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    getStockById(id: number): Observable<StockApi[]> {
        return this.http.get<StockApi[]>(`${this.apiUrl}/${id}`);
    }
}
