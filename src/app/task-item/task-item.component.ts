import { Component, input, output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListItem } from "@angular/material/list"; 
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatListItem],
  template: `
    <mat-list-item>
      <mat-checkbox [checked]="task().completed" (change)="toggleTask()">{{ task().title }}</mat-checkbox>
      <button mat-icon-button color="warn" (click)="delete.emit(task().id)">Delete</button>
    </mat-list-item>
  `
})
export class TaskItemComponent {
  task = input.required<Task>();
  toggle = output<Task>();
  delete = output<string>();

  toggleTask() {
    const updated = { ...this.task(), completed: !this.task().completed };
    this.toggle.emit(updated);
  }
}