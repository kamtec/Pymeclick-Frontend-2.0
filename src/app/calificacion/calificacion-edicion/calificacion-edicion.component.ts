import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-calificacion-edicion',
  templateUrl: './calificacion-edicion.component.html',
  styleUrls: ['./calificacion-edicion.component.css']
})
export class CalificacionEdicionComponent implements OnInit {

  id: number;
  calificacion:Calificacion;
  form: FormGroup;
  edicion: boolean = false;
  

  constructor(private calificacionService:CalificacionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.calificacion = new Calificacion();
    this.form = new FormGroup({
      id_calificacion: new FormControl(0),
      puntaje: new FormControl(0),
      imagen: new FormControl(''),
      comentario: new FormControl('')
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
   }
   initForm() {
    if (this.edicion) {
      this.calificacionService.listarPorid(this.id).subscribe(data => {
        let id = data.id_calificacion;
        let puntaje = data.puntaje;
        let imagen = data.imagen;
        let comentario = data.comentario;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'puntaje': new FormControl(puntaje),
          'imagen': new FormControl(imagen),
          'comentario': new FormControl(comentario)
        });
      });
    }
  }
  operar(){
    this.calificacion.id_calificacion = this.form.value['id'];
    this.calificacion.puntaje = this.form.value['puntaje'];
    this.calificacion.imagen = this.form.value['imagen'];
    this.calificacion.comentario = this.form.value['comentario'];
    if (this.calificacion!= null && this.calificacion.id_calificacion >0){
      this.calificacionService.modificar(this.calificacion).pipe(switchMap(() => {
        return this.calificacionService.listar();
      })).subscribe(data => {
        this.calificacionService.calificacionCambio.next(data);
        this.calificacionService.mensajeCambio.next("una calificacion fue modificada");
    });
  }else{
    this.calificacionService.registrar(this.calificacion).pipe(switchMap(() => {
      return this.calificacionService.listar();
    })).subscribe(data => {
      this.calificacionService.calificacionCambio.next(data);
      this.calificacionService.mensajeCambio.next("Se registró una calificacion");
    });
  }

  this.router.navigate(['calificacion']);
  
    }


}
