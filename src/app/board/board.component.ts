import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  template: '<app-task-list [boardId]="boardId"></app-task-list>'
})
export class BoardComponent {
  private route = inject(ActivatedRoute);
  boardId = this.route.snapshot.paramMap.get('id') || 'default';
}
