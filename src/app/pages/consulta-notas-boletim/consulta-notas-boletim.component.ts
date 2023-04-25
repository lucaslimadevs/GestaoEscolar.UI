import { Component, OnInit } from '@angular/core';
import { faListNumeric } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { NotasBoletim } from 'src/app/Models/notasBoletim';
import { NotasBoletimService } from 'src/app/services/notas-boletim.service';

@Component({
  selector: 'app-consulta-notas-boletim',
  templateUrl: './consulta-notas-boletim.component.html',
  styleUrls: ['./consulta-notas-boletim.component.css']
})
export class ConsultaNotasBoletimComponent implements OnInit {
  notasBoletims: NotasBoletim[] = [];
  faListNumeric = faListNumeric;
  public paginaAtual: number = 1;
  total: number = 20;
  
  private notasBoletimService: NotasBoletimService;  
  private toastr: ToastrService;

  constructor(notasBoletimService: NotasBoletimService, toastr: ToastrService) 
  {    
    this.notasBoletimService = notasBoletimService;
    this.toastr = toastr;
  }

  ngOnInit(): void {
    this.buscarNotasBoletims();
  }

  buscarNotasBoletims() {
    var filtro = new FiltroGenerico;

    filtro.pagina = this.paginaAtual;
    filtro.quantidadePorPagina = 20;

    this.notasBoletimService.buscarTodos(filtro)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar notas do boletim');
          return of(null);
        })
      )
      .subscribe((data: any) => {  
        this.notasBoletims = data.valores;
        this.total = data.total;
      });
  }
  
  apagar(id: string) {
    this.notasBoletimService.deletar(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao deletar nota Boletim');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.toastr.success('', 'NotasBoletim apagada com sucesso!');
        this.buscarNotasBoletims();
      });       
  }

  public onPageChange(event: any): void {
    this.paginaAtual = parseInt(event, 10);
    this.buscarNotasBoletims();
  }

}
