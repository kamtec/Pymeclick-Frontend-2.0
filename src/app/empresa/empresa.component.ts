import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  displayedColums = ['id','nombre','direccion','descripcion','telefono','logo',
  'email','comuna','calificacion','ciudad','categoria','acciones'];
  dataSource:MatTableDataSource<Empresa>; 
  categoria: Categoria[]; 
@ViewChild(MatPaginator,{static:true})
paginator:MatPaginator;
@ViewChild(MatSort,{static:true}) sort: MatSort;


  constructor(private empresaService:EmpresaService, public snackBar: MatSnackBar) { }

  ngOnInit(){
   this.empresaService.empresaCambio.subscribe(data =>
    {
      this.dataSource  = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.empresaService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Aviso', {duration:2000,});
    });
    this.empresaService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
filtrar(valor : string){
  this.dataSource.filter = valor.trim().toLowerCase();
}
eliminar(empresa:Empresa){
  this.empresaService.eliminar(empresa.id_empresa).pipe(
    switchMap(() => {
      return  this.empresaService.listar();
    })).subscribe(data =>{
      this.empresaService.empresaCambio.next(data);
      this.empresaService.mensajeCambio.next('Una empresa ha sido eliminada');
    });
  }


}
