import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListRoutingModule } from './tasks-list-routing.module';
import { TasksListComponent } from './tasks-list.component';



@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    CommonModule,
    TasksListRoutingModule
  ]
})
export class ListaTareasModule { }
