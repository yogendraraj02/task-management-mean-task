import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Task } from '../models/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../dialogs/task-form/task-form.component';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currentUser: User;
  
  constructor(
    private taskService: TaskService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  
  

  pageOfTasks: any[] = []; // Paginated tasks for the current page
  searchTerm: string = '';
  sortProperty: string = 'id';
  sortOrder: number = 1;
  loading: boolean = false;
  
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.filterTasks(); // Initialize the filtered tasks
        this.loading = false;
      },
      error: () => {
        console.error('Failed to load tasks');
        this.loading = false;
      }
    });
  }

  onChangePage(pageOfTasks: Array<any>): void {
    this.pageOfTasks = pageOfTasks;
  }

  filterTasks(): void {
    const filteredTasks = this.searchTerm
      ? this.tasks.filter(task =>
          task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.tasks;
    this.pageOfTasks = filteredTasks; // Update the paginated tasks
  }

  // sortBy(property: string): void {
  //   this.sortOrder = property === this.sortProperty ? -this.sortOrder : 1;
  //   this.sortProperty = property;
  //   this.tasks.sort((a, b) => {
  //     const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  //     return result * this.sortOrder;
  //   });
  //   this.filterTasks(); // Reapply filtering after sorting
  // }

  sortIcon(property: string): string {
    return this.sortProperty === property
      ? this.sortOrder === 1
        ? '↑'
        : '↓'
      : '';
  }


  deleteTask(taskId: string): void {
    console.log(`Deleting task with id: ${taskId}`);
    // Call the API to delete the task
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
        this.filterTasks(); // Update the filtered list
      },
      error: () => {
        console.error('Failed to delete task');
      }
    });
  }

  editTask(task: Task): void {
    console.log('Editing task:', task);
    // Navigate to the task form with the task ID
  }
  onTaskCreated(newTask:any){
    console.log(`new task listen`);
    
    this.loadTasks();
  }
}