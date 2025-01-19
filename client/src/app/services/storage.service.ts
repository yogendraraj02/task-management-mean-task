import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserInfo } from '../models/user';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN = 'zigglu_refresh_token';
const USER_NAME = 'user_name';
const USER_INFO = 'user_info';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router : Router) { }

  saveToken(token : string){
    localStorage.setItem(ACCESS_TOKEN_KEY , token)
  }
 
  getToken() : string | null{
    return localStorage.getItem(ACCESS_TOKEN_KEY) as string;
  }


  saveUserName(name: string) {
    localStorage.setItem(USER_NAME , name)
  }

  saveUserInfo(json: LoginUserInfo){
    localStorage.setItem(USER_INFO , JSON.stringify(json))
  }
  getUserInfo(){
    return localStorage.getItem(USER_INFO)
  }

  removeAuthToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  signOut(){
    this.removeAuthToken();
    this.router.navigateByUrl('/');
  }


}
