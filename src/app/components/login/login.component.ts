import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData = {
    email: "",
    password: ""
  };

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authSvc.login(this.formData)
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
        complete: () => console.log('Completed login request')
      })
  }

}
