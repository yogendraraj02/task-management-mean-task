// auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  guestCredentials = {
    email: 'guest@example.com',
    password: 'guest123'
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
  }

  ngOnInit() {
    // // Auto-navigate to dashboard if already logged in
    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    ).subscribe({
      next: (val) => {
        this.loginForm.reset();
        this.storageService.saveUserName(val.data.username);
        this.storageService.saveUserInfo(val.data);
        this.storageService.saveToken(val.data.access_token);
        


        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  get f() { return this.loginForm.controls; }

}
