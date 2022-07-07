import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData = {
    email: "",
    password: ""
  };

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {  
  }

  onRegister() {
    this.authSvc.register(this.formData)
      .subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
        complete: () => console.log('Complete register request')
      })
  }

}
