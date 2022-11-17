import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {User} from '../model/user'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

    uri : string = 'https://citenik-nodocker.azurewebsites.net/api/usuarios';


    public register(user:User):Observable<any>{
      return this.http.post<any>(
        `${this.uri}/login`,
        user)
      }

      public login(user:User):Observable<string>{
        return this.http.post(`${this.uri}/login`,
        user,
        {responseType:'text'})
      }

      public getMe():Observable<string>{
        return this.http.get(`${this.uri}/login`,
        {responseType:'text'})
      }

      public validarToken(): Observable<boolean>{
        const helper = new JwtHelperService();
        const token = localStorage.getItem('authToken')!;
        const isExpired = helper.isTokenExpired(token);

        if(!isExpired){
          return new Observable((suscriber) => {
        suscriber.next(true);
      })
    } else{
      return new Observable((suscriber) => {
        suscriber.next(false);
      });
    }
  }


}
