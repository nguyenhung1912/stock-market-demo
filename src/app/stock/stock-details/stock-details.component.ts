import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpStockService, StockApi } from '../http-stock.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stock-details.component',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css',
})
export class StockDetailsComponent implements OnInit {
  stock!: StockApi;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private httpStockService: HttpStockService, 
    private toastr: ToastrService, 
    private cdr: ChangeDetectorRef
  ){}
  
 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const stockId = params.get('id');

      if (stockId) {
        this.httpStockService.getStockById(stockId).subscribe({
          next: (data) => {
            this.stock = data;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Failed to load stock details');
            this.router.navigate(['/stocks']);
          }
        });
      }
    });
  }

  goBack(){
    this.router.navigate(['/stocks']);
  }
}
