import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'board/:id', loadComponent: () => import('./board/board.component').then(m => m.BoardComponent) }
];