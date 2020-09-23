import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CalificacionEdicionComponent } from './calificacion/calificacion-edicion/calificacion-edicion.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { CategoriaEdicionComponent } from './categoria/categoria-edicion/categoria-edicion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CiudadEdicionComponent } from './ciudad/ciudad-edicion/ciudad-edicion.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ComunaEdicionComponent } from './comuna/comuna-edicion/comuna-edicion.component';
import { ComunaComponent } from './comuna/comuna.component';
import { EmpresaEdicionComponent } from './empresa/empresa-edicion/empresa-edicion.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ProductoServicioComponent } from './producto-servicio/producto-servicio.component';
import { ProductoServicioEdicionComponent } from './productoServicio/producto-servicio-edicion/producto-servicio-edicion.component';


const routes: Routes = [

  {
    path: 'calificacion', component: CalificacionComponent, children: [
      { path: 'nuevo', component: CalificacionEdicionComponent },
      { path: 'edicion/:id', component: CalificacionEdicionComponent }
    ]
  },

  {
    path: 'categoria', component: CategoriaComponent, children: [
      { path: 'nuevo', component: CategoriaEdicionComponent },
      { path: 'edicion/:id', component: CategoriaEdicionComponent }
    ]
  },

  {
    path: 'ciudad', component: CiudadComponent, children: [
      { path: 'nuevo', component: CiudadEdicionComponent },
      { path: 'edicion/:id', component: CiudadEdicionComponent }
    ]
  },

  {
    path: 'comuna', component: ComunaComponent, children: [
      { path: 'nuevo', component: ComunaEdicionComponent },
      { path: 'edicion/:id', component: ComunaEdicionComponent }
    ]
  },

  {
    path: 'empresa', component: EmpresaComponent, children: [
      { path: 'nuevo', component: EmpresaEdicionComponent },
      { path: 'edicion/:id', component: EmpresaEdicionComponent }
    ]
  },

  {
    path: 'productoservicio', component: ProductoServicioComponent, children: [
      { path: 'nuevo', component: ProductoServicioEdicionComponent },
      { path: 'edicion/:id', component: ProductoServicioEdicionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
