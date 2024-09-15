import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent {
  typeForm: FormGroup;  // تعريف typeForm كخاصية للمكون
  companies = ['Company A', 'Company B', 'Company C'];  // مثال لشركات

  constructor(
    private fb: FormBuilder,  // حقن FormBuilder
    private router: Router     // حقن Router
  ) {
    // تهيئة النموذج مباشرة داخل الـ Constructor
    this.typeForm = this.fb.group({
      companyName: ['', Validators.required],
      typeName: ['', [Validators.required, this.isTypeNameDuplicate.bind(this)]]
    });
  }

  // دالة التحقق من صحة النموذج عند الإرسال
  onSubmit(): void {
    if (this.typeForm.valid) {
      console.log('Form Submitted:', this.typeForm.value);
      // تنفيذ الإجراء بعد التحقق من صحة النموذج، مثل التوجيه
      // this.router.navigate(['/some-route']); // توجيه بعد الإرسال، إذا لزم الأمر
    } else {
      console.log('Form Invalid');
    }
  }

  // دالة التحقق من تكرار اسم النوع
  isTypeNameDuplicate(control: any): { [key: string]: boolean } | null {
    const existingTypes = ['Type A', 'Type B'];  // مثال على الأنواع الموجودة
    if (existingTypes.includes(control.value)) {
      return { duplicate: true };
    }
    return null;
  }
}
