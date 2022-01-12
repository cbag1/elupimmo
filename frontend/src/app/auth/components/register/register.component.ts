import { Router } from '@angular/router';
import { AuthServiceService } from './../../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  SignupForm: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.SignupForm = new FormGroup({
      prenom: new FormControl(''),
      nom: new FormControl(''),
      telephone: new FormControl(''),
      adresse: new FormControl(''),
      cni:new FormControl(''),
      profil: new FormControl('/api/profils/2'),
      type: new FormControl('client'),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  signupProcess() {
    if (this.SignupForm.valid) {
      console.log(this.SignupForm.value);

      this.authService.signupClient(this.SignupForm.value).subscribe(result => {
        if (result) {
          console.log("C'est bon");
        }
        else {
          console.log("Pas bon");
        }

      })
    }
  }

}
