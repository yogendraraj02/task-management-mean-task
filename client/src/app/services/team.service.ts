import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.apiUrl+'/api/task'; // Replace with your API endpoint
  constructor(private http : HttpClient) { }

  getTeamLeaders(managerId: string): Observable<{status:string,message:string,data:User[]}> {
    return this.http.get<{status:string,message:string,data:User[]}>(`${this.apiUrl}/get-teamleads?managerId=${managerId}`);
  }

  getEmployees(leadId: string): Observable<{status:string,message:string,data:User[]}> {
    return this.http.get<{status:string,message:string,data:User[]}>(`${this.apiUrl}/get-employees?leadId=${leadId}`);
  }
}
