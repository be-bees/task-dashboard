import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskService } from '../task.service';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, TaskListComponent, AsyncPipe],
  template: `
    <mat-toolbar color="primary">
      <span>Task Dashboard</span>
      <a mat-button routerLink="/board/default">Default Board</a>
    </mat-toolbar>
    <div class="container-fluid p-3"> <!-- Bootstrap responsive -->
      <div class="row">
        <div class="col-md-3"> <!-- Sidebar -->
          <h3>Boards</h3>
          <ul class="list-group">
            <li class="list-group-item"><a routerLink="/board/default">Default</a></li>
            <li class="list-group-item"><a routerLink="/board/work">Work</a></li>
          </ul>
        </div>
        <div class="col-md-9">
          <router-outlet></router-outlet> <!-- Task list here -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid { background: #f8f9fa; min-height: 100vh; }
    @media (max-width: 768px) {
      .row > div { margin-bottom: 1rem; } 
    }
  `]
})
export class DashboardComponent {}