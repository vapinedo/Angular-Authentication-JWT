import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authSvc.login(this.formData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/special']);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Completed login request'),
    });
  }
}
