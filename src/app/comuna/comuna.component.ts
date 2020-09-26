import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.component.html',
  styleUrls: ['./comuna.component.css']
})
export class ComunaComponent implements OnInit {

  displayedColums = ['id', 'nombre','acciones'];
  dataSource:MatTableDataSource<Comuna>;
@ViewChild(MatPaginator,{static:true})
paginator:MatPaginator;
@ViewChild(MatSort,{static:true}) sort: MatSort;
  constructor(private comunaService:ComunaService,public snackBar: MatSnackBar) { }

  ngOnInit() {
   this.comunaService.comunaCambio.subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
   this.comunaService.mensajeCambio.subscribe(data =>{
    this.snackBar.open(data, 'Aviso', {duration:2000,});
  });
  this.comunaService.listar().subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}
filtrar(valor : string){
this.dataSource.filter = valor.trim().toLowerCase();
}
eliminar(comuna:Comuna){
  this.comunaService.eliminar(comuna.id_comuna).pipe(
    switchMap(() => {
      return this.comunaService.listar();
    })).subscribe(data =>{
      this.comunaService.comunaCambio.next(data);
      this.comunaService.mensajeCambio.next('Una comuna ha sido eliminada');
    });
}

}
