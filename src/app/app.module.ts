import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ComunaComponent } from './comuna/comuna.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProductoServicioComponent } from './producto-servicio/producto-servicio.component';
import { CalificacionEdicionComponent } from './calificacion/calificacion-edicion/calificacion-edicion.component';
import { CategoriaEdicionComponent } from './categoria/categoria-edicion/categoria-edicion.component';
import { CiudadEdicionComponent } from './ciudad/ciudad-edicion/ciudad-edicion.component';
import { ComunaEdicionComponent } from './comuna/comuna-edicion/comuna-edicion.component';
import { EmpresaEdicionComponent } from './empresa/empresa-edicion/empresa-edicion.component';
import { ProductoServicioEdicionComponent } from './productoServicio/producto-servicio-edicion/producto-servicio-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    CalificacionComponent,
    CategoriaComponent,
    CiudadComponent,
    ComunaComponent,
    EmpresaComponent,
    ProductoServicioComponent,
    CalificacionEdicionComponent,
    CategoriaEdicionComponent,
    CiudadEdicionComponent,
    ComunaEdicionComponent,
    EmpresaEdicionComponent,
    ProductoServicioEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
