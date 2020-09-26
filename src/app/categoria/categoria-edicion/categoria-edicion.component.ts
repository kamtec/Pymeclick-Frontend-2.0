import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-edicion',
  templateUrl: './categoria-edicion.component.html',
  styleUrls: ['./categoria-edicion.component.css']
})
export class CategoriaEdicionComponent implements OnInit {

  id:number;
  categoria:Categoria;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private categoriaService:CategoriaServie, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(){
    this.categoria= new Categoria();
    this.form = new FormGroup({
     id_categoria: new FormControl(0),
     nombre_categoria: new FormControl('')
    });  
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
   }
   initForm() {
    if (this.edicion) {
      this.categoriaService.listarPorid(this.id).subscribe(data => {
        let id = data.id_categoria;
        let nombre_categoria = data.nombre_categoria;
        this.form = new FormGroup({
        'id':new FormControl(id),
        'nombre': new FormControl(nombre_categoria)
      });
    });
  }
   }
   operar(){
     this.categoria.id_categoria = this.form.value['id'];
     this.categoria.nombre_categoria = this.form.value['nombre'];
     if (this.categoria.id_categoria!= null && this.categoria.id_categoria >0){
       this.categoriaService.modificar(this.categoria).pipe(
         switchMap(() => {
          return this.categoriaService.listar();
        })).subscribe(data => {
          this.categoriaService.categoriaCambio.next(data);
          this.categoriaService.mensajeCambio.next("una categoria fue modificada");
        });
      }else{
        this.categoriaService.registrar(this.categoria).pipe(
          switchMap(() => {
           return this.categoriaService.listar();
         })).subscribe(data => {
           this.categoriaService.categoriaCambio.next(data);
           this.categoriaService.mensajeCambio.next("Se registró una categoria");
         });
     }
     this.router.navigate(['categoria']);
   }
  

}
