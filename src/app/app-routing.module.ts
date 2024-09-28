import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-tasks',
    loadChildren: () =>
      import('./components/create-tasks/create-tasks-routing.module').then(
        (m) => m.CreateTasksRoutingModule
      )
  },
  {
    path: 'tasks-list',
    loadChildren: () => 
      import('./components/tasks-list/tasks-list-routing.module').then(
        (m) => m.TasksListRoutingModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
