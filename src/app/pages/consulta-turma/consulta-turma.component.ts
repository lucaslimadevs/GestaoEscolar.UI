import { Component, OnInit } from '@angular/core';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { FiltroGenerico } from 'src/app/Models/filtro-generico';
import { Turma } from 'src/app/Models/turma';
import { TurmaService } from 'src/app/services/turma.service';

@Component({
  selector: 'app-consulta-turma',
  templateUrl: './consulta-turma.component.html',
  styleUrls: ['./consulta-turma.component.css']
})
export class ConsultaTurmaComponent implements OnInit {
  turmas: Turma[] = [];
  faPeopleGroup = faPeopleGroup;  
  public paginaAtual: number = 1;
  total: number = 20;
  
  private turmaService: TurmaService;  
  private toastr: ToastrService;

  constructor(turmaService: TurmaService, toastr: ToastrService) 
  {    
    this.turmaService = turmaService;
    this.toastr = toastr;
  }
  ngOnInit(): void {
    this.buscarTurmas();
  }

  buscarTurmas() {
    var filtro = new FiltroGenerico;

    filtro.pagina = this.paginaAtual;
    filtro.quantidadePorPagina = 20;

    this.turmaService.buscarTodos(filtro)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao buscar turmas');
          return of(null);
        })
      )
      .subscribe((data: any) => {  
        this.turmas = data.valores;
        this.total = data.total;
      });
  }
  
  apagar(id: string) {
    this.turmaService.deletar(id)
      .pipe(
        catchError((error) => {
          this.toastr.error('', 'Erro ao deletar turma');
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.toastr.success('', 'Turma apagada com sucesso!');
        this.buscarTurmas();
      });       
  }

  public onPageChange(event: any): void {
    this.paginaAtual = parseInt(event, 10);
    this.buscarTurmas();
  }
}
