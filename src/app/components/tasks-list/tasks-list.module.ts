import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListRoutingModule } from './tasks-list-routing.module';
import { TasksListComponent } from './tasks-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    CommonModule,
    TasksListRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ListaTareasModule { }
