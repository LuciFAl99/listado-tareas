import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaTareasRoutingModule } from './lista-tareas-routing.module';
import { ListaTareasComponent } from './lista-tareas.component';


@NgModule({
  declarations: [
    ListaTareasComponent
  ],
  imports: [
    CommonModule,
    ListaTareasRoutingModule
  ]
})
export class ListaTareasModule { }
