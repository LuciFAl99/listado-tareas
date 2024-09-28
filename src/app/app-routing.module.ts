import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./components/Home/home-routing.module').then(
        (m) => m.HomeRoutingModule
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
