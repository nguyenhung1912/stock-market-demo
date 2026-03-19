import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { ToastrService } from 'ngx-toastr';
import { HttpStockService } from '../http-stock.service';

@Component({
  selector: 'app-create-stock-reactive',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.component.html',
  styleUrl: './create-stock-reactive.component.css',
})
export class CreateStockReactiveComponent {
  stockForm!: FormGroup;
  public exchanges = ['AMEX', 'NASDAQ', 'NYSE'];
  @Output() stockCreated = new EventEmitter<Stock>();

  constructor(private fb: FormBuilder, private toastr: ToastrService, private httpStockService: HttpStockService) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      exchange: ['NASDAQ', Validators.required],
      confirm: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    console.log('Form Value:', this.stockForm.value);
    console.log('Form Status:', this.stockForm.status);
    if (this.stockForm.invalid) {
      alert('Form is invalid');
    } else {
      alert('Form submitted successfully!');
    }
  }

  onCreate() {
    if (this.stockForm.valid)
    {
      const value = this.stockForm.value;
      const newStock = new Stock(value.name, value.code, value.price, 0, false, value.exchange);

      this.httpStockService.createStock(newStock).subscribe({
        next: (created) => {
          this.toastr.success(`Create successful: ${created.code}`);
          this.stockForm.reset({price: 0, exchange: 'NASDAQ'})
        },
        error: () => this.toastr.error('Create stock failed!')
      });
    } else {
      this.stockForm.markAllAsTouched();
    }
  }
}
