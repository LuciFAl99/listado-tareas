import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearTareasRoutingModule } from './crear-tareas-routing.module';
import { CrearTareasComponent } from './crear-tareas.component';


@NgModule({
  declarations: [
    CrearTareasComponent
  ],
  imports: [
    CommonModule,
    CrearTareasRoutingModule
  ]
})
export class CrearTareasModule { }
