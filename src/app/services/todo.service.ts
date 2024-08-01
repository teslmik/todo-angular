import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ITodo } from '../interfaces/todo';
import { TodoType } from '../interfaces/todoEdited';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todos: TodoType[] = [];
  public disabledCheckbox: boolean = false;
  public search: string = '';
  public completed: 'all' | 'complete' | 'incomplete' = 'all';

  constructor(private http: HttpClient) {}

  getAll(): Observable<{ todos: ITodo[] }> {
    return this.http
      .get<{ todos: ITodo[] }>('https://dummyjson.com/todos')
      .pipe(
        tap(
          (todos) =>
            (this.todos = todos.todos.map((todo) => ({
              ...todo,
              edited: false,
            })))
        )
      );
  }

  toggleCheckbox(todoId: number, completed: boolean) {
    this.http
      .put<ITodo[]>(`https://dummyjson.com/todos/${todoId}`, {
        completed: !completed,
      })
      .subscribe(() =>
        this.todos.forEach((todo) => {
          if (todo.id === todoId) {
            todo.completed = !completed;
          }
        })
      );
  }

  enableEdit(todoId: number) {
    this.todos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.edited = true;
      }
    });
    this.disabledCheckbox = true;
  }

  disableEdit(todoId: number, event?: KeyboardEvent) {
    if (event && event.key !== 'Enter') {
      return;
    }

    this.todos.forEach((todo) => {
      if (todo.id === todoId) {
        todo.edited = false;
      }
    });
    this.disabledCheckbox = false;
  }

  update(todoId: number, text: string): void {
    this.http
      .put<ITodo>(`https://dummyjson.com/todos/${todoId}`, { todo: text })
      .subscribe(() =>
        this.todos.forEach((todo) => {
          if (todo.id === todoId) {
            todo.todo = text;
          }
        })
      );
  }

  create(text: string) {
    this.http
      .post<ITodo>('https://dummyjson.com/todos/add', {
        todo: text,
        completed: false,
        userId: 1,
      })
      .subscribe(
        (newTodo) =>
          (this.todos = [{ ...newTodo, edited: false }, ...this.todos])
      );
  }

  delete(todoId: number): void {
    this.http
      .delete<ITodo>(`https://dummyjson.com/todos/${todoId}`)
      .subscribe(
        () => (this.todos = this.todos.filter((todo) => todo.id !== todoId))
      );
  }
}
