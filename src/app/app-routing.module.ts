import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'crear-tareas',
    loadChildren: () =>
      import('./components/crear-tareas/crear-tareas-routing.module').then(
        (m) => m.CrearTareasRoutingModule
      )
  },
  {
    path: 'lista-tareas',
    loadChildren: () => 
      import('./components/lista-tareas/lista-tareas-routing.module').then(
        (m) => m.ListaTareasRoutingModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
