import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTasksComponent } from './create-tasks.component';

const routes: Routes = [
  { path: '', component: CreateTasksComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTasksRoutingModule { }
