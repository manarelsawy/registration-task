import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ FormsModule , InputTextModule , ReactiveFormsModule, InputNumberModule , PasswordModule ,ToastModule , ButtonModule ,NgIf ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  private readonly _HttpClient = inject(HttpClient)
  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _messageService = inject (MessageService)
  private readonly _Router = inject (Router)

  showLogin = false;


  // studentForm!: FormGroup;


  studentForm:FormGroup = this._FormBuilder.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    age: [null, [Validators.required, Validators.min(4)]],
    password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]] ,
  });
  




  onSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      this._HttpClient.post('http://localhost:3000/signup', formData).subscribe({
        next: (res) => {
          console.log(res)
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Student registered successfully'
          });
          this.studentForm.reset();
          this.showLogin = true;

          setTimeout(()=>{
            this._Router.navigate(['/home'])
          }, 2000);
        },
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: err?.error?.message || 'Server error'
          });
        }
      });
    } else {
      this._messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please fill all required fields correctly.'
      });
    }
  }


}
