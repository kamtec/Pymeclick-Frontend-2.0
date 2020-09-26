import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css']
})
export class ProductoServicioComponent implements OnInit {

  displayedColums = ['id', 'nombre', 'precio', 'imagen', 'descripcion', 'categorias', 'empresa', 'acciones'];
  dataSource: MatTableDataSource<ProductoServicio>
  categoria:Categoria[];
  empresa:Empresa[];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private productoservicioService: ProductoServicioService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productoservicioService.productoservicioCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoservicioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000, });
    });

    this.productoservicioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(productoservicio: ProductoServicio){
    this.productoservicioService.eliminar(productoservicio.id_prod_serv).pipe(
      switchMap(() => {
        return this.productoservicioService.listar();
      })).subscribe(data =>{
        this.productoservicioService.productoservicioCambio.next(data);
        this.productoservicioService.mensajeCambio.next('Un producto o servicio fue eliminado');
      });
  }

}
