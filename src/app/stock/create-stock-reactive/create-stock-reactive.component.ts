import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../../model/stock';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-stock-reactive',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.component.html',
  styleUrl: './create-stock-reactive.component.css',
})
export class CreateStockReactiveComponent {
  stockForm!: FormGroup;
  @Output() stockCreated = new EventEmitter<Stock>();

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
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
    if (this.stockForm.valid) {
      const formValues = this.stockForm.value;
      const newStock = new Stock(
        formValues.name,
        formValues.code,
        formValues.price,
        0,
        false,
        formValues.exchange,
      );

      this.stockCreated.emit(newStock);
      this.toastr.success(`Stock created successfully: ${formValues.code}`);

      this.stockForm.reset({ price: 0, exchange: 'NASDAQ' });
    } else {
      this.stockForm.markAllAsTouched();
    }
  }
}
