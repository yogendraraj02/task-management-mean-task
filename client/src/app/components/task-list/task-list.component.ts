import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  onEdit(task: Task): void {
    this.editTask.emit(task); // Notify parent
  }

  onDelete(taskId: string): void {
    this.deleteTask.emit(taskId); // Notify parent
  }
}
