import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CreateModalComponent } from './components/create-modal/create-modal.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FiltersComponent,
    TodoListComponent,
    CreateModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAll().subscribe();
  }
}
