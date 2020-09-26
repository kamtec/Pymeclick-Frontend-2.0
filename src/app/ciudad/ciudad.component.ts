import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  displayedColums = ['id', 'nombre ciudad', 'comuna', 'acciones'];
dataSource:MatTableDataSource<Ciudad>;
comuna:Comuna[];
@ViewChild(MatPaginator,{static:true})
paginator:MatPaginator;
@ViewChild(MatSort,{static:true}) sort: MatSort;

  constructor(private ciudadService:CiudadService, public snackBar: MatSnackBar) { }

  ngOnInit(){
   this.ciudadService.ciudadCambio.subscribe(data =>
    {
      this.dataSource  = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    });
    this.ciudadService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Aviso', {duration:2000,});
    });
    this.ciudadService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
filtrar(valor : string){
  this.dataSource.filter = valor.trim().toLowerCase();
} 
eliminar(ciudad:Ciudad){
this.ciudadService.eliminar(ciudad.id_ciudad).pipe(
  switchMap(() => {
    return this.ciudadService.listar();
  })).subscribe(data =>{
    this.ciudadService.ciudadCambio.next(data);
    this.ciudadService.mensajeCambio.next('Una ciudad ha sido eliminada');
  });
  }


}
