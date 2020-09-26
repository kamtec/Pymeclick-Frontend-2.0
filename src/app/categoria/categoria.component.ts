import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  displayedColums = ['id', 'nombre','acciones'];
  dataSource:MatTableDataSource<Categoria>;
  
  @ViewChild(MatPaginator,{static:true})
  paginator:MatPaginator;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
    constructor(private categoriaService:CategoriaServie, snackBar: MatSnackBar) { }
  
    ngOnInit(){
      this.categoriaService.categoriaCambio.subscribe(data =>
        {
          this.dataSource  = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        
        });
  
        this.categoriaService.listar().subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
    filtrar(valor : string){
      this.dataSource.filter = valor.trim().toLowerCase();
    }
    eliminar(categoria:Categoria){
      this.categoriaService.eliminar(categoria.id_categoria).pipe(
        switchMap(() => {
          return  this.categoriaService.listar();
        })).subscribe(data =>{
          this.categoriaService.categoriaCambio.next(data);
          this.categoriaService.mensajeCambio.next('Una categoria ha sido eliminada'); 
  
    });
    }

}
