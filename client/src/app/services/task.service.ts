import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = environment.apiUrl+'/api/task'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getTasks(userId?: number): Observable<{status:string,message:string,data:Task[]}> {
    const url = userId ? `${this.apiUrl}/task-list?userId=${userId}` : this.apiUrl+'/task-list';
    return this.http.get<{status:string,message:string,data:Task[]}>(url);
  }

  getTask(taskId?: string): Observable<{status:string,message:string,data:Task[]}> {
    const url =  `${this.apiUrl}/task-detail?taskId=${taskId}` ;
    return this.http.get<{status:string,message:string,data:Task[]}>(url);
  }

  createTask(userId:string, task: any): Observable<Task> {
    const url = userId ? `${this.apiUrl}/create-task?userId=${userId}` : this.apiUrl+'/create-task';
    return this.http.post<Task>(this.apiUrl+'/create-task', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
