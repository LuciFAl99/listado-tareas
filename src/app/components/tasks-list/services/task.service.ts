import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { Person } from '../interfaces/person';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = '../../../../assets/mockup/tasks.json';
  private personsUrl = '../../../../assets/mockup/persons.json'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }
}
