import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TodoService } from './services/todo.service';
import { FiltersComponent } from './components/filters/filters.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FiltersComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAll().subscribe();
  }
}
