import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StockService } from '../../core/services/stock.service';
import { catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { Stock } from '../../model/stock.model';

@Component({
  selector: 'app-stock-details',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css',
})
export class StockDetailsComponent implements OnInit {
  stock$!: Observable<Stock>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.stock$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/stocks']);
          return EMPTY;
        }
        return this.stockService.getStockById(id);
      }),
      catchError((err) => {
        console.error(err);
        this.toastr.error('Failed to load stock details');
        this.router.navigate(['/stocks']);
        return EMPTY;
      }),
    );
  }

  goBack() {
    this.router.navigate(['/stocks']);
  }
}
