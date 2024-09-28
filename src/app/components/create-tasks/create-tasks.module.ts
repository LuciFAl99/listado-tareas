import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTasksRoutingModule } from './create-tasks-routing.module';
import { CreateTasksComponent } from './create-tasks.component';


@NgModule({
  declarations: [
    CreateTasksComponent
  ],
  imports: [
    CommonModule,
    CreateTasksRoutingModule
  ]
})
export class CrearTareasModule { }
