import { Component ,inject, OnInit  } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , InputTextModule , ReactiveFormsModule, InputNumberModule , PasswordModule ,ToastModule , ButtonModule , NgIf ,RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _HttpClient = inject(HttpClient)
  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _messageService = inject (MessageService)
  private readonly _Router = inject (Router)


  showLogin = true;

  loginForm:FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this._HttpClient.post('http://localhost:3000/login', loginData).subscribe({
        next: (res:any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
          //
          this._messageService.add({
            severity: 'success',
            summary: 'Logged In',
            detail: 'Login successful'
          });
          this.loginForm.reset();
          this._Router.navigate(['/home'])
          
          // setTimeout(()=>{
          //   this._Router.navigate(['/home'])
          // }, 2000);
        },
        error: (err) => {
          this._messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: err?.error?.message || 'Invalid credentials'
          });
        }
        
      });
    } else {
      this._messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'Please enter a valid email and password.'
      });
    }
  }
}



