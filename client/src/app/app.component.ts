import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-management-app';

  role : "manager"  | "teamLead " | "employee" = "manager";
  isSenior(): boolean {
    return this.role !== 'employee';
  }

  constructor(private router: Router, private storageService : StorageService) {}

  get isTeamManagementPage(): boolean {
    return this.router.url === '/team-management';
  }

  get isloginOrRegisterPage() : boolean{
    return this.router.url == '/login' || this.router.url == '/reigster'
  }

  logout(){
    console.log(`TODO : logout`);
     this.storageService.removeAuthToken();
     this.router.navigateByUrl("/");
  }
}
