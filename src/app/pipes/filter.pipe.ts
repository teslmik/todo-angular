import { Pipe, PipeTransform } from '@angular/core';

import { ITodo } from '../interfaces/todo';

@Pipe({
  name: 'filterTodos',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    todos: (ITodo & { edited: boolean })[],
    search: string,
    completed: 'all' | 'complete' | 'incomplete' = 'all'
  ) {
    if (search.length === 0 && completed === 'all') {
      return todos;
    }

    return todos.filter(
      (todo) =>
        todo.todo.toLowerCase().includes(search.toLowerCase()) &&
        (completed === 'all' ||
          (completed === 'complete' && todo.completed) ||
          (completed === 'incomplete' && !todo.completed))
    );
  }
}
