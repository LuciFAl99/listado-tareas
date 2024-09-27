import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { CrearTareasModule } from './components/crear-tareas/crear-tareas.module';
import { ListaTareasModule } from './components/lista-tareas/lista-tareas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CrearTareasModule,
    ListaTareasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
