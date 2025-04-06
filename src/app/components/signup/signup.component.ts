import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgClass, FormsModule , InputTextModule , ReactiveFormsModule, InputNumberModule , PasswordModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  formGroup!: FormGroup;
  private readonly _FormBuilder= inject(FormBuilder);


  resgisterFrom:FormGroup = this._FormBuilder.group( {
    firstName:[null ,[Validators.required ,Validators.minLength(3) , Validators.maxLength(20)]] ,
    lastName:[null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]] ,
    email:[null ,[Validators.required , Validators.email]] ,
    age:[null ,[Validators.required ,Validators.pattern(/^.{5 , 17}$/)]] ,
    password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
    
  })
  ngOnInit() {
      this.formGroup = new FormGroup({
          value: new FormControl(1234)
      });
  }

  
  
}
