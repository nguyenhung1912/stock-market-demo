import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StockService } from '../../core/services/stock.service';
import { Exchange } from '../../model/exchange.model'; 

@Component({
    selector: 'app-create-stock-reactive',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './create-stock-reactive.component.html',
    styleUrl: './create-stock-reactive.component.css',
})
export class CreateStockReactiveComponent implements OnInit {
    stockForm!: FormGroup;
    exchanges: Exchange[] = []; 

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private stockService: StockService,
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.loadExchanges();
    }

    private createForm(): void {
        this.stockForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            code: ['', [Validators.required, Validators.minLength(2)]],
            price: [0, [Validators.required, Validators.min(0)]],
            exchange: ['NASDAQ', Validators.required],
            confirm: [false, Validators.requiredTrue],
        });
    }

    private loadExchanges(): void {
        this.stockService.getExchanges().subscribe({
            next: (data) => {
                this.exchanges = data;
                if (data.length > 0) {
                    this.stockForm.patchValue({ exchange: data[0].code });
                }
            },
            error: () => this.toastr.error('Error when loading the exchange list'),
        });
    }

    onCreate(): void {
        if (this.stockForm.valid) {
            const value = this.stockForm.value;
            const newStock = new Stock(
                value.name,
                value.code,
                value.price,
                value.price,
                false,
                value.exchange,
            );

            this.stockService.create(newStock).subscribe({
                next: (created) => {
                    this.toastr.success(`Create successful: ${created.code}`);
                    this.stockForm.reset({ price: 0, exchange: 'NASDAQ' });
                },
                error: () => this.toastr.error('Create stock failed!'),
            });
        } else {
            this.stockForm.markAllAsTouched();
        }
    }
}