import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'api/users'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  
}
