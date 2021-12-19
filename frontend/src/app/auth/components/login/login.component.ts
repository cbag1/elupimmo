import { AuthServiceService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  loginProcess() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe(result => {
        if (result) {
          console.log("C'est bon");
          console.log(result['token']);
          var token_decode = jwt_decode(result['token']);
          console.log(token_decode);
          localStorage.setItem('id', token_decode['id']);
          console.log((localStorage.getItem('id')));
        }
        else {
          console.log("Pas bon");
        }
        // var token_decode = jwt_decode(result['token']);


        // switch (token_decode['roles'][0]) {
        //   case "ROLE_Admin":
        //     this.router.navigate(['/admin']);
        //     break;
        // }

      })
    }
  }

}
