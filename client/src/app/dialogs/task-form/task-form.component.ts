import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Output() taskCreated = new EventEmitter<any>(); // EventEmitter for notifying parent


  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['pending', Validators.required], 
  });

  successMessage = '';
  errorMessage = '';
  taskType: 'create' | 'edit' = 'create';
  userId: string | null = null;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'] || null;
      this.taskId = params['taskId'] || null; 

      if (this.taskId) {
        this.taskType = 'edit';
        this.loadTaskDetails(this.taskId);
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData = this.taskForm.value;
    if (this.taskType === 'create') {
      this.addTask(taskData);
    } else if (this.taskType === 'edit' && this.taskId) {
      this.updateTask(this.taskId, taskData);
    }
  }

  private loadTaskDetails(taskId: string): void {
    this.taskService.getTask(taskId).subscribe({
      next: (task:any) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load task details';
      },
    });
  }

  private addTask(task: any): void {
    this.taskService.createTask(this.userId as string, task).subscribe({
      next: (res) => {
        this.successMessage = 'Task created successfully';
        this.taskForm.reset();
        this.taskCreated.emit(); 
      },
      error: () => {
        this.errorMessage = 'Failed to create task';
      },
    });
  }

  private updateTask(taskId: string, task: any): void {
    this.taskService.updateTask({taskId, ...task}).subscribe({
      next: (res:any) => {
        this.successMessage = 'Task updated successfully';
      },
      error: () => {
        this.errorMessage = 'Failed to update task';
      },
    });
  }

  public get f() {
    return this.taskForm.controls;
  }
}
