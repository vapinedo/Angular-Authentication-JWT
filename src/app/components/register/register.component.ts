import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister() {
    this.authSvc.register(this.formData).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/special']);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Complete register request'),
    });
  }
}
