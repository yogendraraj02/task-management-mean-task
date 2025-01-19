import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginData, LoginUserInfo } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<LoginUserInfo>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginUserInfo>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : LoginUserInfo{
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) : Observable<LoginData>{
    return this.http.post<LoginData>(environment.apiUrl+`/api/auth/signin`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        return user;
      }));
  }

  register(user: any) {
    // Replace with your actual API endpoint
    return this.http.post(environment.apiUrl+`/api/auth/signup`, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}