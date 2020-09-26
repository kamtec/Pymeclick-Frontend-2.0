import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table/typings/table-data-source';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  displayedColums = ['id', 'puntaje', 'imagen', 'comentario','acciones'];
dataSource:MatTableDataSource<Calificacion>;
@ViewChild(MatPaginator,{static:true})
paginator:MatPaginator;
@ViewChild(MatSort,{static:true}) sort: MatSort;
  constructor(private calificacionService: CalificacionService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.calificacionService.calificacionCambio.subscribe(data =>
      {
        this.dataSource  = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.calificacionService.mensajeCambio.subscribe(data =>{
        this.snackBar.open(data, 'Aviso', {duration:2000,});
      });
      this.calificacionService.listar().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  eliminar(calificacion:Calificacion){
    this.calificacionService.eliminar(calificacion.id_calificacion).pipe(
      switchMap(() => {
        return  this.calificacionService.listar();
      })).subscribe(data =>{
        this.calificacionService.calificacionCambio.next(data);
        this.calificacionService.mensajeCambio.next('Una calificacion ha sido eliminada');
      });
  }

}
