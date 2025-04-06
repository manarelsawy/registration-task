import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
private readonly _HttpClient = inject(HttpClient)
  constructor() { }

  setRegisterForm(data:object):Observable<any>
  {
   
    return this._HttpClient.post('http://localhost:3000/signup' ,data)
  }
 
}
