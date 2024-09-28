import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos';
  private personsUrl = 'assets/persons.json'

  constructor() { }
}
