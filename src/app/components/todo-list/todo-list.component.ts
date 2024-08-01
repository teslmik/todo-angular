import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoService } from '../../services/todo.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ITodo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FilterPipe, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  constructor(public todoService: TodoService) {}

  submit(todo: ITodo, event?: KeyboardEvent) {
    if(event && event.key !== 'Enter') {
      return
    }

    this.todoService.update(todo.id, todo.todo);
    this.todoService.disableEdit(todo.id, event);
  }
}
