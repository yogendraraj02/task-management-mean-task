import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const currentUser = this.authService.currentUserValue;
    console.log(`auth guard: currentUser`,currentUser);
    
    if (currentUser && currentUser._id) {
      return true;
    }
    console.log(`not authenticated`);
    
    this.router.navigate(['/login']);
    return false;
  }
}
