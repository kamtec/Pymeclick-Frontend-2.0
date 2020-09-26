import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-edicion',
  templateUrl: './empresa-edicion.component.html',
  styleUrls: ['./empresa-edicion.component.css']
})
export class EmpresaEdicionComponent implements OnInit {

  categoria: Categoria[];
  comuna:Comuna[] = [];
  ciudad:Ciudad[] = [];
  calificacion:Calificacion[] = [];
  comunaSeleccionada:Comuna;
  ciudadSeleccionada:Ciudad;
  calificacionSeleccionada:Calificacion;
  categoriasSeleccionados: Categoria[] = [];
  id: number;
  id_categoriaSeleccionado: number;
  empresa:Empresa;
  form: FormGroup;
  edicion: boolean = false;
  mensaje: string;

  constructor(private empresaService: EmpresaService,
    private comunaService: ComunaService,
    private ciudadService: CiudadService,
    private calificacionService: CalificacionService,
    private categoriaService: CategoriaServie,
    private route: ActivatedRoute, private router: Router
    , private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.empresa = new Empresa();
    this.form = new FormGroup({
      id_empresa: new FormControl(0),
      nombre: new FormControl(''),
      direccion: new FormControl(''),
      descripcion: new FormControl(''),
      telefono: new FormControl(''),
      logo: new FormControl(''),
      email: new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  
  this.listarCategoria();
  this.listarComuna();
  this.listarCiudad();
  this.listarCalificacion();

}

listarCategoria(){
  this.categoriaService.listar().subscribe(data =>{
    this.categoria = data;
  }
  );
}
  listarComuna(){
    this.comunaService.listar().subscribe(data =>{
      this.comuna = data;
    }
    );
  }
    listarCiudad(){
      this.ciudadService.listar().subscribe(data =>{
        this.ciudad = data;
      }
      );
    }
      listarCalificacion(){
        this.calificacionService.listar().subscribe(data =>{
          this.calificacion = data;
        }
        );
}

agregarCategoria() {
  if (this.id_categoriaSeleccionado > 0) {

    let cont = 0;
    for (let i = 0; i < this.categoriasSeleccionados.length; i++) {
      let categoria = this.categoriasSeleccionados[i];
      if (categoria.id_categoria === this.id_categoriaSeleccionado) {
        cont++;
        break;
      }
    }
    if (cont > 0) {
      this.mensaje = 'La categoría se encuentra en la lista';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    } else {
      let categoria = new Categoria();
      categoria.id_categoria = this.id_categoriaSeleccionado;

      this.categoriaService.listarPorid(this.id_categoriaSeleccionado).subscribe(data => {
        categoria.nombre_categoria = data.nombre_categoria;
        this.categoriasSeleccionados.push(categoria);
      });
    }
  } else {
    this.mensaje = 'Debe agregar una categoría';
    this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
  }
}

seleccionarCiudad(e: any) {
  this.ciudadSeleccionada = e.value;
}

seleccionarComuna(e: any) {
  this.comunaSeleccionada = e.value;
}

seleccionarCalificacion(e: any) {
  this.calificacionSeleccionada = e.value;
}

registrar(){
  let empresa = new Empresa();
  empresa.ciudad = this.ciudadSeleccionada;
  empresa.comuna = this.comunaSeleccionada;
  empresa.calificacion = this.calificacionSeleccionada;


}

initForm(){
  
        if(this.edicion) {
          this.empresaService.listarPorid(this.id).subscribe(data => {
            let id = data.id_empresa
            let nombre = data.nombre;
            let direccion= data.direccion;
            let descripcion = data.descripcion;
            let telefono = data.telefono;
            let logo = data.logo;
            let email = data.email;
            let ciudad = data.ciudad;
            let comuna = data.comuna;
            let calificacion = data.calificacion;
            ciudad = this.ciudadSeleccionada;
            comuna = this.comunaSeleccionada;
            calificacion = this.calificacionSeleccionada;
            let categoria = data.categorias
            this.form = new FormGroup({
              'id': new FormControl(id),
              'nombre': new FormControl(nombre),
              'direccion': new FormControl(direccion),
              'descripcion': new FormControl(descripcion),
              'telefono': new FormControl(telefono),
              'logo': new FormControl(logo),
              'email': new FormControl(email),
              'ciudad': new FormControl(ciudad),
              'comuna': new FormControl(comuna),
              'calificacion': new FormControl(calificacion),
              'categoria': new FormControl(categoria)
              });
            });
          }
        }
    
        operar(){
          this.empresa.id_empresa = this.form.value['id'];
          this.empresa.nombre = this.form.value['nombre'];
          this.empresa.direccion = this.form.value['direccion'];
          this.empresa.descripcion = this.form.value['imagen'];
          this.empresa.telefono = this.form.value['telefono'];
          this.empresa.logo = this.form.value['logo'];
          this.empresa.email = this.form.value['email'];
          this.empresa.ciudad = this.form.value['ciudad'];
          this.empresa.comuna = this.form.value['comuna'];
          this.empresa.calificacion = this.form.value['calificacion'];
          this.empresa.categorias = this.form.value['categoria'];
    
          if(this.empresa!= null && this.empresa.id_empresa >0){
           
            this.empresaService.modificar(this.empresa).pipe(switchMap(() => {
              return this.empresaService.listar();
            })).subscribe(data => {
              this.empresaService.empresaCambio.next(data);
              this.empresaService.mensajeCambio.next("Un Producto o Servicio fue modificado");
            });  
        }else{
          this.empresaService.registrar(this.empresa).pipe(switchMap(() => {
            return this.empresaService.listar();
          })).subscribe(data => {
            this.empresaService.empresaCambio.next(data);
            this.empresaService.mensajeCambio.next("Se registró una empresa");
          });
        }
        this.router.navigate(['empresa']);
      }

}
