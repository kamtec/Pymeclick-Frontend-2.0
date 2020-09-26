import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-producto-servicio-edicion',
  templateUrl: './producto-servicio-edicion.component.html',
  styleUrls: ['./producto-servicio-edicion.component.css']
})
export class ProductoServicioEdicionComponent implements OnInit {

  categoria: Categoria[];
  categoriasSeleccionados: Categoria[] = [];
  empresa: Empresa[];
  empresasSeleccionadas: Empresa[] = [];
  id: number;
  id_categoriaSeleccionado: number;
  id_empresaSeleccionada: number;
  productoServicio: ProductoServicio;
  form: FormGroup;
  edicion: boolean = false;
  mensaje: string;

  constructor(private productoServicioService: ProductoServicioService, private categoriaService: CategoriaServie, private empresaService: EmpresaService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productoServicio = new ProductoServicio();
    this.form = new FormGroup({
      id_prod_serv: new FormControl(0),
      nombre_prod_serv: new FormControl(''),
      precio: new FormControl(0),
      imagen: new FormControl(),
      descripcion_prod_serv: new FormControl(''),
    
   });
   /** 
   * capturar un parámetro que viene de una URL y lo convierte en número
    *  en este caso es un Id. El subscribe es un método observable que ejecuta 
    * una acción asociada a una entidad de datos y además dispara otra acción
    * asociada a esa data. Por ejemplo, cuando uno hace un cambio se ejecuta 
    * una lista datos con el dato ya cambiado.
   */
   this.route.params.subscribe((params: Params) => {
    this.id = params['id'];
    //Pregunta si el el parámetro id, es distinto de nulo.
    this.edicion = params['id'] != null;
    this.initForm();
  });
      this.listarCategoria();
      this.listarEmpresa();

  }

  listarCategoria(){
    this.categoriaService.listar().subscribe(data =>{
      this.categoria = data;
    }
    );
  }

  listarEmpresa(){
    this.empresaService.listar().subscribe(data =>{
      this.empresa = data;
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

  agregarEmpresa() {
    if (this.id_empresaSeleccionada > 0) {

      let cont = 0;
      for (let i = 0; i < this.empresasSeleccionadas.length; i++) {
        let empresa = this.empresasSeleccionadas[i];
        if (empresa.id_empresa === this.id_empresaSeleccionada) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = 'La empresa se encuentra en la lista';
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let empresa = new Empresa();
        empresa.id_empresa = this.id_empresaSeleccionada;

        this.empresaService.listarPorid(this.id_empresaSeleccionada).subscribe(data => {
          empresa.nombre = data.nombre;
          this.empresasSeleccionadas.push(empresa);
        });
      }
    } else {
      this.mensaje = 'Debe agregar una empresa';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  initForm(){
// Veirifica si el paramétro id es nulo, y la opción por defecto es True
    if(this.edicion) {
      this.productoServicioService.listarPorId(this.id).subscribe(data => {
        let id = data.id_prod_serv;
        let nombre_prod_serv = data.descripcion_prod_serv;
        let precio = data.precio;
        let imagen = data.categoria;
        let descripcion_prod_serv = data.descripcion_prod_serv;
        let categoria = data.categoria;
        let empresa = data.empresa;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre_prod_serv': new FormControl(nombre_prod_serv),
          'precio': new FormControl(precio),
          'imagen': new FormControl(imagen),
          'descripcion_prod_serv': new FormControl(descripcion_prod_serv),
          'categoria': new FormControl(categoria),
          'empresa': new FormControl(empresa)
          });
        });
      }
    }

    operar(){
      this.productoServicio.id_prod_serv = this.form.value['id'];
      this.productoServicio.nombre_prod_serv = this.form.value['nombre_prod_serv'];
      this.productoServicio.precio = this.form.value['precio'];
      this.productoServicio.imagen = this.form.value['imagen'];
      this.productoServicio.descripcion_prod_serv = this.form.value['descripcion_prod_serv'];
      this.productoServicio.categoria = this.form.value['categoria'];
      this.productoServicio.empresa = this.form.value['empresa'];
      if(this.productoServicio!= null && this.productoServicio.id_prod_serv >0){
        // pipe es un método observable que es similar al subscribe, pero que optimisa y renderiza mejor la carga de lista
        this.productoServicioService.modificar(this.productoServicio).pipe(switchMap(() => {
          return this.productoServicioService.listar();
        })).subscribe(data => {
          this.productoServicioService.productoservicioCambio.next(data);
          this.productoServicioService.mensajeCambio.next("Un Producto o Servicio fue modificado");
        });  
    }else{
      this.productoServicioService.registrar(this.productoServicio).pipe(switchMap(() => {
        return this.productoServicioService.listar();
      })).subscribe(data => {
        this.productoServicioService.productoservicioCambio.next(data);
        this.productoServicioService.mensajeCambio.next("Se registró un Producto o Servicio");
      });
    }

    this.router.navigate(['productoServicio']);
  }


}
