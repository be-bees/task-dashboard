import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For real API later
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Task } from '../app/models/task.model'; 

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = []; 

  constructor() {}

  getTasks(boardId?: string): Observable<Task[]> {
    if (!this.tasks.length) {
      this.tasks = [
        { id: '1', title: 'Sample Task 1', completed: false, boardId: 'default' },
        { id: '2', title: 'Sample Task 2', completed: true }
      ];
    }
    return of(this.tasks.filter(t => !boardId || t.boardId === boardId)).pipe(
      delay(500),
      map(tasks => tasks.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)), // Sort incomplete first
      catchError(err => throwError(() => new Error('Fetch failed: ' + err)))
    );
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = { ...task, id: Date.now().toString(), completed: false };
    this.tasks.push(newTask);
    return of(newTask).pipe(delay(300));
  }

  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updates);
    }
    return of(task!).pipe(delay(300));
  }

  deleteTask(id: string): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(void 0).pipe(delay(300));
  }
}