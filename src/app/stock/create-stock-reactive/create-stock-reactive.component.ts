import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormBuilder, 
  FormGroup, 
  Validators,  
} from '@angular/forms';
import { Stock } from '../../model/stock'; 

@Component({
  selector: 'app-create-stock-reactive',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.component.html',
  styleUrl: './create-stock-reactive.component.css',
})
export class CreateStockReactiveComponent  {
  stockForm!: FormGroup;
  stockList: Stock[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]], 
      price: [0, [Validators.required, Validators.min(0)]],      
      exchange: ['NASDAQ', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form Value:', this.stockForm.value);
    console.log('Form Status:', this.stockForm.status);
    if(this.stockForm.invalid) {
        alert("Form chưa hợp lệ");
    } else {
        alert("Submit thành công!");
    }
  }

  onCreate() {
    if (this.stockForm.valid) {
      const formValues = this.stockForm.value;
      
      const newStock = new Stock(
        formValues.name,
        formValues.code,
        formValues.price,
        formValues.previousPrice, 
        false,            
        formValues.exchange
      );

      this.stockList.push(newStock);

      this.stockForm.reset({
        name: '',
        code: '',
        price: 0,
        exchange: 'NASDAQ'
      });
    } else {
        this.stockForm.markAllAsTouched(); 
    }
  }
}