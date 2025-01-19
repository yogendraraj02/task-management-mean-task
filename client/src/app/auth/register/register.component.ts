import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    
  
    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService
    ) {
      this.registerForm = this.formBuilder.group({
        username : ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        role : ['', Validators.required],
      });
      
    }
  
    ngOnInit() {
      // Auto-navigate to dashboard if already logged in
      // if (this.authService.currentUserValue) {
      //   this.router.navigate(['/dashboard']);
      // }
    }
  
    onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
        return;
      }
  
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (val) => {
          console.log(`register`,val);
          
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
    }
  
    get f() { return this.registerForm.controls; }
  
}
