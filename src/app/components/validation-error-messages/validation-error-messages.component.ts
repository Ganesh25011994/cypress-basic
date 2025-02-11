import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-error-messages',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './validation-error-messages.component.html',
  styleUrl: './validation-error-messages.component.scss'
})
export class ValidationErrorMessagesComponent {
  
  @Input() formData: { formName: FormGroup, fieldName: string | undefined, validation_messages: [{ type: string | undefined, message: string | undefined }] } = { 
    formName: new FormGroup({}), 
    fieldName: '', 
    validation_messages: [{type: '', message: ''}] 
  };
  
  
  constructor() {
    
   }
}
