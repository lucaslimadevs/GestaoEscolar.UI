import { Component, OnInit } from '@angular/core';
import { faPager } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Boletim } from 'src/app/Models/Boletim';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { BoletimService } from 'src/app/services/boletim.service';

@Component({
  selector: 'app-consulta-boletim',
  templateUrl: './consulta-boletim.component.html',
  styleUrls: ['./consulta-boletim.component.css']
})
export class ConsultaBoletimComponent implements OnInit {
  boletins: Boletim[] = [];
  faPager = faPager;  
  public paginaAtual: number = 1;
  total: number = 20;
  
  private boletimService: BoletimService;  
  private toastr: ToastrService;

  constructor(boletimService: BoletimService, toastr: ToastrService) 
  {    
    this.boletimService = boletimService;
    this.toastr = toastr;
  }
  ngOnInit(): void {
    this.buscarBoletims();
  }

  buscarBoletims() {
    var filtro = new FiltroGenerico;

    filtro.pagina = this.paginaAtual;
    filtro.quantidadePorPagina = 20;

    this.boletimService.buscarTodos(filtro)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar boletins');
          return of(null);
        })
      )
      .subscribe((data: any) => {  
        this.boletins = data.valores;
        this.total = data.total;
      });
  }
  
  apagar(id: string) {
    this.boletimService.deletar(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao deletar boletim');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.toastr.success('', 'Boletim apagada com sucesso!');
        this.buscarBoletims();
      });       
  }

  public onPageChange(event: any): void {
    this.paginaAtual = parseInt(event, 10);
    this.buscarBoletims();
  }

}
