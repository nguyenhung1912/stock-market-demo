import { Component, Input, OnInit } from "@angular/core";
import { Stock } from "../../model/stock";

@Component({
  selector: 'stock-item',
  templateUrl: './stock-item.component.html',
  styleUrl: './stock-item.component.css',
})

export class StockItemComponent implements OnInit{
    @Input() stocks: Stock[] = [];

    public stock!: Stock;
        
    ngOnInit(): void {
        this.stock = new Stock('Test Stock Company', 'TSC', 85, 80, false, 'NASDAQ');
    }

    toggleFavorite(event: any) {
        console.log('We are toggling the favorite state for this stock', event);
        this.stock.favorite = !this.stock.favorite;
    }
}