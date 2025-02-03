import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../model/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  constructor() { 
    const storedTodos = localStorage.getItem('todos');
    this.todos = storedTodos ? JSON.parse(storedTodos) : [
      {
        id: '111',
        title: 'Learn C++',
        isCompleted: true,
        date: new Date(),
      },
      {
        id: '222',
        title: 'Learn React',
        isCompleted: true,
        date: new Date(),
      },
      {
        id: '333',
        title: 'Learn Angular',
        isCompleted: false,
        date: new Date(),
      },
      {
        id: '444',
        title: 'Learn React',
        isCompleted: false,
        date: new Date(),
      },
    ];
  }

  private saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos() {
    return of(this.todos);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodosToLocalStorage();
  }

  changeStatus(todo: Todo) {
    this.todos.map(singleTodo => {
      if (singleTodo.id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
      }
    });
    this.saveTodosToLocalStorage();
  }

  deleteTodo(todo: Todo) {
    const indexofTodo = this.todos.findIndex(currentObj => currentObj.id === todo.id);
    this.todos.splice(indexofTodo, 1);
    this.saveTodosToLocalStorage();
  }

  private loadTodosFromLocalStorage(): Todo[] {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : null;
  }
}
