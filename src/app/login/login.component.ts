import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.validarToken()) {
      this.router.navigate(['/graficos']);
    }
  }

  register(user: User) {
    this.authService.register(user).subscribe();
  }

  login(user: User) {
    this.authService.login(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        this.router.navigate(['/graficos']);
      },
      error: (err) => {
        if ((err.error = 'Usuario o password incorrectas')) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectas',
          });
        }
      },
    });
  }

  // getMe(){
  //   this.authService.getMe().subscrgit ibe((username:string)=>{
  //     console.log(username)
  //   })
  // }
}
