import { Component, input, inject } from '@angular/core'; // input() for Angular 17+ signals
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatCheckboxModule, MatInputModule, FormsModule, TaskItemComponent, AsyncPipe],
  template: `
  <div class="task-container">
    <mat-form-field appearance="outline" class="task-input">
      <mat-label>New Task</mat-label>
      <input matInput [(ngModel)]="newTaskTitle" placeholder="Enter task title" />
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="addTask()" [disabled]="!newTaskTitle">Add Task</button>
  </div>
  <mat-list>
    <app-task-item *ngFor="let task of tasks$ | async" [task]="task" (toggle)="updateTask($event)" (delete)="deleteTask($event)"></app-task-item>
  </mat-list>
`,
  styles: [`
    .task-container {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 1rem;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .task-input {
      flex-grow: 1;
    }
    button {
      white-space: nowrap;
    }
    mat-list {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class TaskListComponent {
  boardId = input<string>('default'); // Signal input
  private taskService = inject(TaskService);
  newTaskTitle = '';
  tasks$ = this.taskService.getTasks(this.boardId());

  addTask() {
    if (this.newTaskTitle) {
      this.taskService.addTask({ title: this.newTaskTitle,completed:false, boardId: this.boardId() }).subscribe(() => {
        this.tasks$ = this.taskService.getTasks(this.boardId());
        this.newTaskTitle = '';
      });
    }
  }

  updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask.id, { completed: updatedTask.completed }).subscribe(() => {
      this.tasks$ = this.taskService.getTasks(this.boardId());
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks$ = this.taskService.getTasks(this.boardId());
    });
  }
}